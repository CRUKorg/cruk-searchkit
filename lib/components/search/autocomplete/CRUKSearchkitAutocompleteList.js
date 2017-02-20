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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * CRUKSearchkitAutocomplete component.
 */
var CRUKSearchkitAutocompleteList = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitAutocompleteList, _SearchkitComponent);

  function CRUKSearchkitAutocompleteList(props) {
    _classCallCheck(this, CRUKSearchkitAutocompleteList);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitAutocompleteList.__proto__ || Object.getPrototypeOf(CRUKSearchkitAutocompleteList)).call(this, props));

    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitAutocompleteList, [{
    key: 'clickHandle',
    value: function clickHandle(e) {
      var sbAccessorIndex = this.searchkit.accessors.accessors.map(function (v, i) {
        return v.key === 'xss-q' ? i : null;
      }).filter(function (v) {
        return typeof v === 'number';
      }).join();

      if (sbAccessorIndex) {
        this.searchkit.accessors.accessors[sbAccessorIndex].state.value = e.target.innerHTML;
        this.props.inputState(e.target.innerHTML);
        this.searchkit.performSearch();
      }

      this.props.toggle(false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.getElementById('searchPrototypeApp').addEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.getElementById('searchPrototypeApp').removeEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(evt) {
      var area = _reactDom2.default.findDOMNode(this.refs.autocompleteList);

      if (area && !area.contains(evt.target)) {
        this.props.toggle(false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.autocompleteItems || !this.props.autocompleteActive) return null;

      var bemList = (0, _bemCn2.default)(this.props.listClasses[0]);
      var listClasses = this.props.listClasses.join(' ');
      var list = this.props.autocompleteItems.map(function (v, i) {
        var selected = _this2.props.selectedItem === i + 1 ? ' ' + bemList('list-item--selected') : '';
        var clasNames = '' + bemList('list-item') + selected;
        return _react2.default.createElement(
          'li',
          { onClick: _this2.clickHandle.bind(_this2), className: clasNames, key: i },
          v
        );
      });

      if (list.join() === '') return null;

      return _react2.default.createElement(
        'ul',
        { className: listClasses, ref: 'autocompleteList' },
        list
      );
    }
  }]);

  return CRUKSearchkitAutocompleteList;
}(_searchkit.SearchkitComponent);

CRUKSearchkitAutocompleteList.propTypes = {
  inputState: _react2.default.PropTypes.func,
  autocompleteItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  listClasses: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  autocompleteActive: _react2.default.PropTypes.bool,
  toggle: _react2.default.PropTypes.func
};
CRUKSearchkitAutocompleteList.defaultProps = {
  listClasses: ['cr-autocomplete'],
  autocompleteItems: []
};
exports.default = CRUKSearchkitAutocompleteList;