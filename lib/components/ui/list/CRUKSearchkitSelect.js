'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _searchkit = require('searchkit');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKSearchkitSelect = function (_Select) {
  _inherits(CRUKSearchkitSelect, _Select);

  function CRUKSearchkitSelect(props) {
    _classCallCheck(this, CRUKSearchkitSelect);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitSelect.__proto__ || Object.getPrototypeOf(CRUKSearchkitSelect)).call(this, props));

    _this.state = {
      focused: false
    };
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitSelect, [{
    key: 'handleFocus',
    value: function handleFocus(e) {
      this.setState({ focused: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      this.setState({ focused: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          mod = _props.mod,
          className = _props.className,
          items = _props.items,
          disabled = _props.disabled,
          showCount = _props.showCount,
          translate = _props.translate,
          countFormatter = _props.countFormatter;


      var bemBlocks = {
        container: (0, _searchkit.block)(mod)
      };

      var divClasses = (0, _classnames2.default)(bemBlocks.container().mix(className).state({ disabled: disabled }), 'form-group');
      var options = (0, _lodash.map)(items, function (_ref, idx) {
        var key = _ref.key,
            label = _ref.label,
            title = _ref.title,
            disabled = _ref.disabled,
            doc_count = _ref.doc_count;

        var text = translate(label || title || key);
        if (showCount && doc_count !== undefined) text += ' (' + countFormatter(doc_count) + ')';
        return _react2.default.createElement(
          'option',
          { key: key, value: key, disabled: disabled },
          text
        );
      });

      return _react2.default.createElement(
        'div',
        { className: this.state.focused ? divClasses + ' form-group--focused' : divClasses },
        _react2.default.createElement(
          'select',
          { onChange: this.onChange, value: this.getSelectedValue(), className: 'form-control', onFocus: this.handleFocus, onBlur: this.handleBlur },
          options
        )
      );
    }
  }]);

  return CRUKSearchkitSelect;
}(_searchkit.Select);

CRUKSearchkitSelect.defaultProps.mod = 'cr-select';

exports.default = CRUKSearchkitSelect;