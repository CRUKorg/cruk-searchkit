'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDates = require('react-dates');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _searchkit = require('searchkit');

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

var _CRUKSearchkitDateRangeAccessor = require('./CRUKSearchkitDateRangeAccessor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var isUndefined = require('lodash/isUndefined');

var CRUKSearchkitDateRange = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitDateRange, _SearchkitComponent);

  function CRUKSearchkitDateRange(props) {
    _classCallCheck(this, CRUKSearchkitDateRange);

    var startDate = props.startDate ? props.startDate : null;
    var endDate = props.endDate ? props.endDate : null;

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitDateRange.__proto__ || Object.getPrototypeOf(CRUKSearchkitDateRange)).call(this, props));

    _this.state = {
      focusedInput: null,
      startDate: startDate,
      endDate: endDate,
      initialVisibleMonth: function initialVisibleMonth() {
        return (0, _moment2.default)();
      }
    };

    _this.noArgs = true;

    _this.onDatesChange = _this.onDatesChange.bind(_this);
    _this.onFocusChange = _this.onFocusChange.bind(_this);
    _this.updateParentState = _this.updateParentState.bind(_this);
    return _this;
  }

  _createClass(CRUKSearchkitDateRange, [{
    key: 'onDatesChange',
    value: function onDatesChange(_ref) {
      var _this2 = this;

      var startDate = _ref.startDate,
          endDate = _ref.endDate;


      this.setState({ startDate: startDate, endDate: endDate }, function () {
        _this2.updateAccessorState(startDate, endDate);
      });

      this.noArgs = false;
    }
  }, {
    key: 'updateAccessorState',
    value: function updateAccessorState(startDate, endDate) {
      if (startDate && endDate) {
        this.accessor.state = this.accessor.state.setValue({
          min: startDate.format("YYYY-MM-DD"),
          max: endDate.format("YYYY-MM-DD")
        });
        this.searchkit.performSearch();
      } else if (!startDate && !endDate) {
        this.accessor.state = this.accessor.state.clear();
        this.searchkit.performSearch();
      }
    }
  }, {
    key: 'updateParentState',
    value: function updateParentState(startDate, endDate) {
      this.setState({
        startDate: startDate ? (0, _moment2.default)(startDate) : startDate,
        endDate: endDate ? (0, _moment2.default)(endDate) : endDate
      });
    }
  }, {
    key: 'onFocusChange',
    value: function onFocusChange(focusedInput) {
      this.setState({ focusedInput: focusedInput });
    }
  }, {
    key: 'defineAccessor',
    value: function defineAccessor() {
      var _props = this.props,
          id = _props.id,
          title = _props.title,
          field = _props.field,
          startDate = _props.startDate,
          endDate = _props.endDate,
          interval = _props.interval,
          showHistogram = _props.showHistogram;

      var updateParentState = this.updateParentState;
      return new _CRUKSearchkitDateRangeAccessor.CRUKSearchkitDateRangeAccessor(id, {
        id: id, startDate: startDate, endDate: endDate, title: title, field: field, interval: interval, updateParentState: updateParentState
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var argState = this.accessor.getQueryObject();
      var _state = this.state,
          focusedInput = _state.focusedInput,
          startDate = _state.startDate,
          endDate = _state.endDate,
          initialVisibleMonth = _state.initialVisibleMonth;
      /**
       * These functions can return null so check for bool true.
       */

      var md = new _mobileDetect2.default(window.navigator.userAgent);
      var isMobile = md.mobile() || md.phone();
      var numberOfMonths = isMobile ? 1 : 2;

      if (this.noArgs && argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
        if (_typeof(argState[this.props.id].min) !== undefined) {
          startDate = (0, _moment2.default)(argState[this.props.id].min);
          initialVisibleMonth = function initialVisibleMonth() {
            return startDate;
          };
        }
        endDate = _typeof(argState[this.props.id].max) !== undefined ? (0, _moment2.default)(argState[this.props.id].max) : null;
      }

      return _react2.default.createElement(
        'div',
        { className: focusedInput ? 'cr-daterange-wrapper cr-daterange-wrapper--focused' : 'cr-daterange-wrapper' },
        _react2.default.createElement(_reactDates.DateRangePicker, _extends({}, this.props, {
          onDatesChange: this.onDatesChange,
          onFocusChange: this.onFocusChange,
          focusedInput: focusedInput,
          startDate: startDate,
          endDate: endDate,
          initialVisibleMonth: initialVisibleMonth,
          displayFormat: 'DD/MM/YYYY',
          numberOfMonths: numberOfMonths
        }))
      );
    }
  }]);

  return CRUKSearchkitDateRange;
}(_searchkit.SearchkitComponent);

CRUKSearchkitDateRange.defaultProps = {
  isOutsideRange: function isOutsideRange() {
    return false;
  }
};

exports.default = CRUKSearchkitDateRange;