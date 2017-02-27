'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRUKSearchkitDateRangeAccessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchkit = require('searchkit');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CRUKSearchkitDateRangeAccessor = exports.CRUKSearchkitDateRangeAccessor = function (_FilterBasedAccessor) {
  _inherits(CRUKSearchkitDateRangeAccessor, _FilterBasedAccessor);

  function CRUKSearchkitDateRangeAccessor(key, options) {
    _classCallCheck(this, CRUKSearchkitDateRangeAccessor);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitDateRangeAccessor.__proto__ || Object.getPrototypeOf(CRUKSearchkitDateRangeAccessor)).call(this, key, options.id));

    _this.options = options;

    _this.state = new _searchkit.ObjectState({});
    return _this;
  }

  _createClass(CRUKSearchkitDateRangeAccessor, [{
    key: 'addOneDay',
    value: function addOneDay(date) {
      return (0, _moment2.default)(date).add(1, 'day').format('YYYY-MM-DD');
    }
  }, {
    key: 'buildSharedQuery',
    value: function buildSharedQuery(query) {
      var _this2 = this;

      if (this.state.hasValue()) {
        var val = this.state.getValue();
        this.options.updateParentState(val.min, val.max);
        var rangeFilter = (0, _searchkit.RangeQuery)(this.options.field, {
          gte: val.min,
          lt: this.addOneDay(val.max),
          format: 'yyyy-MM-dd'
        });

        var selectedFilter = {
          name: this.translate(this.options.title),
          value: val.min + ' - ' + val.max,
          id: this.options.id,
          remove: function remove() {
            _this2.state = _this2.state.clear();
          }
        };

        return query.addFilter(this.key, rangeFilter).addSelectedFilter(selectedFilter);
      }
      this.options.updateParentState(null, null);

      return query;
    }
  }, {
    key: 'getBuckets',
    value: function getBuckets() {
      return this.getAggregations([this.key, this.key, 'buckets'], []);
    }
  }, {
    key: 'buildOwnQuery',
    value: function buildOwnQuery(query) {
      var val = this.state.getValue();
      var min = val.min;
      var max = val.max;

      var otherFilters = query.getFiltersWithoutKeys(this.key);
      var filters = (0, _searchkit.BoolMust)([otherFilters, (0, _searchkit.RangeQuery)(this.options.field, {
        gte: min,
        lt: this.addOneDay(val.max),
        format: 'yyyy-MM-dd'
      })]);

      var metric = (0, _searchkit.CardinalityMetric)(this.key, this.options.field);

      return query.setAggs((0, _searchkit.FilterBucket)(this.key, filters, metric));
    }
  }]);

  return CRUKSearchkitDateRangeAccessor;
}(_searchkit.FilterBasedAccessor);