'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _searchkit = require('searchkit');

var _CRUKSearchkitNoResultsErrorDisplay = require('./CRUKSearchkitNoResultsErrorDisplay');

var _CRUKSearchkitNoResultsErrorDisplay2 = _interopRequireDefault(_CRUKSearchkitNoResultsErrorDisplay);

var _CRUKSearchkitNoResultsDisplay = require('./CRUKSearchkitNoResultsDisplay');

var _CRUKSearchkitNoResultsDisplay2 = _interopRequireDefault(_CRUKSearchkitNoResultsDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaults = require('lodash/defaults');

var CRUKSearchkitNoResults = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitNoResults, _SearchkitComponent);

  function CRUKSearchkitNoResults() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CRUKSearchkitNoResults);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CRUKSearchkitNoResults.__proto__ || Object.getPrototypeOf(CRUKSearchkitNoResults)).call.apply(_ref, [this].concat(args))), _this), _this.translations = CRUKSearchkitNoResults.translations, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CRUKSearchkitNoResults, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(CRUKSearchkitNoResults.prototype.__proto__ || Object.getPrototypeOf(CRUKSearchkitNoResults.prototype), 'componentWillMount', this).call(this);
      this.noFiltersAccessor = this.searchkit.addAccessor(new _searchkit.NoFiltersHitCountAccessor());
      if (this.props.suggestionsField) {
        this.suggestionsAccessor = this.searchkit.addAccessor(new _searchkit.SuggestionsAccessor(this.props.suggestionsField));
      }
    }
  }, {
    key: 'defineBEMBlocks',
    value: function defineBEMBlocks() {
      var block = this.props.mod || 'search-failed';
      return {
        container: block
      };
    }
  }, {
    key: 'getSuggestion',
    value: function getSuggestion() {
      return this.suggestionsAccessor && this.suggestionsAccessor.getSuggestion();
    }
  }, {
    key: 'setQueryString',
    value: function setQueryString(query) {
      this.searchkit.getQueryAccessor().setQueryString(query, true);
      this.searchkit.performSearch(true);
    }
  }, {
    key: 'resetFilters',
    value: function resetFilters() {
      this.searchkit.getQueryAccessor().keepOnlyQueryState();
      this.searchkit.performSearch(true);
    }
  }, {
    key: 'resetSearch',
    value: function resetSearch() {
      this.searchkit.getQueryAccessor().resetState();
      this.searchkit.performSearch(true);
    }
  }, {
    key: 'getFilterCount',
    value: function getFilterCount() {
      return this.noFiltersAccessor && this.noFiltersAccessor.getCount();
    }
  }, {
    key: 'render',
    value: function render() {
      if ((this.hasHits() || this.isInitialLoading() || this.isLoading()) && !this.getError()) return React.createElement('div', null);

      if (this.getError()) {
        var _props = {
          errorLabel: this.translate('NoHits.Error'),
          errorMessage: this.props.errorMessage,
          resetSearchFn: this.resetSearch.bind(this),
          translate: this.translate,
          bemBlocks: this.bemBlocks,
          tryAgainLabel: this.translate('NoHits.ResetSearch'),
          error: this.getError()
        };

        return React.createElement(this.props.errorComponent, _props);
      }

      var suggestion = this.getSuggestion();
      var query = this.getQuery().getQueryString();
      var infoKey = suggestion ? 'NoHits.NoResultsFoundDidYouMean' : 'NoHits.NoResultsFound';

      var props = {
        noResultsLabel: this.props.noResultsLabel,
        noResultsBody: this.props.noResultsBody,
        noResultsTitle: this.props.noResultsTitle,
        translate: this.translate,
        bemBlocks: this.bemBlocks,
        suggestion: suggestion,
        query: query,
        filtersCount: this.getFilterCount(),
        resetFiltersFn: this.resetFilters.bind(this),
        setSuggestionFn: this.setQueryString.bind(this, suggestion)
      };

      return React.createElement(this.props.component, props);
    }
  }]);

  return CRUKSearchkitNoResults;
}(_searchkit.SearchkitComponent);

CRUKSearchkitNoResults.translations = {
  'NoHits.NoResultsFound': 'No results found for {query}.',
  'NoHits.NoResultsFoundDidYouMean': 'No results found for {query}. Did you mean {suggestion}?',
  'NoHits.DidYouMean': 'Search for {suggestion} instead',
  'NoHits.SearchWithoutFilters': 'Search for {query} without filters',
  'NoHits.Error': "We're sorry, an issue occured when fetching your results. Please try again.",
  'NoHits.ResetSearch': 'Reset Search'
};
CRUKSearchkitNoResults.propTypes = defaults({
  suggestionsField: React.PropTypes.string,
  errorComponent: React.PropTypes.func,
  component: React.PropTypes.func,
  noResultsLabel: React.PropTypes.object,
  noResultsTitle: React.PropTypes.object,
  noResultsBody: React.PropTypes.object,
  errorMessage: React.PropTypes.object,
  translations: _searchkit.SearchkitComponent.translationsPropType(CRUKSearchkitNoResults.translations)
}, _searchkit.SearchkitComponent.propTypes);
CRUKSearchkitNoResults.defaultProps = {
  errorComponent: _CRUKSearchkitNoResultsErrorDisplay2.default,
  component: _CRUKSearchkitNoResultsDisplay2.default
};
exports.default = CRUKSearchkitNoResults;