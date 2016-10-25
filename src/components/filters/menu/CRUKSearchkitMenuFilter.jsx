import React from 'react';
import {
  concat
} from 'lodash';
import {
  array_flip
} from 'locutus';
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
    const optionsOrder = array_flip(this.props.optionsOrder);
    const all = {
      key: allItem.key,
      label: allItem.label,
      doc_count: this.accessor.getDocCount()
    }

    let items = concat([all], this.accessor.getBuckets());
console.log(this.props.optionsOrder, optionsOrder);
console.log(items.length > 1 && optionsOrder.length > 0);
    /**
     * Sort things.
     */
    if (items.length > 1 && optionsOrder.length > 0) {
      /**
       * We've inverted the array of options in order which means we can find
       * items by entering the text value, the original index number is how
       * we can compare items to sort by.
       */
      console.log(items);
      items.sort(function(x, y) {
        return optionsOrder[x.key] > optionsOrder[y.key];
      });
      console.log(items);
    }

    return items;
  }
}

CRUKSearchkitMenuFilter.defaultProps.optionsOrder = [];
CRUKSearchkitMenuFilter.propTypes.optionsOrder = React.PropTypes.arrayOf(React.PropTypes.string);

export default CRUKSearchkitMenuFilter;
