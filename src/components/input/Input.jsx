import React from 'react';
import {
  SearchBox
} from "searchkit";

/**
 * Override the render method on the SearchBox component to alter the markup.
 */
export default class CRUKSearchInput extends SearchBox {
  onSubmit(event) {
    event.preventDefault()
    this.searchQuery(this.getValue())

    /**
     * De-focus the input.
     */
    if (document.activeElement != document.body) {
      document.activeElement.blur();
    }
  }

  render() {
    let wrapper_class = 'cr-input-group cr-input-group--lg cr-search-input'
    let placeholder = this.props.placeholder || this.translate('searchbox.placeholder')

    if (this.state.focused) {
      wrapper_class += ' cr-input-group--focused'
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
          ref="queryField"
          autoFocus={this.props.autofocus}
          onInput={this.onChange.bind(this)}
          aria-describedby="search-label"
          autoComplete="off"
          autoCorrect="off"
          tabIndex="1"/>
        <span className="cr-input-group__button cr-search-input__button">
          <button type="submit" className="btn" aria-label="Submit your search" data-qa="submit">
            <span className="cr-input-group__icon glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    </form>
  }
}
