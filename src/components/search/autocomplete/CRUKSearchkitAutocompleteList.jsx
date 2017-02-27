import React from 'react';
import ReactDOM from 'react-dom';
import bem from 'bem-cn';
import {
  SearchkitComponent
} from 'searchkit';

/**
 * CRUKSearchkitAutocomplete component.
 */
export default class CRUKSearchkitAutocompleteList extends SearchkitComponent {
  static propTypes = {
    inputState: React.PropTypes.func,
    autocompleteItems: React.PropTypes.arrayOf(React.PropTypes.string),
    listClasses: React.PropTypes.arrayOf(React.PropTypes.string),
    autocompleteActive: React.PropTypes.bool,
    toggle: React.PropTypes.func
  }

  static defaultProps = {
    listClasses: ['cr-autocomplete'],
    autocompleteItems: []
  }

  constructor(props) {
    super(props);
    
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  clickHandle(e) {
    if (!this.searchkit) {
      return;
    }
    const sbAccessorIndex = this.searchkit.accessors.accessors
      .map((v, i) => {
        return v.key === 'xss-q' ? i : null;
      })
      .filter(v => typeof v === 'number')
      .join();

    if (sbAccessorIndex) {
      this.searchkit.accessors.accessors[sbAccessorIndex].state.value = e.target.innerHTML;
      this.props.inputState(e.target.innerHTML);
      this.searchkit.performSearch();
    }

    this.props.toggle(false);
  }

  componentDidMount () {
    document.getElementById('searchPrototypeApp').addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount () {
    document.getElementById('searchPrototypeApp').removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(evt) {
    const area = ReactDOM.findDOMNode(this.refs.autocompleteList);

    if (area && !area.contains(evt.target)) {
      this.props.toggle(false);
    }
  }

  render() {
    if (!this.props.autocompleteItems || !this.props.autocompleteActive) return null;

    const bemList = bem(this.props.listClasses[0]);
    const listClasses = this.props.listClasses.join(' ');
    const list = this.props.autocompleteItems.map((v, i) => {
      const selected = (this.props.selectedItem === i + 1) ? ` ${bemList('list-item--selected')}` : '';
      const clasNames = `${bemList('list-item')}${selected}`;
      return (
        <li onClick={this.clickHandle.bind(this)} className={clasNames} key={i}>
          {v}
        </li>
      );
    });

    if (list.join() === '') return null;

    return (
      <ul className={listClasses} ref="autocompleteList">
        {list}
      </ul>
    );
  }
}
