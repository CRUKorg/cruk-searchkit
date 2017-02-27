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
  
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus(e) {
    this.setState({ focused: true });
  }

  handleBlur(e) {
    this.setState({ focused: false });
  }

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
      <div className={this.state.focused ? divClasses + ' form-group--focused' : divClasses}>
        <select onChange={this.onChange} value={this.getSelectedValue()} className="form-control" onFocus={this.handleFocus} onBlur={this.handleBlur}>
          {options}
        </select>
      </div>
    )
  }
}

CRUKSearchkitSelect.defaultProps.mod = 'cr-select';

export default CRUKSearchkitSelect;
