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

// Specify the main BEM class that will be used over this component.
const bemPager = bem('cr-simple-pager')

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
      <a data-qa="label" dangerouslySetInnerHTML={safeLabel} className={bemPager('link')}></a> :
      <span data-qa="label" className={bemPager('indicator')} href={'#' + itemKey} dangerouslySetInnerHTML={safeLabel}></span>;

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
    let items = [];
    let currentPage = this.getCurrentPage();
    let totalPages = this.getTotalPages();
    let currentPageItem = {
      disabled: true,
      key: currentPage,
      label: totalPages > 1 ? 'Page ' + currentPage + ' of ' + totalPages : 'Page 1',
      page: currentPage,
      className: 'current'
    }

    /**
     * Remove items so as not to show links that do nothing.
     */
    if (totalPages === 1) {
      items[0] = currentPageItem;
    }
    else {
      items = this.getPages();
      items[0].className = 'previous';
      items[1].className = 'next';
      items.splice(1, 0, currentPageItem);

      // Remove next.
      if (totalPages === currentPage) {
        items = items.slice(0, 2);
      }
    }


    const view = map(items, (option) => {
      const label = option.title || option.label || option.key

      return React.createElement(CRUKItemComponent, {
        label: label,
        onClick: () => this.setPage(option.key),
        key: option.key,
        itemKey: option.key,
        disabled: option.disabled,
        className: bemPager(option.className)
      })
    })

    return <nav aria-label="Select a different page">
      <ul className={bemPager}>
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
