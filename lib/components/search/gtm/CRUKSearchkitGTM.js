'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchkit = require('searchkit');

var _reactGoogleTagManager = require('react-google-tag-manager');

var _reactGoogleTagManager2 = _interopRequireDefault(_reactGoogleTagManager);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Create our Google Tag Manager component. Follows the basic example found
 * here:
 * https://github.com/holidaycheck/react-google-tag-manager
 *
 * Adding a listener to the new results events is from:
 * http://docs.searchkit.co/stable/docs/core/SearchkitManager.html
 */
var CRUKSearchkitGTM = function (_SearchkitComponent) {
  _inherits(CRUKSearchkitGTM, _SearchkitComponent);

  function CRUKSearchkitGTM(props) {
    _classCallCheck(this, CRUKSearchkitGTM);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitGTM.__proto__ || Object.getPrototypeOf(CRUKSearchkitGTM)).call(this, props));

    _this.previousState = {};
    return _this;
  }

  /**
   * Tack on our script if needed.
   */


  _createClass(CRUKSearchkitGTM, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dataLayerName = this.props.dataLayerName || 'dataLayer';
      var scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

      if (!window[dataLayerName]) {
        var gtmScriptNode = document.getElementById(scriptId);

        eval(gtmScriptNode.textContent);
      }

      /**
       * Setup our listener for new events.
       */
      var resultsListener = this.searchkit.addResultsListener(function (results) {
        _this2.trackResultsChange(results);
      });
    }

    /**
     * Return the values of whether or not the search has been filtered, sorted,
     * searched geographically and also provide the chance to send on extra data.
     *
     * Also means you can override the "query" if your search isn't a fulltext
     * one.
     *
     * Should return an object with values, or an empty object.
     */

  }, {
    key: 'derivePayloadValues',
    value: function derivePayloadValues(results) {
      var searchState = this.searchkit.state;

      return {};
    }

    /**
     * Track the result change sending data to GA/GTM.
     */

  }, {
    key: 'trackResultsChange',
    value: function trackResultsChange(results) {
      /**
       * Construct the payload.
       */
      var gtmSearchTitle = this.props.searchName || 'Unnamed React search';
      var keywordField = this.props.keywordField || 'q';
      var query = this.searchkit.state[keywordField];
      var page = typeof this.searchkit.state.p == 'undefined' ? 1 : this.searchkit.state.p;
      var totalResults = this.getHitsCount();

      /**
       * Figure out paging and filtering events.
       */
      var previousPage = typeof this.previousState.p == 'undefined' ? 1 : this.previousState.p;
      var pagingEvent = page != previousPage && query == this.previousState.q;

      var pushObject = {
        'event': 'site search event',
        'content-name': '/search?query=' + query + '&cat=' + gtmSearchTitle + '&page=' + page,
        'keyword': query,
        'target': gtmSearchTitle,
        'value': totalResults,
        'searchFiltered': 'false',
        'searchSorted': 'false',
        'searchPaged': pagingEvent ? 'true' : 'false',
        'searchNoResults': totalResults < 1 ? 'true' : 'false',
        'searchGeo': 'false',
        'pageNumber': page
      };

      /**
       * Allow the object to be changed.
       */
      var derivedValues = this.derivePayloadValues(results);
      var payload = (0, _lodash.defaults)(derivedValues, pushObject);

      /**
       * Set the content-name to be constructed from other values.
       */
      payload['content-name'] = '/search?query=' + payload.keyword + '&cat=' + payload.target + '&page=' + payload.pageNumber;

      /**
       * Push the event to dataLayer.
       */
      dataLayer.push(payload);

      /**
       * Save state for later, this needs redux :C
       */
      this.previousState = this.searchkit.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var gtm = (0, _reactGoogleTagManager2.default)({
        id: this.props.gtmId,
        dataLayerName: this.props.dataLayerName || 'dataLayer',
        additionalEvents: this.props.additionalEvents || {}
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          gtm.noScriptAsReact()
        ),
        _react2.default.createElement(
          'div',
          { id: this.props.scriptId || 'react-google-tag-manager-gtm' },
          gtm.scriptAsReact()
        )
      );
    }
  }]);

  return CRUKSearchkitGTM;
}(_searchkit.SearchkitComponent);

CRUKSearchkitGTM.propTypes = {
  gtmId: _react2.default.PropTypes.string.isRequired,
  dataLayerName: _react2.default.PropTypes.string,
  additionalEvents: _react2.default.PropTypes.object,
  scriptId: _react2.default.PropTypes.string,
  searchName: _react2.default.PropTypes.string,
  keywordField: _react2.default.PropTypes.string
};

exports.default = CRUKSearchkitGTM;