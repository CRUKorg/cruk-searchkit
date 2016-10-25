import React from 'react';

export default class CRUKSearchkitNoResultsDisplay extends React.Component {

  render() {
    const {bemBlocks, query, suggestion} = this.props

    const queryLabel = (query)
      ? <span> - <strong>{query}</strong></span>
      : ''

    const noResultsBody = (() => {
      if (this.props.noResultsBody === '') return ''
      if (this.props.noResultsBody) return this.props.noResultsBody
      return (
        <div>
          <p>Suggestions:</p>
          <ul>
            <li>Check your spelling</li>
            <li>Try different or more general words</li>
          </ul>
        </div>
      )
    })()

    const noResultsTitle = (() => {
      if (this.props.noResultsTitle === '') return ''
      if (this.props.noResultsTitle) return <h2 className="no-results__heading">{this.props.noResultsTitle}{queryLabel}</h2>
      return <h2 className="no-results__heading">We didn't find any results for your search{queryLabel}</h2>
    })()

    return (
      <div data-qa="no-hits" className={bemBlocks.container()}>
        <div className={bemBlocks.container("info")}>
          {noResultsTitle}
          {noResultsBody}
        </div>
      </div>
    );
  }
}
