'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sanitizeHtmlReact = require('sanitize-html-react');

var _sanitizeHtmlReact2 = _interopRequireDefault(_sanitizeHtmlReact);

var _truncate = require('truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _bemCn = require('bem-cn');

var _bemCn2 = _interopRequireDefault(_bemCn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// Specify the main BEM class that will be used over this component.
var bemSearchResult = (0, _bemCn2.default)('cr-search-result');

/**
 * Export our result component.
 */

var CRUKSearchkitResult = function (_React$Component) {
  _inherits(CRUKSearchkitResult, _React$Component);

  function CRUKSearchkitResult(props) {
    _classCallCheck(this, CRUKSearchkitResult);

    /**
     * Do the work to sort out the data then pass to state.
     */
    var _this = _possibleConstructorReturn(this, (CRUKSearchkitResult.__proto__ || Object.getPrototypeOf(CRUKSearchkitResult)).call(this, props));

    var result = props.result._source;
    var sO = { allowedTags: [], allowedAttributes: [] };
    /**
     * If an empty search happens, then highlight won't be populated, account
     * for this.
     */
    var resultDescription = typeof props.result.highlight != 'undefined' ? props.result.highlight['description'][0] : result['description'];

    _this.state = {
      url: result['url'],
      title: (0, _truncate2.default)((0, _sanitizeHtmlReact2.default)(result['title'], sO), 80),
      /**
       * Description will have <strong> tags in it to highlight the search
       * term, allow it to be displayed!
       */
      description: {
        __html: (0, _truncate2.default)((0, _sanitizeHtmlReact2.default)(resultDescription, {
          allowedTags: ['strong'],
          allowedAttributes: []
        }), 160)
      },
      additionalFields: []
    };

    var additionalFields = props.additionalFields ? props.additionalFields.map(function (v, i, a) {
      return _react2.default.createElement(
        'div',
        { className: v.classNames, key: i },
        result[v.name]
      );
    }) : [];

    _this.state.additionalFields = additionalFields;
    return _this;
  }

  _createClass(CRUKSearchkitResult, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'article',
        { className: bemSearchResult },
        _react2.default.createElement(
          'div',
          { className: bemSearchResult("media-body") },
          _react2.default.createElement(
            'h4',
            { className: bemSearchResult("title") },
            _react2.default.createElement(
              'a',
              { className: bemSearchResult("link"), href: this.state.url },
              this.state.title
            )
          ),
          _react2.default.createElement('p', { className: bemSearchResult("excerpt"), dangerouslySetInnerHTML: this.state.description }),
          this.state.additionalFields
        )
      );
    }
  }]);

  return CRUKSearchkitResult;
}(_react2.default.Component);

exports.default = CRUKSearchkitResult;