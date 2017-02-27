'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _searchkit = require('searchkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Export our CRUKSearchkitAlert component.
 */
var CRUKSearchkitAlert = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitAlert, _SearchkitComponent);

  function CRUKSearchkitAlert(props) {
    _classCallCheck(this, CRUKSearchkitAlert);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitAlert.__proto__ || Object.getPrototypeOf(CRUKSearchkitAlert)).call(this, props));

    _this.state = {
      invisible: _reactCookie2.default.load('cru-hu-alert-' + _this.props.id)
    };
    _this.stopAnimation = false;

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitAlert, [{
    key: 'handleClick',
    value: function handleClick(e) {
      this.setState({ invisible: true });
      _reactCookie2.default.save('cru-hu-alert-' + this.props.id, true);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.searchkit.addResultsListener(function (result) {
        _this2.stopAnimation = true;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.invisible || this.isLoading()) return null;
      var dismissableClass = this.props.dismissable ? ' cr-hu-alert--dismissible' : '';
      var animationClass = this.props.animation && !this.stopAnimation ? ' cr-animated-' + this.props.animation : '';
      var cssClasses = 'cr-hu-alert cr-hu-alert--' + this.props.type + dismissableClass + animationClass;
      return _react2.default.createElement(
        'div',
        { id: this.props.id, className: cssClasses, role: 'alert' },
        _react2.default.createElement('i', { className: 'cr-hu-alert__icon', 'aria-hidden': 'true' }),
        _react2.default.createElement(
          'div',
          { className: 'cr-hu-alert__text' },
          this.props.text
        ),
        this.props.dismissable && _react2.default.createElement('button', { type: 'button', className: 'cr-hu-alert__dismiss', onClick: this.handleClick, 'aria-label': 'Dismiss' })
      );
    }
  }]);

  return CRUKSearchkitAlert;
}(_searchkit.SearchkitComponent);

CRUKSearchkitAlert.propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  type: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.object.isRequired,
  dismissable: _react2.default.PropTypes.bool,
  animation: _react2.default.PropTypes.string
};
CRUKSearchkitAlert.defaultProps = {
  type: 'warning',
  dismissable: false
};
exports.default = CRUKSearchkitAlert;