import * as axios from "axios"

/**
 * CRUKCustomElasticGetter JavascriptClass.
 */
export default class CRUKCustomElasticGetter {
  constructor(url, value) {
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
}
