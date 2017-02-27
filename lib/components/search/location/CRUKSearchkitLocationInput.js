'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactGeosuggest = require('react-geosuggest');

var _reactGeosuggest2 = _interopRequireDefault(_reactGeosuggest);

var _searchkit = require('searchkit');

var _CRUKSearchkitLocationAccessor = require('./CRUKSearchkitLocationAccessor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKSearchkitLocationInput = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitLocationInput, _SearchkitComponent);

  function CRUKSearchkitLocationInput(props) {
    _classCallCheck(this, CRUKSearchkitLocationInput);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitLocationInput.__proto__ || Object.getPrototypeOf(CRUKSearchkitLocationInput)).call(this, props));

    _this.state = {
      lat: null,
      lng: null,
      placeId: null,
      searchedAddress: null
    };

    _this.preformedSearch = false;

    _this.onSuggestSelect = _this.onSuggestSelect.bind(_this);
    _this.getSelectedLocation = _this.getSelectedLocation.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.getSuggestLabel = _this.getSuggestLabel.bind(_this);
    _this.onSuggestNoResults = _this.onSuggestNoResults.bind(_this);
    _this.onKeyPress = _this.onKeyPress.bind(_this);
    _this.updateParentState = _this.updateParentState.bind(_this);
    _this.resetState = _this.resetState.bind(_this);
    _this.locationSort = _this.locationSort.bind(_this);
    _this.handleEmptyLabel = _this.handleEmptyLabel.bind(_this);
    return _this;
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */


  _createClass(CRUKSearchkitLocationInput, [{
    key: 'onSuggestSelect',
    value: function onSuggestSelect(suggest) {
      var _this2 = this;

      var searchedAddress = this.state.searchedAddress;

      this.setState({
        lat: suggest.lat,
        lng: suggest.lng,
        placeId: suggest.placeId,
        searchedAddress: searchedAddress
      }, function () {
        return _this2.preformSearch(suggest);
      });
      this.refs.g_wrapper.className = 'cr-geosuggest-wrapper';
      this.preformSearch(suggest);
      this.removeEmptyLabel();
    }
  }, {
    key: 'onChange',
    value: function onChange(suggest) {
      this.refs.geoLoader.className = 'geoSuggestLoader activated';
      if (suggest === '') {
        this.refs.geoLoader.className = 'geoSuggestLoader';
        this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--active';
        this.resetState(this.preformSearch({ location: this.state }));
      }
    }
  }, {
    key: 'resetState',
    value: function resetState(callback) {
      var latLng = {
        lat: null,
        lng: null,
        placeId: null,
        searchedAddress: null
      };
      this.setState(latLng, callback);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(suggest) {
      this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--active';
    }
  }, {
    key: 'onBlur',
    value: function onBlur(suggest) {
      this.refs.g_wrapper.className = 'cr-geosuggest-wrapper';
      document.querySelector('.geosuggest__suggests').className = 'geosuggest__suggests geosuggest__suggests--hidden';
      var exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
      if (exitingItem[0]) this.refs.geoSuggest.setState({ userInput: '' });
      this.removeEmptyLabel();
    }
  }, {
    key: 'getSuggestLabel',
    value: function getSuggestLabel(suggest) {
      this.refs.geoLoader.className = 'geoSuggestLoader';
      this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--dropdown';
      return suggest.description;
    }
  }, {
    key: 'onSuggestNoResults',
    value: function onSuggestNoResults(userInputs) {
      var self = this;
      if (this.refs.geoSuggest.refs.input.refs.input.value !== '') {
        setTimeout(function () {
          self.handleEmptyLabel();
        }, 1000);
      }
    }
  }, {
    key: 'handleEmptyLabel',
    value: function handleEmptyLabel() {
      var exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
      var resultList = document.querySelector('.geosuggest__suggests');
      this.removeEmptyLabel();
      var li = document.createElement('li');
      li.className = 'geosuggest-item geosuggest-item--disabled';
      li.innerHTML = 'No results';
      resultList.className = 'geosuggest__suggests';
      this.refs.geoLoader.className = 'geoSuggestLoader';
      resultList.appendChild(li);
    }
  }, {
    key: 'removeEmptyLabel',
    value: function removeEmptyLabel() {
      var resultList = document.querySelector('.geosuggest__suggests');
      var exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
      if (exitingItem[0]) resultList.removeChild(exitingItem[0]);
    }
  }, {
    key: 'updateParentState',
    value: function updateParentState(argState) {
      if (Object.keys(argState[this.props.id]).length === 0) {
        this.resetState();
      } else {
        this.getSelectedLocation(argState);
      }
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress() {
      // this.refs.geoLoader.className = 'geoSuggestLoader activated'
    }
  }, {
    key: 'getSelectedLocation',
    value: function getSelectedLocation(argState) {
      var geocoder = new window.google.maps.Geocoder();
      var self = this;

      this.preformedSearch = true;
      geocoder.geocode({ 'placeId': argState[this.props.id].placeId }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK && results[0].address_components) {
          self.setState({ searchedAddress: self.buildAddressFormattedString(results[0].address_components) });
          self.forceUpdate();
        }
      });
    }
  }, {
    key: 'preformSearch',
    value: function preformSearch(query) {
      var _state = this.state,
          lat = _state.lat,
          lng = _state.lng;

      var sortKey = query.location.lat ? 'location' : 'date';
      this.locationSort(sortKey);
      if (query.location.lat == lat && query.location.lng == lng) {
        this.accessor.state = this.accessor.state.clear();
      } else {
        this.accessor.state = this.accessor.state.setValue({
          lat: query.location.lat,
          lng: query.location.lng,
          placeId: query.placeId
        });
      }

      this.searchkit.performSearch();
    }
  }, {
    key: 'locationSort',
    value: function locationSort() {
      var sortValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'location';

      var sortIndex = this.searchkit.accessors.accessors.map(function (v, i) {
        return { i: i, v: v.key };
      }).filter(function (v) {
        return v.v === 'sort';
      });
      if (sortIndex.length > 0) this.searchkit.accessors.accessors[sortIndex[0].i].state = this.searchkit.accessors.accessors[sortIndex[0].i].state.setValue(sortValue);
    }
  }, {
    key: 'buildAddressFormattedString',
    value: function buildAddressFormattedString(locations) {
      return locations.map(function (v, i, a) {
        return v.long_name;
      }).filter(function (v, i, a) {
        return a.indexOf(v) === i && a.length > i + 1;
      }).filter(function (v, i, a) {
        return a.filter(function (val) {
          return v !== val;
        }).map(function (val) {
          return v.indexOf(val) === -1;
        }).join('').indexOf('false') === -1;
      }).join(', ');
    }
  }, {
    key: 'defineAccessor',
    value: function defineAccessor() {
      var _props = this.props,
          id = _props.id,
          title = _props.title,
          field = _props.field,
          resultRadius = _props.resultRadius;

      var updateParentState = this.updateParentState;
      return new _CRUKSearchkitLocationAccessor.CRUKSearchkitLocationAccessor(id, {
        id: id, title: title, field: field, resultRadius: resultRadius, updateParentState: updateParentState
      });
    }

    /**
     * Render the example app.
     */

  }, {
    key: 'render',
    value: function render() {
      var searchedAddress = this.state.searchedAddress;

      var argState = this.accessor.getQueryObject();

      if (!this.preformedSearch && argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
        this.getSelectedLocation(argState);
      }

      var inputClassName = this.props.inputClassName + ' form-control';

      return _react2.default.createElement(
        'div',
        { className: 'cr-geosuggest-wrapper', ref: 'g_wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(_reactGeosuggest2.default, {
            queryDelay: this.props.queryDelay,
            ref: 'geoSuggest',
            placeholder: this.props.placeholder,
            initialValue: searchedAddress || this.props.initialValue,
            fixtures: this.props.fixtures,
            onSuggestSelect: this.onSuggestSelect,
            onSuggestNoResults: this.onSuggestNoResults,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onKeyPress: this.onKeyPress,
            getSuggestLabel: this.getSuggestLabel,
            location: this.props.location,
            radius: this.props.radius,
            country: this.props.country,
            inputClassName: inputClassName
          }),
          _react2.default.createElement('div', { className: 'geoSuggestLoader', ref: 'geoLoader' })
        )
      );
    }
  }]);

  return CRUKSearchkitLocationInput;
}(_searchkit.SearchkitComponent);

CRUKSearchkitLocationInput.propTypes = _extends({
  queryDelay: _react2.default.PropTypes.number,
  placeholder: _react2.default.PropTypes.string,
  initialValue: _react2.default.PropTypes.string,
  country: _react2.default.PropTypes.string,
  radius: _react2.default.PropTypes.string,
  location: _react2.default.PropTypes.object,
  fixtures: _react2.default.PropTypes.array
}, _searchkit.SearchkitComponent.propTypes);
exports.default = CRUKSearchkitLocationInput;