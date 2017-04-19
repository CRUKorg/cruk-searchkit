import React from 'react';
import {
  mount
} from 'enzyme';
import CRUKSearchkitMultiMatchPhraseQuery from '../CRUKSearchkitMultiMatchPhraseQuery.jsx';

describe('CRUK Searchkit Multi Match Phrase Query builder tests', () => {
  it('Function accepts arguements and provides expected output', function() {
    var query = 'breast cancer';
    var options = {
      analyzer: 'abc'
    };

    var output = CRUKSearchkitMultiMatchPhraseQuery(query, options);
    var expectedOutput = {
      bool: {
        should: [
          {
            multi_match: {
              query: 'breast cancer',
              analyzer: 'abc'
            }
          },
          {
            multi_match: {
              query: 'breast cancer',
              analyzer: 'abc',
              type: 'phrase'
            }
          }
        ]
      }
    };

    expect(output).toEqual(expectedOutput);
  });
});
