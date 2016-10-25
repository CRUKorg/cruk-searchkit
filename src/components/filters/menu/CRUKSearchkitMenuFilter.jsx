import React from 'react';
import {
  concat,
  forEach
} from 'lodash';
import {
  MenuFilter
} from "searchkit";

const allItem = {
  key:"$all", label: "All"
}

class CRUKSearchkitMenuFilter extends MenuFilter {
  /**
   * Override getItems() to allow the options to follow a specific order.
   */
  getItems() {
    /**
     * Reverse the options order array so we flip keys for values.
     */
    let order = [];
    forEach(this.props.optionsOrder, function(value, key) {
      order[value] = key;
    });

    const all = {
      key: allItem.key,
      label: allItem.label,
      doc_count: this.accessor.getDocCount()
    }

    let items = concat([all], this.accessor.getBuckets());

    /**
     * Sort things.
     */
    if (items.length > 1 && Object.keys(order).length > 1) {
      /**
       * We've inverted the array of options in order which means we can find
       * items by entering the text value, the original index number is how
       * we can compare items to sort by.
       */
      items.sort(function(x, y) {
        return parseInt(order[x.key]) > parseInt(order[y.key]);
      });
    }

    return items;
  }
}

CRUKSearchkitMenuFilter.defaultProps.optionsOrder = [];
CRUKSearchkitMenuFilter.propTypes.optionsOrder = React.PropTypes.arrayOf(React.PropTypes.string);

export default CRUKSearchkitMenuFilter;
