'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchkit = require('searchkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Export our result component.
 */
var CRUKSearchkitHelpText = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitHelpText, _SearchkitComponent);

  function CRUKSearchkitHelpText() {
    _classCallCheck(this, CRUKSearchkitHelpText);

    return _possibleConstructorReturn(this, (CRUKSearchkitHelpText.__proto__ || Object.getPrototypeOf(CRUKSearchkitHelpText)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitHelpText, [{
    key: 'render',
    value: function render() {
      // If there are no arguments in the URL stop initial search.
      var searchOnLoad = window.location.href.split(/[&?]/).filter(function (v, i) {
        return i > 0;
      }).length > 0;
      if (searchOnLoad && !this.props.test) return null;
      return _react2.default.createElement(
        'div',
        { className: 'col-xs-12 col-sm-8 col-sm-push-2 help-text' },
        this.props.helptext || _react2.default.createElement(
          'h2',
          null,
          'Please enter a keyword in the text box to start searching.'
        )
      );
    }
  }]);

  return CRUKSearchkitHelpText;
}(_searchkit.SearchkitComponent);

CRUKSearchkitHelpText.propTypes = {
  helptext: _react2.default.PropTypes.object,
  test: _react2.default.PropTypes.bool
};
exports.default = CRUKSearchkitHelpText;