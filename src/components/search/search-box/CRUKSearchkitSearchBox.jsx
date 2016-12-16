import React from 'react';
import throttle from 'lodash/throttle'
import {
  SearchBox
} from "searchkit";

import CRUKSearchkitAutocompleteGetter from '../autocomplete/CRUKSearchkitAutocompleteGetter'
import CRUKSearchkitAutocompleteList from '../autocomplete/CRUKSearchkitAutocompleteList'

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
      autocompleteItems: []
    };

    this.lastSearchMs = 0;
    this.throttledSearch = throttle(()=> {
      this.searchQuery(this.accessor.getQueryString())
    }, props.searchThrottleTime);

    this.autocompleteToggle = this.autocompleteToggle.bind(this);
  }

  handleKeyUp() {
    const self = this;
    const getter = new CRUKSearchkitAutocompleteGetter(`${this.searchkit.host}_suggest`);
    getter.makeAxoisRequest(this.refs.queryField.value)
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

  onSubmit(event) {
    event.preventDefault();
    this.searchQuery(this.getValue());

    /**
     * De-focus the input.
     */
    if (document.activeElement != document.body) {
      document.activeElement.blur();
    }
  }

  render() {
    const { focused, autocompleteItems, autocompleteActive } = this.state;
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
            autocompleteActive={autocompleteActive}
            autocompleteItems={autocompleteItems}
            toggle={this.autocompleteToggle}
          />
        }
      </div>
    </form>
  }
}
