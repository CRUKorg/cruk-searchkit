'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _searchkit = require('searchkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var allItem = {
  key: "$all", label: "All"
};

var CRUKSearchkitMenuFilter = function (_MenuFilter) {
  _inherits(CRUKSearchkitMenuFilter, _MenuFilter);

  function CRUKSearchkitMenuFilter() {
    _classCallCheck(this, CRUKSearchkitMenuFilter);

    return _possibleConstructorReturn(this, (CRUKSearchkitMenuFilter.__proto__ || Object.getPrototypeOf(CRUKSearchkitMenuFilter)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitMenuFilter, [{
    key: 'getItems',

    /**
     * Override getItems() to allow the options to follow a specific order.
     */
    value: function getItems() {
      /**
       * Reverse the options order array so we flip keys for values.
       */
      var order = [];
      (0, _lodash.forEach)(this.props.optionsOrder, function (value, key) {
        order[value] = key;
      });

      var all = {
        key: allItem.key,
        label: allItem.label,
        doc_count: this.accessor.getDocCount()
      };

      var items = (0, _lodash.concat)([all], this.accessor.getBuckets());

      /**
       * Sort things.
       */
      if (items.length > 1 && Object.keys(order).length > 1) {
        /**
         * We've inverted the array of options in order which means we can find
         * items by entering the text value, the original index number is how
         * we can compare items to sort by.
         */
        items.sort(function (x, y) {
          return parseInt(order[x.key]) > parseInt(order[y.key]);
        });
      }

      return items;
    }
  }]);

  return CRUKSearchkitMenuFilter;
}(_searchkit.MenuFilter);

CRUKSearchkitMenuFilter.defaultProps.optionsOrder = [];
CRUKSearchkitMenuFilter.propTypes.optionsOrder = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string);

exports.default = CRUKSearchkitMenuFilter;