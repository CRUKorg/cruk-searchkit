'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchkit = require('searchkit');

var _scroll = require('scroll');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Override the hits accessor so it'll smooth scroll instead of sharp jump.
 */
var CRUKHitsAccessor = function (_HitsAccessor) {
  _inherits(CRUKHitsAccessor, _HitsAccessor);

  function CRUKHitsAccessor() {
    _classCallCheck(this, CRUKHitsAccessor);

    return _possibleConstructorReturn(this, (CRUKHitsAccessor.__proto__ || Object.getPrototypeOf(CRUKHitsAccessor)).apply(this, arguments));
  }

  _createClass(CRUKHitsAccessor, [{
    key: 'scrollIfNeeded',
    value: function scrollIfNeeded() {
      if (this.searchkit.hasHitsChanged()) {
        if (this.options.scrollTo) {
          _scroll2.default.top(document.querySelector('body'), 0);
          // IE and Firefox Hack
          document.documentElement.scrollTop = 0;
        }
      }
    }
  }]);

  return CRUKHitsAccessor;
}(_searchkit.HitsAccessor);

exports.default = CRUKHitsAccessor;