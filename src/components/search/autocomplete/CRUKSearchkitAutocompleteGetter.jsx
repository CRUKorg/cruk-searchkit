import * as axios from "axios"

/**
 * CRUKSearchkitAutocompleteGetter JavascriptClass.
 */
export default class CRUKSearchkitAutocompleteGetter {
  constructor(url, value) {
    this.url = url;
  }

  makeAxoisRequest(value) {
    const payload = {
      title_suggest : {
        text : value,
        completion : {
            field : 'suggest',
            size: 5
        }
      }
    };

    return axios.post(this.url, payload);
  }
}
