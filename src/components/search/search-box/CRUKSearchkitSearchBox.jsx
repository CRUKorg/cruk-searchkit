import React from 'react';
import throttle from 'lodash/throttle'
import {
  SearchBox
} from "searchkit";

import CRUKCustomElasticGetter from '../getter/CRUKCustomElasticGetter'
import CRUKSearchkitAutocompleteList from '../autocomplete/CRUKSearchkitAutocompleteList'

import { isUndefined } from 'lodash'

/**
 * Override the render method on the SearchBox component to alter the markup.
 */
export default class CRUKSearchkitSearchBox extends SearchBox {
  static buildResults = (results) => {
    return results.title_suggest[0].options.map((v) => {
      return v.text;
    });
  }

  constructor(props) {
    super(props);
    
    this.state = {
      focused: false,
      autocompleteActive: false,
      input: undefined,
      autocompleteItems: [],
      selectedItem: 0
    };

    this.lastSearchMs = 0;
    this.throttledSearch = throttle(()=> {
      this.searchQuery(this.accessor.getQueryString())
    }, props.searchThrottleTime);

    this.autocompleteToggle = this.autocompleteToggle.bind(this);
    this.inputState = this.inputState.bind(this);
  }

  handleKeyUp(e) {
    const { autocompleteItems, selectedItem } = this.state;

    if (this.refs.queryField.value === '') return;
    const self = this;

    if (this.props.autocomplete && (e.keyCode === 40 || e.keyCode === 38)) {
      this.handleAutocompleteItems(e.keyCode);
      return;
    }

    const getter = new CRUKCustomElasticGetter(`${this.searchkit.host}_suggest`);
    getter.autocompleteRequest(this.refs.queryField.value)
      .then(function (response) {
        self.setState({
          autocompleteItems: CRUKSearchkitSearchBox.buildResults(response.data),
          autocompleteActive: true
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  autocompleteToggle(flag) {
    this.setState({ autocompleteActive: flag });
  }

  inputState(state) {
    this.setState({ input: state });
  }

  handleAutocompleteItems(arrow) {
    const { autocompleteItems, selectedItem } = this.state;
    if (autocompleteItems.length < 1) return;
    
    const selectedItemIndex = (() => {
      if (arrow === 40) {
        if (selectedItem < autocompleteItems.length) return selectedItem + 1;
        return autocompleteItems.length;
      }
      if (arrow === 38) {
        if (selectedItem > 1) return selectedItem - 1;
        return 1;
      }
      return 0;
    })();

    this.setState({
      selectedItem: selectedItemIndex
    });
  }

  setFocusState(focused:boolean) {
    if (!focused){
      const { input } = this.state
      if (this.props.blurAction == "search"
        && !isUndefined(input) 
        && input != this.getAccessorValue()){
        this.searchQuery(input)
      }
      if (!this.props.autocomplete) {
        this.setState({ 
          focused,
          input: undefined // Flush (should use accessor's state now)
        })
      }
    } else {
      this.setState({ focused })
    }
  }

  onSubmit(event) {
    const { autocompleteItems, selectedItem } = this.state;
    event.preventDefault();
    let query = this.getValue();
    if (this.props.autocomplete && selectedItem > 0) {
      query = autocompleteItems[selectedItem - 1];
      this.setState({
        input: query,
        selectedItem: 0
      });
    }

    this.searchQuery(query);

    /**
     * De-focus the input.
     */
    if (document.activeElement != document.body) {
      document.activeElement.blur();
    }
  }

  render() {
    const { focused, autocompleteItems, autocompleteActive, selectedItem } = this.state;
    let wrapper_class = 'cr-input-group cr-input-group--lg cr-search-input';
    let placeholder = this.props.placeholder || this.translate('searchbox.placeholder');
    if (focused) {
      wrapper_class += ' cr-input-group--focused';
    }
    return <form onSubmit={this.onSubmit.bind(this)}>
      <div className={wrapper_class}>
        <label htmlFor="search-input" id="search-label">{placeholder}</label>
        <input
          type="search"
          data-qa="query"
          id="search-input"
          className="cr-input-group__input cr-search-input__input"
          placeholder={placeholder}
          value={this.getValue()}
          onFocus={this.setFocusState.bind(this, true)}
          onBlur={this.setFocusState.bind(this, false)}
          onKeyUp={this.handleKeyUp.bind(this)}
          ref="queryField"
          autoFocus={this.props.autofocus}
          onChange={this.onChange.bind(this)}
          aria-describedby="search-label"
          autoComplete="off"
          autoCorrect="off"
          tabIndex="1"
        />
        <span className="cr-input-group__button cr-search-input__button">
          <button type="submit" className="btn" aria-label="Submit your search" data-qa="submit">
            <span className="cr-input-group__icon glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
        { this.props.autocomplete &&
          <CRUKSearchkitAutocompleteList
            selectedItem={selectedItem}
            inputState={this.inputState}
            autocompleteActive={autocompleteActive}
            autocompleteItems={autocompleteItems}
            toggle={this.autocompleteToggle}
          />
        }
      </div>
    </form>
  }
}
