"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRUKSearchkitLocationAccessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchkit = require("searchkit");

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var isUndefined = require("lodash/isUndefined");

var CRUKSearchkitLocationAccessor = exports.CRUKSearchkitLocationAccessor = function (_FilterBasedAccessor) {
  _inherits(CRUKSearchkitLocationAccessor, _FilterBasedAccessor);

  function CRUKSearchkitLocationAccessor(key, options) {
    _classCallCheck(this, CRUKSearchkitLocationAccessor);

    var _this = _possibleConstructorReturn(this, (CRUKSearchkitLocationAccessor.__proto__ || Object.getPrototypeOf(CRUKSearchkitLocationAccessor)).call(this, key, options.id));

    _this.options = options;

    _this.state = new _searchkit.ObjectState({});
    return _this;
  }

  _createClass(CRUKSearchkitLocationAccessor, [{
    key: "buildSharedQuery",
    value: function buildSharedQuery(query) {
      var val = this.state.getValue();
      this.options.updateParentState(this.getQueryObject());
      if (Object.keys(val).length > 0) {
        var filter = {
          geo_distance: {
            distance: this.options.resultRadius || "5km",
            location: {}
          }
        };
        filter.geo_distance[this.options.field].lat = val.lat;
        filter.geo_distance[this.options.field].lon = val.lng;
        var geoFilter = (0, _searchkit.FilteredQuery)({
          filter: filter
        });

        query = query.addFilter(this.key, geoFilter);
      }

      return query;
    }
  }, {
    key: "getDocCount",
    value: function getDocCount() {
      return this.getAggregations([this.key, "doc_count"], 0);
    }
  }, {
    key: "buildOwnQuery",
    value: function buildOwnQuery(query) {
      var filters = query.getFilters();
      if (!this.state.getValue()) {
        if (filters) filters = (0, _searchkit.BoolMust)([filters, this.filter]);else filters = this.filter;
      }
      return query.setAggs((0, _searchkit.FilterBucket)(this.key, filters));
    }
  }]);

  return CRUKSearchkitLocationAccessor;
}(_searchkit.FilterBasedAccessor);