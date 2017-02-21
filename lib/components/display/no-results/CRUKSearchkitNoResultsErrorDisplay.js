"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _searchkit = require("searchkit");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKNoResultsErrorDisplay = function (_React$Component) {
  _inherits(CRUKNoResultsErrorDisplay, _React$Component);

  function CRUKNoResultsErrorDisplay() {
    _classCallCheck(this, CRUKNoResultsErrorDisplay);

    return _possibleConstructorReturn(this, (CRUKNoResultsErrorDisplay.__proto__ || Object.getPrototypeOf(CRUKNoResultsErrorDisplay)).apply(this, arguments));
  }

  _createClass(CRUKNoResultsErrorDisplay, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          errorLabel = _props.errorLabel,
          bemBlocks = _props.bemBlocks,
          resetSearchFn = _props.resetSearchFn,
          tryAgainLabel = _props.tryAgainLabel,
          errorMessage = _props.errorMessage;


      return React.createElement(
        "div",
        { "data-qa": "no-hits", className: bemBlocks.container() },
        React.createElement(
          "div",
          { className: bemBlocks.container("info") },
          errorMessage || errorLabel
        ),
        React.createElement(
          "div",
          { className: bemBlocks.container("steps") },
          React.createElement(
            _searchkit.FastClick,
            { handler: resetSearchFn },
            React.createElement(
              "div",
              { className: bemBlocks.container("step-action") },
              tryAgainLabel
            )
          )
        )
      );
    }
  }]);

  return CRUKNoResultsErrorDisplay;
}(React.Component);

CRUKNoResultsErrorDisplay.propTypes = {
  errorLabel: React.PropTypes.string,
  tryAgainLabel: React.PropTypes.string,
  resetSearchFn: React.PropTypes.func,
  translate: React.PropTypes.func,
  bemBlocks: React.PropTypes.object,
  error: React.PropTypes.any
};
exports.default = CRUKNoResultsErrorDisplay;