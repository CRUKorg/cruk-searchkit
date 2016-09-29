import React from 'react';
import bem from 'bem-cn';
import {
  block,
  PaginationHelper,
  Paginator,
  Pagination,
  ItemComponent,
  FastClick
} from 'searchkit';
import {
  map
} from 'lodash';
import sanitizeHtml from 'sanitize-html-react';

/**
 * This file is a mess of extending all sorts, makes me sad inside! This is
 * because we've got a specific way we want the pagination to look.
 */

/**
 * Define a custom itemComponent class for us to use.
 */
class CRUKItemComponent extends ItemComponent {
  render() {
    const {onClick, disabled, itemKey, label, className} = this.props

    let safeLabel = {__html: label};
    let content = typeof itemKey === 'string' ?
      <a data-qa="label" dangerouslySetInnerHTML={safeLabel}></a> :
      <span data-qa="label" href={'#' + itemKey} dangerouslySetInnerHTML={safeLabel}></span>;

    return (
      <FastClick handler={onClick}>
        <li className={disabled ? className + ' disabled' : className} data-qa="option" data-key={itemKey}>
          {content}
        </li>
      </FastClick>
    )
  }
}

/**
 * Define our basic pagination class which will spit out a simple pager aligned
 * more to Bootstrap than searchkit.
 */
class CRUKPagination extends Pagination {
  render() {
    if (!this.hasHits()) return null;

    /**
     * Inject the page number item into the middle of the array.
     */
    let items = this.getPages();
    let currentPage = this.getCurrentPage();
    let totalPages = this.getTotalPages();
    let currentPageItem = {
      disabled: true,
      key: currentPage,
      label: totalPages > 1 ? 'Page ' + currentPage + ' of ' + totalPages : 'Page 1',
      page: currentPage,
      className: 'current'
    }
    items[0].className = 'previous';
    items[1].className = 'next';
    items.splice(1, 0, currentPageItem);

    const view = map(items, (option) => {
      const label = option.title || option.label || option.key

      return React.createElement(CRUKItemComponent, {
        label: label,
        onClick: () => this.setPage(option.key),
        key: option.key,
        itemKey: option.key,
        disabled: option.disabled,
        className: option.className
      })
    })

    return <nav aria-label="Select a different page">
      <ul className="pager">
        {view}
      </ul>
    </nav>
  }
}

/**
 * Alter the default props.
 */
CRUKPagination.defaultProps['translations'] = {
  'pagination.previous': '<span class="glyphicon glyphicon-chevron-left"></span> Prev',
  'pagination.next': 'Next <span class="glyphicon glyphicon-chevron-right"></span>'
};

/**
 * Export the class.
 */
export default CRUKPagination
