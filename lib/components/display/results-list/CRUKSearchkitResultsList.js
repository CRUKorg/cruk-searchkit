'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchkit = require('searchkit');

var _CRUKSearchkitResultsHighlightAccessor = require('./CRUKSearchkitResultsHighlightAccessor');

var _CRUKSearchkitResultsHighlightAccessor2 = _interopRequireDefault(_CRUKSearchkitResultsHighlightAccessor);

var _CRUKSearchkitResultsAccessor = require('./CRUKSearchkitResultsAccessor');

var _CRUKSearchkitResultsAccessor2 = _interopRequireDefault(_CRUKSearchkitResultsAccessor);

var _CRUKSearchkitResultsListDisplay = require('./CRUKSearchkitResultsListDisplay');

var _CRUKSearchkitResultsListDisplay2 = _interopRequireDefault(_CRUKSearchkitResultsListDisplay);

var _CRUKSearchkitResult = require('./../result/CRUKSearchkitResult');

var _CRUKSearchkitResult2 = _interopRequireDefault(_CRUKSearchkitResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Import our custom highlight accessor which won't mulch the array of objects.
 */

/**
 * And the rest.
 */


/**
 * Define our class.
 */
var CRUKSearchkitResultsList = function (_Hits) {
  _inherits(CRUKSearchkitResultsList, _Hits);

  function CRUKSearchkitResultsList(props) {
    _classCallCheck(this, CRUKSearchkitResultsList);

    return _possibleConstructorReturn(this, (CRUKSearchkitResultsList.__proto__ || Object.getPrototypeOf(CRUKSearchkitResultsList)).call(this));
  }

  _createClass(CRUKSearchkitResultsList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      /**
       * Don't use super() here to avoid adding in both hits accessor and our
       * custom one.
       */
      this.searchkit = this._getSearchkit();

      if (this.searchkit) {
        this.accessor = this.defineAccessor();
        if (this.accessor) {
          this.accessor = this.searchkit.addAccessor(this.accessor);
        }
        this.stateListenerUnsubscribe = this.searchkit.emitter.addListener(function () {
          !_this2.unmounted && _this2.forceUpdate();
        });
      } else {
        console.warn('No searchkit found in props or context for ' + this.constructor['name']);
      }

      /**
       * Add in the custom highlighter accessor which lets us specify exact
       * settings per highlight field.
       */
      if (this.props.CRUKHighlightFields) {
        this.searchkit.addAccessor(new _CRUKSearchkitResultsHighlightAccessor2.default(this.props.CRUKHighlightFields));
      }

      this.hitsAccessor = new _CRUKSearchkitResultsAccessor2.default({ scrollTo: this.props.scrollTo });
      this.searchkit.addAccessor(this.hitsAccessor);
    }
  }, {
    key: 'render',
    value: function render() {
      var hits = this.getHits();
      var hasHits = hits.length > 0;

      if (this.props.blockSearch) return null;

      if (!this.isInitialLoading() && hasHits) {
        var _props = this.props,
            listComponent = _props.listComponent,
            mod = _props.mod,
            className = _props.className,
            itemComponent = _props.itemComponent,
            additionalFields = _props.additionalFields;


        return (0, _searchkit.renderComponent)(listComponent, {
          hits: hits, mod: mod, className: className, itemComponent: itemComponent, additionalFields: additionalFields
        });
      }

      return null;
    }
  }]);

  return CRUKSearchkitResultsList;
}(_searchkit.Hits);

CRUKSearchkitResultsList.propTypes = {
  CRUKHighlightFields: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]))
};
CRUKSearchkitResultsList.defaultProps = {
  mod: 'search-results',
  hitsPerPage: 10,
  itemComponent: _CRUKSearchkitResult2.default,
  listComponent: _CRUKSearchkitResultsListDisplay2.default,
  scrollTo: true
};
exports.default = CRUKSearchkitResultsList;