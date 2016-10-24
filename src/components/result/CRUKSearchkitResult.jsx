import React from 'react';
import sanitizeHtml from 'sanitize-html-react';
import truncate from 'truncate';
import moment from 'moment';
import bem from 'bem-cn';

// Specify the main BEM class that will be used over this component.
const bemSearchResult = bem('cr-search-result')

/**
 * Export our result component.
 */
export default class CRUKSearchkitResult extends React.Component {

  constructor(props) {
    super(props);

    /**
     * Do the work to sort out the data then pass to state.
     */
    let result = props.result._source
    let sO = {allowedTags: [], allowedAttributes: []}
    /**
     * If an empty search happens, then highlight won't be populated, account
     * for this.
     */
    let resultDescription = typeof props.result.highlight != 'undefined' ? props.result.highlight['description'][0] : result['description']

    this.state = {
      url: result['url'],
      title: truncate(sanitizeHtml(result['title'], sO), 80),
      /**
       * Description will have <strong> tags in it to highlight the search
       * term, allow it to be displayed!
       */
      description: {
        __html: truncate(sanitizeHtml(resultDescription, {
          allowedTags: ['strong'],
          allowedAttributes: []
        }), 160)
      },
      additionalFields: []
    }

    const additionalFields = (props.additionalFields) ? props.additionalFields.map(function(v,i,a){
        return <div className={v.classNames} key={i}>
          {result[v.name]}
        </div>
      }) : []

    this.state.additionalFields = additionalFields
  }

  render() {
    return (
      <article className={bemSearchResult}>
        <div className={bemSearchResult("media-body")}>
          <h4 className={bemSearchResult("title")}>
            <a className={bemSearchResult("link")} href={this.state.url}>{this.state.title}</a>
          </h4>
          <p className={bemSearchResult("excerpt")} dangerouslySetInnerHTML={this.state.description}></p>
          {this.state.additionalFields}
        </div>
      </article>
    )
  }
}

