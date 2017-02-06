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
import scroll from 'scroll';

// Specify the main BEM class that will be used over this component.
const bemPager = bem('cr-simple-pager')

/**
 * This file is a mess of extending all sorts, makes me sad inside! This is
 * because we've got a specific way we want the pagination to look.
 */

/**
 * Define a custom itemComponent class for us to use.
 */
class CRUKSearchkitPaginationItemComponent extends ItemComponent {
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
class CRUKSearchkitPagination extends Pagination {
  constructor(props) {
    super();

    this.state = {
      clicked: 0
    };

    this.changeAndScroll = this.changeAndScroll.bind(this);
  }

  componentWillUpdate() {
    if (this.state.clicked === 2) {
      const position = this.getAbsPosition(document.getElementById('searchPrototypeApp'));
      scroll.top(document.querySelector('body'), position);
      // IE and Firefox Hack
      document.documentElement.scrollTop = 0;
      this.setState({clicked: 0});
    }
  }

  getAbsPosition = (element) => {
    let el = element;
    let el2 = el;
    let curtop = 0;
    if (document.getElementById || document.all) {
      do {
        curtop += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
        el2 = el2.parentNode;
        while (el2 !== el) {
          curtop -= el2.scrollTop;
          el2 = el2.parentNode;
        }
      } while (el.offsetParent);
    } else if (document.layers) {
      curtop += el.y;
    }
    return curtop;
  }

  changeAndScroll(key) {
    this.setState({clicked: 1}, () => {
      this.setPage(key);
      this.setState({clicked: 2});
    });
  }

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

      return React.createElement(CRUKSearchkitPaginationItemComponent, {
        label: label,
        onClick: () => this.changeAndScroll(option.key),
        key: option.key,
        itemKey: option.key,
        disabled: option.disabled,
        className: bemPager(option.className)
      })
    })
    
    // If search is blocked, on empty search preformed do not render component.
    if (this.props.blockSearch) return null;

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
CRUKSearchkitPagination.defaultProps['translations'] = {
  'pagination.previous': '<span class="glyphicon glyphicon-chevron-left"></span> Prev',
  'pagination.next': 'Next <span class="glyphicon glyphicon-chevron-right"></span>'
};

/**
 * Export the class.
 */
export default CRUKSearchkitPagination
