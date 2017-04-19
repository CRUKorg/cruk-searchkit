import {assign} from 'lodash';
import {
  BoolShould
} from 'searchkit';

export default function CRUKSearchkitMultiMatchPhraseQuery(query, options){
  if (!query) {
    return
  }

  return BoolShould([
    {
      multi_match:assign({query}, options)
    },
    {
      multi_match:assign({query}, options, {'type': 'phrase'})
    }
  ]);
}
