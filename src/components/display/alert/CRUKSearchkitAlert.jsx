import React from 'react';
import {
  SearchkitComponent
} from 'searchkit';

/**
 * Export our result component.
 */
export default class CRUKSearchkitAlert extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    dismissable: React.PropTypes.boolean,
    show: React.PropTypes.object,
    animation: React.PropTypes.string
  }

  render() {
    // If there are no arguments in the URL stop initial search.
    const searchOnLoad = window.location.href.split(/[&?]/).filter((v, i) => i > 0).length > 0;
    if (searchOnLoad) return null;
    return (
      <div className="col-xs-12 col-sm-8 col-sm-push-2 help-text">
        { this.props.helptext || <h2>Please enter a keyword in the text box to start searching.</h2>}
      </div>
    );
  }
}
