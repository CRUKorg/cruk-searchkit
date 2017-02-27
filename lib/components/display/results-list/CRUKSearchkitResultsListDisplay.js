'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchkit = require('searchkit');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Define our class.
 */
var CRUKSearchkitResultsListDisplay = function (_HitsList) {
  _inherits(CRUKSearchkitResultsListDisplay, _HitsList);

  function CRUKSearchkitResultsListDisplay() {
    _classCallCheck(this, CRUKSearchkitResultsListDisplay);

    return _possibleConstructorReturn(this, (CRUKSearchkitResultsListDisplay.__proto__ || Object.getPrototypeOf(CRUKSearchkitResultsListDisplay)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitResultsListDisplay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          hits = _props.hits,
          mod = _props.mod,
          className = _props.className,
          itemComponent = _props.itemComponent,
          additionalFields = _props.additionalFields;

      var bemBlocks = {
        container: (0, _searchkit.block)(mod),
        item: (0, _searchkit.block)(mod + '-hit')
      };
      return _react2.default.createElement(
        'section',
        { 'data-qa': 'hits', className: bemBlocks.container().mix(className) },
        (0, _lodash.map)(hits, function (result, index) {
          return (0, _searchkit.renderComponent)(itemComponent, {
            key: result._id, result: result, bemBlocks: bemBlocks, index: index, additionalFields: additionalFields
          });
        })
      );
    }
  }]);

  return CRUKSearchkitResultsListDisplay;
}(_searchkit.HitsList);

exports.default = CRUKSearchkitResultsListDisplay;