import React from 'react';
import {
  map
} from 'lodash';
import {
  Select,
  block
} from "searchkit";
import classNames from 'classnames';

class CRUKSearchkitSelect extends Select {
  render() {
    const { mod, className, items, disabled, showCount, translate, countFormatter } = this.props;

    const bemBlocks = {
      container: block(mod)
    }

    let divClasses = classNames(bemBlocks.container().mix(className).state({ disabled }), 'form-group');
    const options = map(items, ({key, label, title, disabled, doc_count}, idx) => {
      var text = translate(label || title || key)
      if (showCount && doc_count !== undefined) text += ` (${countFormatter(doc_count)})`;
      return <option key={key} value={key} disabled={disabled}>{text}</option>;
    });

    return (
      <div className={divClasses}>
        <select onChange={this.onChange} value={this.getSelectedValue()} className="form-control">
          {options}
        </select>
      </div>
    )
  }
}

CRUKSearchkitSelect.defaultProps.mod = 'cr-select';

export default CRUKSearchkitSelect;
