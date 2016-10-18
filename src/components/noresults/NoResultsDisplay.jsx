import React from 'react';

export default class CRUKNoResultsDisplay extends React.Component {
  render() {
    const {bemBlocks, query, suggestion} = this.props

    let noResultsBody = (
      <div>
        <p>Suggestions:</p>
        <ul>
          <li>Check your spelling</li>
          <li>Try different or more general words</li>
        </ul>
      </div>
    )

    let noResultsTitle = "We didn't find any results for your search"
    
    noResultsBody = (this.props.noResultsBody) ? this.props.noResultsBody : noResultsBody;
    noResultsTitle = (this.props.noResultsTitle) ? this.props.noResultsTitle : noResultsTitle;

    return (
      <div data-qa="no-hits" className={bemBlocks.container()}>
        <div className={bemBlocks.container("info")}>
          <h2 className="no-results__heading">{noResultsTitle} - <strong>{query}</strong></h2>
          {noResultsBody}
        </div>
      </div>
    );
  }
}
