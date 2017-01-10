import React from 'react';
import ReactDOM from 'react-dom';
import bem from 'bem-cn';
import {
  SearchkitComponent
} from 'searchkit';

import CRUKCustomElasticGetter from '../getter/CRUKCustomElasticGetter'
const mainClass = bem('cr-did-you-mean');

/**
 * CRUKSearchkitAutocomplete component.
 */
export default class CRUKSearchkitDidYouMean extends SearchkitComponent {
  static buildResults = (results, value) => {
    return results.data.suggestion
      .filter((v, i, a) => {
        return a.filter(val => val.options.length === 0).length < a.length; 
      })
      .map((v) => {
        return (v.options[0]) ? v.options[0].text : v.text;
      })
      .join(' ');
  }

  constructor(props) {
    super(props);

    this.state = {
      suggestion: null
    }
    
    this.clickHandle = this.clickHandle.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getQueryAccessorIndex = this.getQueryAccessorIndex.bind(this);
  }

  clickHandle(e) {
    e.preventDefault();
    const query = e.innerHTML;
    const sbAccessorIndex = this.getQueryAccessorIndex()

    if (sbAccessorIndex) {
      this.searchkit.accessors.accessors[sbAccessorIndex].state.value = e.target.innerHTML;
      this.searchkit.performSearch();
    }
  }

  getQueryAccessorIndex() {
    return this.searchkit.accessors.accessors
      .map((v, i) => {
        return v.key === 'xss-q' ? i : null;
      })
      .filter(v => typeof v === 'number')
      .join();
  }

  getSuggestions() {
    const value = this.searchkit.state['xss-q'];
    const getter = new CRUKCustomElasticGetter(`${this.searchkit.host}_suggest`);

    const result = getter.didyoumeanRequest(value, 'title').then((data) => {
      this.setState({
        suggestion: CRUKSearchkitDidYouMean.buildResults(data, value)
      });
    });
  }

  componentDidMount() {
    const self = this;
    this.searchkit.addResultsListener((result) => {
      self.getSuggestions();
    });
  }

  render() {
    const { suggestion } = this.state;
    if (!suggestion) return null;

    return (
      <p className={mainClass()} >
        Did you mean&nbsp;
        <a href="#t" className={mainClass('link')} onClick={this.clickHandle}>
          {suggestion}
        </a>?
      </p>
    );
  }
}
