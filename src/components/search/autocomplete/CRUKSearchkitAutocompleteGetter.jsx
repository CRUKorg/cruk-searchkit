import * as axios from "axios"

/**
 * CRUKSearchkitAutocompleteGetter JavascriptClass.
 */
export default class CRUKSearchkitAutocompleteGetter {
  constructor(url, value) {
    this.url = url;
  }

  makeAxoisRequest(value, config = {}) {
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
}
