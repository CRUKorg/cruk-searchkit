import * as axios from "axios"

/**
 * CRUKCustomElasticGetter JavascriptClass.
 */
export default class CRUKCustomElasticGetter {
  constructor(url) {
    this.url = url;
  }

  autocompleteRequest(value, config = {}) {
    const payload = {
      title_suggest : {
        text : value,
        completion : {
            field : 'suggest',
            size: 5
        }
      }
    };

    return axios.post(this.url, payload, config);
  }

  didyoumeanRequest(value, fieldname, config = {}) {
    const payload = {
      suggest : {
        text : value,
        phrase : {
          field : fieldname,
          size : 1,
          real_word_error_likelihood : 0.95,
          max_errors : 2,
          gram_size : 1,
          direct_generator : [ {
            field : fieldname,
            suggest_mode : "always",
            min_word_length : 1
          } ]
        }
      }
    };

    return axios.post(this.url, payload, config);
  }
}
