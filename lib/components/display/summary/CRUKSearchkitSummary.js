'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sanitizeHtmlReact = require('sanitize-html-react');

var _sanitizeHtmlReact2 = _interopRequireDefault(_sanitizeHtmlReact);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _searchkit = require('searchkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKSearchkitSummaryDisplay = function CRUKSearchkitSummaryDisplay(props) {
  var resultsFoundLabel = props.resultsFoundLabel,
      bemBlocks = props.bemBlocks;

  /**
   * As we're going to straight output the string as HTML, sanitise it first
   * but allowing
   */

  var sanitisedResultsFoundLabel = {
    __html: (0, _sanitizeHtmlReact2.default)(resultsFoundLabel, {
      allowedTags: ['strong'],
      allowedAttributes: []
    })
  };

  return _react2.default.createElement(
    'div',
    { className: bemBlocks.container(), 'data-qa': 'hits-stats' },
    _react2.default.createElement('div', { className: bemBlocks.container("info"), 'data-qa': 'info', dangerouslySetInnerHTML: sanitisedResultsFoundLabel })
  );
};

/**
 * Extend the hitstats component so we can set the default string in a smarter
 * way formatting for singular/plural results. We also grab the search query.
 */

var CRUKSearchkitSummary = function (_HitsStats) {
  _inherits(CRUKSearchkitSummary, _HitsStats);

  function CRUKSearchkitSummary(props) {
    _classCallCheck(this, CRUKSearchkitSummary);

    /**
     * Change the default string to be what we want.
     */
    var _this = _possibleConstructorReturn(this, (CRUKSearchkitSummary.__proto__ || Object.getPrototypeOf(CRUKSearchkitSummary)).call(this, props));

    _this.translations = {
      'hitstats.results_found': '{hitCount} search {resultsWord} for <strong>{searchTerms}</strong>'
    };
    return _this;
  }

  /**
   * Change the default BEM classes.
   */


  _createClass(CRUKSearchkitSummary, [{
    key: 'defineBEMBlocks',
    value: function defineBEMBlocks() {
      return {
        container: this.props.mod || 'cr-search-summary'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var timeTaken = this.searchkit.getTime();
      var hitsCount = (0, _numeral2.default)(this.searchkit.getHitsCount()).format('0,0');

      if (hitsCount < 1) {
        return null;
      }

      var props = {
        bemBlocks: this.bemBlocks,
        translate: this.translate,
        timeTaken: timeTaken,
        hitsCount: hitsCount,
        resultsFoundLabel: this.translate('hitstats.results_found', {
          timeTaken: timeTaken,
          hitCount: hitsCount,
          searchTerms: this.getQuery().index.queryString,
          resultsWord: hitsCount === 1 ? 'result' : 'results'
        })
      };
      // If search is blocked, on empty search preformed do not render component.
      if (this.props.blockSearch) return null;

      return _react2.default.createElement(CRUKSearchkitSummaryDisplay, props);
    }
  }]);

  return CRUKSearchkitSummary;
}(_searchkit.HitsStats);

exports.default = CRUKSearchkitSummary;