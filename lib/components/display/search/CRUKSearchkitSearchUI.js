'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchkit = require('searchkit');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CRUKSearchkitLoading = require('./../loading/CRUKSearchkitLoading');

var _CRUKSearchkitLoading2 = _interopRequireDefault(_CRUKSearchkitLoading);

var _CRUKSearchkitSummary = require('./../summary/CRUKSearchkitSummary');

var _CRUKSearchkitSummary2 = _interopRequireDefault(_CRUKSearchkitSummary);

var _CRUKSearchkitResultsList = require('./../results-list/CRUKSearchkitResultsList');

var _CRUKSearchkitResultsList2 = _interopRequireDefault(_CRUKSearchkitResultsList);

var _CRUKSearchkitPagination = require('./../../search/pagination/CRUKSearchkitPagination');

var _CRUKSearchkitPagination2 = _interopRequireDefault(_CRUKSearchkitPagination);

var _CRUKSearchkitNoResults = require('./../no-results/CRUKSearchkitNoResults');

var _CRUKSearchkitNoResults2 = _interopRequireDefault(_CRUKSearchkitNoResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Import custom components.
 */


/**
 * Aaand the search interface/ui.
 */
var CRUKSearchkitSearchUI = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitSearchUI, _SearchkitComponent);

  function CRUKSearchkitSearchUI() {
    _classCallCheck(this, CRUKSearchkitSearchUI);

    return _possibleConstructorReturn(this, (CRUKSearchkitSearchUI.__proto__ || Object.getPrototypeOf(CRUKSearchkitSearchUI)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitSearchUI, [{
    key: 'render',
    value: function render() {
      var divClasses = (0, _classnames2.default)('col-xs-12', 'col-sm-10', 'col-md-8', 'col-sm-push-2', 'search-interface', {
        'search-interface--loading': this.isLoading()
      });

      var blockSearch = this.props.blockSearch && this.searchkit.state && Object.keys(this.searchkit.state).length === 0;

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { id: 'search-interface', className: divClasses },
          _react2.default.createElement('div', { className: 'search-interface__blocking-layer' }),
          _react2.default.createElement(_CRUKSearchkitLoading2.default, null),
          _react2.default.createElement(_CRUKSearchkitSummary2.default, { blockSearch: blockSearch }),
          _react2.default.createElement(_CRUKSearchkitResultsList2.default, {
            sourceFilter: ['title', 'url'],
            blockSearch: blockSearch,
            itemComponent: this.props.itemComponent,
            listComponent: this.props.listComponent,
            additionalFields: this.props.additionalFields,
            CRUKHighlightFields: [{
              'field': 'description',
              'number_of_fragments': 0,
              'pre_tags': ['<strong>'],
              'post_tags': ['</strong>']
            }]
          }),
          _react2.default.createElement(_CRUKSearchkitNoResults2.default, {
            component: this.props.component,
            errorComponent: this.props.errorComponent,
            translations: {
              'NoHits.DidYouMean': 'Search for {suggestion}',
              'NoHits.SearchWithoutFilters': 'Search for {query} without filters'
            },
            noResultsBody: this.props.noResultsBody,
            noResultsTitle: this.props.noResultsTitle,
            errorMessage: this.props.errorMessage,
            suggestionsField: 'suggest',
            mod: 'search-failed'
          }),
          _react2.default.createElement(_CRUKSearchkitPagination2.default, { blockSearch: blockSearch })
        )
      );
    }
  }]);

  return CRUKSearchkitSearchUI;
}(_searchkit.SearchkitComponent);

exports.default = CRUKSearchkitSearchUI;