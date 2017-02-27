'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bemCn = require('bem-cn');

var _bemCn2 = _interopRequireDefault(_bemCn);

var _searchkit = require('searchkit');

var _lodash = require('lodash');

var _sanitizeHtmlReact = require('sanitize-html-react');

var _sanitizeHtmlReact2 = _interopRequireDefault(_sanitizeHtmlReact);

var _scroll = require('scroll');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// Specify the main BEM class that will be used over this component.
var bemPager = (0, _bemCn2.default)('cr-simple-pager');

/**
 * This file is a mess of extending all sorts, makes me sad inside! This is
 * because we've got a specific way we want the pagination to look.
 */

/**
 * Define a custom itemComponent class for us to use.
 */

var CRUKSearchkitPaginationItemComponent = function (_ItemComponent) {
  _inherits(CRUKSearchkitPaginationItemComponent, _ItemComponent);

  function CRUKSearchkitPaginationItemComponent() {
    _classCallCheck(this, CRUKSearchkitPaginationItemComponent);

    return _possibleConstructorReturn(this, (CRUKSearchkitPaginationItemComponent.__proto__ || Object.getPrototypeOf(CRUKSearchkitPaginationItemComponent)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitPaginationItemComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onClick = _props.onClick,
          disabled = _props.disabled,
          itemKey = _props.itemKey,
          label = _props.label,
          className = _props.className;


      var safeLabel = { __html: label };
      var content = typeof itemKey === 'string' ? _react2.default.createElement('a', { 'data-qa': 'label', dangerouslySetInnerHTML: safeLabel, className: bemPager('link') }) : _react2.default.createElement('span', { 'data-qa': 'label', className: bemPager('indicator'), href: '#' + itemKey, dangerouslySetInnerHTML: safeLabel });

      return _react2.default.createElement(
        _searchkit.FastClick,
        { handler: onClick },
        _react2.default.createElement(
          'li',
          { className: disabled ? className + ' disabled' : className, 'data-qa': 'option', 'data-key': itemKey },
          content
        )
      );
    }
  }]);

  return CRUKSearchkitPaginationItemComponent;
}(_searchkit.ItemComponent);

/**
 * Define our basic pagination class which will spit out a simple pager aligned
 * more to Bootstrap than searchkit.
 */


var CRUKSearchkitPagination = function (_Pagination) {
  _inherits(CRUKSearchkitPagination, _Pagination);

  function CRUKSearchkitPagination(props) {
    _classCallCheck(this, CRUKSearchkitPagination);

    var _this2 = _possibleConstructorReturn(this, (CRUKSearchkitPagination.__proto__ || Object.getPrototypeOf(CRUKSearchkitPagination)).call(this));

    _this2.getAbsPosition = function (element) {
      var el = element;
      var el2 = el;
      var curtop = 0;
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
    };

    _this2.state = {
      clicked: 0
    };

    _this2.changeAndScroll = _this2.changeAndScroll.bind(_this2);
    return _this2;
  }

  _createClass(CRUKSearchkitPagination, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      if (this.state.clicked === 2) {
        var position = this.getAbsPosition(document.getElementById('searchPrototypeApp'));
        _scroll2.default.top(document.querySelector('body'), position);
        // IE and Firefox Hack
        document.documentElement.scrollTop = 0;
        this.setState({ clicked: 0 });
      }
    }
  }, {
    key: 'changeAndScroll',
    value: function changeAndScroll(key) {
      var _this3 = this;

      this.setState({ clicked: 1 }, function () {
        _this3.setPage(key);
        _this3.setState({ clicked: 2 });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (!this.hasHits()) return null;

      /**
       * Inject the page number item into the middle of the array.
       */
      var items = [];
      var currentPage = this.getCurrentPage();
      var totalPages = this.getTotalPages();
      var currentPageItem = {
        disabled: true,
        key: currentPage,
        label: totalPages > 1 ? 'Page ' + currentPage + ' of ' + totalPages : 'Page 1',
        page: currentPage,
        className: 'current'
      };

      /**
       * Remove items so as not to show links that do nothing.
       */
      if (totalPages === 1) {
        items[0] = currentPageItem;
      } else {
        items = this.getPages();
        items[0].className = 'previous';
        items[1].className = 'next';
        items.splice(1, 0, currentPageItem);

        // Remove next.
        if (totalPages === currentPage) {
          items = items.slice(0, 2);
        }
      }

      var view = (0, _lodash.map)(items, function (option) {
        var label = option.title || option.label || option.key;

        return _react2.default.createElement(CRUKSearchkitPaginationItemComponent, {
          label: label,
          onClick: function onClick() {
            return _this4.changeAndScroll(option.key);
          },
          key: option.key,
          itemKey: option.key,
          disabled: option.disabled,
          className: bemPager(option.className)
        });
      });

      // If search is blocked, on empty search preformed do not render component.
      if (this.props.blockSearch) return null;

      return _react2.default.createElement(
        'nav',
        { 'aria-label': 'Select a different page' },
        _react2.default.createElement(
          'ul',
          { className: bemPager },
          view
        )
      );
    }
  }]);

  return CRUKSearchkitPagination;
}(_searchkit.Pagination);

/**
 * Alter the default props.
 */


CRUKSearchkitPagination.propTypes = _extends({
  blockSearch: _react2.default.PropTypes.bool
}, _searchkit.Pagination.propTypes);
CRUKSearchkitPagination.defaultProps['translations'] = {
  'pagination.previous': '<span class="glyphicon glyphicon-chevron-left"></span> Prev',
  'pagination.next': 'Next <span class="glyphicon glyphicon-chevron-right"></span>'
};

/**
 * Export the class.
 */
exports.default = CRUKSearchkitPagination;