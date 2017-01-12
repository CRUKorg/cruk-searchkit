import {
  SuggestionsAccessor
} from 'searchkit';

const get = require("lodash/get")

export class CRUKSearchkitDidYouMeanAccessor extends SuggestionsAccessor {

  buildOwnQuery(query) {
    let queryText = query.getQueryString()
    if(queryText.length > 2){
      return query.setSuggestions({
        suggestions : {
          text : queryText,
          phrase : {
            field : this.field,
            size : 1,
            real_word_error_likelihood : 0.95,
            max_errors : 2,
            gram_size : 1,
            direct_generator : [ {
              field : this.field,
              suggest_mode : "always",
              min_word_length : 1
            } ]
          }
        }
      })
    }
    return query
  }
}
