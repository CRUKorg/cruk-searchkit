"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRUKSearchkitDidYouMeanAccessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchkit = require("searchkit");

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var get = require("lodash/get");

var CRUKSearchkitDidYouMeanAccessor = exports.CRUKSearchkitDidYouMeanAccessor = function (_SuggestionsAccessor) {
  _inherits(CRUKSearchkitDidYouMeanAccessor, _SuggestionsAccessor);

  function CRUKSearchkitDidYouMeanAccessor() {
    _classCallCheck(this, CRUKSearchkitDidYouMeanAccessor);

    return _possibleConstructorReturn(this, (CRUKSearchkitDidYouMeanAccessor.__proto__ || Object.getPrototypeOf(CRUKSearchkitDidYouMeanAccessor)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitDidYouMeanAccessor, [{
    key: "buildOwnQuery",
    value: function buildOwnQuery(query) {
      var queryText = query.getQueryString();
      if (queryText.length > 2) {
        return query.setSuggestions({
          suggestions: {
            text: queryText,
            phrase: {
              field: this.field,
              size: 1,
              real_word_error_likelihood: 0.95,
              max_errors: 2,
              gram_size: 1,
              direct_generator: [{
                field: this.field,
                suggest_mode: "always",
                min_word_length: 1
              }]
            }
          }
        });
      }
      return query;
    }
  }]);

  return CRUKSearchkitDidYouMeanAccessor;
}(_searchkit.SuggestionsAccessor);