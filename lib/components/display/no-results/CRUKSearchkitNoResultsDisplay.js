'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKSearchkitNoResultsDisplay = function (_React$Component) {
  _inherits(CRUKSearchkitNoResultsDisplay, _React$Component);

  function CRUKSearchkitNoResultsDisplay() {
    _classCallCheck(this, CRUKSearchkitNoResultsDisplay);

    return _possibleConstructorReturn(this, (CRUKSearchkitNoResultsDisplay.__proto__ || Object.getPrototypeOf(CRUKSearchkitNoResultsDisplay)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitNoResultsDisplay, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          bemBlocks = _props.bemBlocks,
          query = _props.query,
          suggestion = _props.suggestion;

      var queryLabel = query ? _react2.default.createElement(
        'span',
        null,
        ' - ',
        _react2.default.createElement(
          'strong',
          null,
          query
        )
      ) : '';

      var noResultsBody = function () {
        if (_this2.props.noResultsBody === '') return '';
        if (_this2.props.noResultsBody) return _this2.props.noResultsBody;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Suggestions:'
          ),
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              'Check your spelling'
            ),
            _react2.default.createElement(
              'li',
              null,
              'Try different or more general words'
            )
          )
        );
      }();

      var noResultsTitle = function () {
        if (_this2.props.noResultsTitle === '') return '';
        if (_this2.props.noResultsTitle) return _react2.default.createElement(
          'h2',
          { className: 'no-results__heading' },
          _this2.props.noResultsTitle,
          queryLabel
        );
        return _react2.default.createElement(
          'h2',
          { className: 'no-results__heading' },
          'We didn\'t find any results for your search',
          queryLabel
        );
      }();

      return _react2.default.createElement(
        'div',
        { 'data-qa': 'no-hits', className: bemBlocks.container() },
        _react2.default.createElement(
          'div',
          { className: bemBlocks.container("info") },
          noResultsTitle,
          noResultsBody
        )
      );
    }
  }]);

  return CRUKSearchkitNoResultsDisplay;
}(_react2.default.Component);

exports.default = CRUKSearchkitNoResultsDisplay;