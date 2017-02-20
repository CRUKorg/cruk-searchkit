'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _bemCn = require('bem-cn');

var _bemCn2 = _interopRequireDefault(_bemCn);

var _searchkit = require('searchkit');

var _CRUKCustomElasticGetter = require('../getter/CRUKCustomElasticGetter');

var _CRUKCustomElasticGetter2 = _interopRequireDefault(_CRUKCustomElasticGetter);

var _CRUKSearchkitDidYouMeanAccessor = require('./CRUKSearchkitDidYouMeanAccessor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var mainClass = (0, _bemCn2.default)('cr-did-you-mean');

/**
 * CRUKSearchkitAutocomplete component.
 */

var CRUKSearchkitDidYouMean = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitDidYouMean, _SearchkitComponent);

  function CRUKSearchkitDidYouMean(props) {
    _classCallCheck(this, CRUKSearchkitDidYouMean);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitDidYouMean.__proto__ || Object.getPrototypeOf(CRUKSearchkitDidYouMean)).call(this, props));

    _this.clickHandle = _this.clickHandle.bind(_this);
    _this.getQueryAccessorIndex = _this.getQueryAccessorIndex.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitDidYouMean, [{
    key: 'clickHandle',
    value: function clickHandle(e) {
      e.preventDefault();
      var query = e.innerHTML;
      var sbAccessorIndex = this.getQueryAccessorIndex();

      if (sbAccessorIndex) {
        this.searchkit.accessors.accessors[sbAccessorIndex].state.value = e.target.innerHTML;
        this.searchkit.performSearch();
      }
    }
  }, {
    key: 'getQueryAccessorIndex',
    value: function getQueryAccessorIndex() {
      return this.searchkit.accessors.accessors.map(function (v, i) {
        return v.key === 'xss-q' ? i : null;
      }).filter(function (v) {
        return typeof v === 'number';
      }).join();
    }
  }, {
    key: 'defineAccessor',
    value: function defineAccessor() {
      return new _CRUKSearchkitDidYouMeanAccessor.CRUKSearchkitDidYouMeanAccessor(this.props.field);
    }
  }, {
    key: 'render',
    value: function render() {
      var suggestion = this.accessor.getSuggestion();
      if (!suggestion || this.searchkit.results.hits.total > this.props.minResults) return null;

      return _react2.default.createElement(
        'p',
        { className: mainClass() },
        'Did you mean\xA0',
        _react2.default.createElement(
          'a',
          { href: '#t', className: mainClass('link'), onClick: this.clickHandle },
          suggestion
        ),
        '?'
      );
    }
  }]);

  return CRUKSearchkitDidYouMean;
}(_searchkit.SearchkitComponent);

CRUKSearchkitDidYouMean.propTypes = {
  field: _react2.default.PropTypes.string,
  minResults: _react2.default.PropTypes.number
};
CRUKSearchkitDidYouMean.defaultProps = {
  field: 'body',
  minResults: 10
};
exports.default = CRUKSearchkitDidYouMean;