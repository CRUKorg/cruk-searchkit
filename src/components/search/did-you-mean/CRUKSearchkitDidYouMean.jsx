import React from 'react';
import ReactDOM from 'react-dom';
import bem from 'bem-cn';
import {
  SearchkitComponent
} from 'searchkit';

import CRUKCustomElasticGetter from '../getter/CRUKCustomElasticGetter'
import {
  CRUKSearchkitDidYouMeanAccessor
} from './CRUKSearchkitDidYouMeanAccessor';
const mainClass = bem('cr-did-you-mean');

/**
 * CRUKSearchkitAutocomplete component.
 */
export default class CRUKSearchkitDidYouMean extends SearchkitComponent {
  accessor:CRUKSearchkitDidYouMeanAccessor

  static propTypes = {
    field: React.PropTypes.string,
    minResults: React.PropTypes.number
  }

  static defaultProps = {
    field: 'body',
    minResults: 10
  }

  constructor(props) {
    super(props);

    this.clickHandle = this.clickHandle.bind(this);
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

  defineAccessor() {
    return new CRUKSearchkitDidYouMeanAccessor(this.props.field);
  }

  render() {
    const suggestion = this.accessor.getSuggestion();
    if (!suggestion || this.searchkit.results.hits.total > this.props.minResults) return null;

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
