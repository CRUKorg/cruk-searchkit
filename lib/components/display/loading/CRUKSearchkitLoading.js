'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bemCn = require('bem-cn');

var _bemCn2 = _interopRequireDefault(_bemCn);

var _searchkit = require('searchkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// Specify the main BEM class that will be used over this component.
var bemLoader = (0, _bemCn2.default)('cr-simple-loader');

/**
 * And the component.
 */

var CRUKSearchkitLoading = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitLoading, _SearchkitComponent);

  function CRUKSearchkitLoading() {
    _classCallCheck(this, CRUKSearchkitLoading);

    return _possibleConstructorReturn(this, (CRUKSearchkitLoading.__proto__ || Object.getPrototypeOf(CRUKSearchkitLoading)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitLoading, [{
    key: 'render',
    value: function render() {
      if (!this.isLoading()) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { className: bemLoader },
        _react2.default.createElement(
          'div',
          { className: bemLoader("spinner") },
          _react2.default.createElement('div', { className: bemLoader("spinner-item ") + bemLoader("spinner-item--bounce1") }),
          _react2.default.createElement('div', { className: bemLoader("spinner-item ") + bemLoader("spinner-item--bounce2") }),
          _react2.default.createElement('div', { className: bemLoader("spinner-item ") + bemLoader("spinner-item--bounce3") })
        )
      );
    }
  }]);

  return CRUKSearchkitLoading;
}(_searchkit.SearchkitComponent);

exports.default = CRUKSearchkitLoading;