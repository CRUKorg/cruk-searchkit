'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _searchkit = require('searchkit');

var _CRUKCustomElasticGetter = require('../getter/CRUKCustomElasticGetter');

var _CRUKCustomElasticGetter2 = _interopRequireDefault(_CRUKCustomElasticGetter);

var _CRUKSearchkitAutocompleteList = require('../autocomplete/CRUKSearchkitAutocompleteList');

var _CRUKSearchkitAutocompleteList2 = _interopRequireDefault(_CRUKSearchkitAutocompleteList);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Override the render method on the SearchBox component to alter the markup.
 */
var CRUKSearchkitSearchBox = function (_SearchBox) {
  _inherits(CRUKSearchkitSearchBox, _SearchBox);

  function CRUKSearchkitSearchBox(props) {
    _classCallCheck(this, CRUKSearchkitSearchBox);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitSearchBox.__proto__ || Object.getPrototypeOf(CRUKSearchkitSearchBox)).call(this, props));

    _this.state = {
      clearText: false,
      focused: false,
      autocompleteActive: false,
      input: undefined,
      autocompleteItems: [],
      selectedItem: 0
    };
    _this.lastSearchMs = 0;
    _this.throttledSearch = (0, _throttle2.default)(function () {
      _this.searchQuery(_this.accessor.getQueryString());
    }, props.searchThrottleTime);

    _this.autocompleteToggle = _this.autocompleteToggle.bind(_this);
    _this.inputState = _this.inputState.bind(_this);
    _this.handleSearchButton = _this.handleSearchButton.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitSearchBox, [{
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      if (!this.props.autocompleteEnable) return;
      var _state = this.state,
          autocompleteItems = _state.autocompleteItems,
          selectedItem = _state.selectedItem;


      if (this.refs.queryField.value === '') {
        this.setState({ autocompleteActive: false });
        return;
      }

      var self = this;

      if (e.keyCode === 40 || e.keyCode === 38) {
        this.handleAutocompleteItems(e.keyCode);
        return;
      }
      if (this.props.test) return;

      var getter = new _CRUKCustomElasticGetter2.default(this.searchkit.host + '/_suggest');
      getter.autocompleteRequest(this.refs.queryField.value).then(function (response) {
        self.setState({
          autocompleteItems: CRUKSearchkitSearchBox.buildResults(response.data),
          autocompleteActive: true
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'autocompleteToggle',
    value: function autocompleteToggle(flag) {
      this.setState({ autocompleteActive: flag });
    }
  }, {
    key: 'inputState',
    value: function inputState(state) {
      this.setState({ input: state });
    }
  }, {
    key: 'handleAutocompleteItems',
    value: function handleAutocompleteItems(arrow) {
      var _state2 = this.state,
          autocompleteItems = _state2.autocompleteItems,
          selectedItem = _state2.selectedItem;


      if (this.props.test) {
        autocompleteItems = this.props.autocompleteItems;
      }

      if (autocompleteItems.length < 1) return;

      var selectedItemIndex = function () {
        if (arrow === 40) {
          if (selectedItem < autocompleteItems.length) return selectedItem + 1;
          return autocompleteItems.length;
        }
        if (arrow === 38) {
          if (selectedItem > 1) return selectedItem - 1;
          return 1;
        }
        return 0;
      }();

      this.setState({
        selectedItem: selectedItemIndex
      });
    }
  }, {
    key: 'setFocusState',
    value: function setFocusState(focused) {
      if (!focused) {
        var input = this.state.input;

        if (this.props.blurAction === 'search' && !(0, _lodash.isUndefined)(input) && input != this.getAccessorValue()) {
          this.searchQuery(input);
        }
        /**
         * Behave differently if this component has autocomplete enabled, needs
         * to be smarter innit.
         */
        if (this.props.autocompleteEnable) {
          if (!this.state.autocompleteActive) {
            this.setState({ focused: focused });
          }
        } else {
          this.setState({
            focused: focused,
            input: undefined // Flush (should use accessor's state now)
          });
        }
      } else {
        this.setState({ focused: focused });
      }
    }
  }, {
    key: 'handleSearchButton',
    value: function handleSearchButton(e) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      var clearText = this.state.clearText;

      if (w <= 768 && clearText) {
        e.preventDefault();
        this.setState({
          focused: true,
          clearText: false
        });
        console.log(this.refs.queryField.value);
        this.refs.queryField.value = '';
        this.refs.queryField.focus();
      }
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this2 = this;

      var _state3 = this.state,
          autocompleteItems = _state3.autocompleteItems,
          selectedItem = _state3.selectedItem;

      event.preventDefault();
      var query = this.getValue();

      if (this.props.autocompleteEnable && selectedItem > 0) {
        query = autocompleteItems[selectedItem - 1];
        this.setState({
          input: query,
          selectedItem: 0,
          autocompleteActive: false
        }, function () {
          _this2.searchQuery(query);
        });
      }

      /**
       * De-focus the input.
       */
      if (document.activeElement != document.body) {
        document.activeElement.blur();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;

      if (!this.props.test) {
        this.searchkit.addResultsListener(function (results) {
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          var clearText = w <= 768 ? true : false;
          self.setState({
            input: self.getAccessorValue(),
            clearText: clearText
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          focused = _state4.focused,
          selectedItem = _state4.selectedItem,
          clearText = _state4.clearText;
      var _state5 = this.state,
          autocompleteItems = _state5.autocompleteItems,
          autocompleteActive = _state5.autocompleteActive;


      var wrapper_class = 'cr-input-group cr-input-group--lg cr-search-input';
      var placeholder = this.props.placeholder || this.translate('searchbox.placeholder');
      if (focused) {
        wrapper_class += ' cr-input-group--focused';
      }

      if (this.props.test && this.props.autocompleteItems) {
        autocompleteItems = this.props.autocompleteItems;
        autocompleteActive = true;
      }

      if (clearText) {
        wrapper_class += ' cr-search-input--closer';
      }
      return _react2.default.createElement(
        'form',
        { action: '.', onSubmit: this.onSubmit.bind(this) },
        _react2.default.createElement(
          'div',
          { className: wrapper_class },
          _react2.default.createElement(
            'label',
            { htmlFor: 'search-input', id: 'search-label' },
            placeholder
          ),
          _react2.default.createElement('input', {
            type: 'search',
            'data-qa': 'query',
            id: 'search-input',
            className: 'cr-input-group__input cr-search-input__input',
            placeholder: placeholder,
            value: this.getValue(),
            onFocus: this.setFocusState.bind(this, true),
            onBlur: this.setFocusState.bind(this, false),
            onKeyUp: this.handleKeyUp.bind(this),
            ref: 'queryField',
            autoFocus: this.props.autofocus,
            onChange: this.onChange.bind(this),
            'aria-describedby': 'search-label',
            autoComplete: 'off',
            autoCorrect: 'off',
            tabIndex: '1'
          }),
          _react2.default.createElement(
            'span',
            { className: 'cr-input-group__button cr-search-input__button' },
            _react2.default.createElement(
              'button',
              {
                type: 'submit',
                className: 'btn',
                'aria-label': 'Submit your search',
                'data-qa': 'submit',
                onClick: this.handleSearchButton
              },
              _react2.default.createElement('span', { className: 'cr-input-group__icon glyphicon glyphicon-search', 'aria-hidden': 'true' })
            )
          ),
          this.props.autocompleteEnable && _react2.default.createElement(_CRUKSearchkitAutocompleteList2.default, {
            selectedItem: selectedItem,
            inputState: this.inputState,
            autocompleteActive: autocompleteActive,
            autocompleteItems: autocompleteItems,
            toggle: this.autocompleteToggle
          })
        )
      );
    }
  }]);

  return CRUKSearchkitSearchBox;
}(_searchkit.SearchBox);

CRUKSearchkitSearchBox.buildResults = function (results) {
  return results.title_suggest[0].options.map(function (v) {
    return v.text;
  });
};

CRUKSearchkitSearchBox.propTypes = _extends({
  autocompleteEnable: _react2.default.PropTypes.bool,
  test: _react2.default.PropTypes.bool,
  autocompleteItems: _react2.default.PropTypes.array
}, _searchkit.SearchBox.propTypes);
exports.default = CRUKSearchkitSearchBox;