'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchkit = require('searchkit');

var _lodash = require('lodash');

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Override highlight accessor to not squash objects.
 */
var CRUKSearchkitResultsHighlightAccessor = function (_HighlightAccessor) {
  _inherits(CRUKSearchkitResultsHighlightAccessor, _HighlightAccessor);

  function CRUKSearchkitResultsHighlightAccessor() {
    _classCallCheck(this, CRUKSearchkitResultsHighlightAccessor);

    return _possibleConstructorReturn(this, (CRUKSearchkitResultsHighlightAccessor.__proto__ || Object.getPrototypeOf(CRUKSearchkitResultsHighlightAccessor)).apply(this, arguments));
  }

  _createClass(CRUKSearchkitResultsHighlightAccessor, [{
    key: 'computeHighlightedFields',
    value: function computeHighlightedFields(fields) {
      var highlightDefs = {};

      fields.forEach(function (f) {

        if (typeof f === 'string') {
          highlightDefs[f] = {};
        }
        if ((typeof f === 'undefined' ? 'undefined' : _typeof(f)) === 'object') {
          var field = f.field;
          delete f.field;
          highlightDefs[field] = f;
        }
      });

      return highlightDefs ? { fields: highlightDefs } : null;
    }
  }]);

  return CRUKSearchkitResultsHighlightAccessor;
}(_searchkit.HighlightAccessor);

exports.default = CRUKSearchkitResultsHighlightAccessor;