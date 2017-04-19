'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CRUKSearchkitMultiMatchPhraseQuery;

var _lodash = require('lodash');

var _searchkit = require('searchkit');

function CRUKSearchkitMultiMatchPhraseQuery(query, options) {
  if (!query) {
    return;
  }

  return (0, _searchkit.BoolShould)([{
    multi_match: (0, _lodash.assign)({ query: query }, options)
  }, {
    multi_match: (0, _lodash.assign)({ query: query }, options, { 'type': 'phrase' })
  }]);
}