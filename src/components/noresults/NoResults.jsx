import React from 'react';

export default class CRUKSearchNoResultsDisplay extends React.Component {
  render() {
    const {bemBlocks, query, suggestion, noResultsLabel} = this.props
    return (
      <div data-qa="no-hits" className={bemBlocks.container()}>
        <div className={bemBlocks.container("info")}>
          <h2 className="no-results__heading">We didn't find any results for your search - <strong>{query}</strong></h2>
          <p>Suggestions:</p>
          <ul>
            <li>Check your spelling</li>
            <li>Try different or more general words</li>
          </ul>
        </div>
      </div>
    );
  }
}
