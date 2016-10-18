import * as React from "react";
import {
  FastClick
} from "searchkit"


export default class CRUKNoResultsErrorDisplay extends React.Component {
  static propTypes = {
    errorLabel: React.PropTypes.string,
    tryAgainLabel: React.PropTypes.string,
    resetSearchFn: React.PropTypes.func,
    translate: React.PropTypes.func,
    bemBlocks: {container:React.PropTypes.func},
    error: React.PropTypes.any
  }

  render() {
    const {errorLabel, bemBlocks, resetSearchFn, tryAgainLabel} = this.props

    return (
      <div data-qa="no-hits" className={bemBlocks.container()}>
        <div className={bemBlocks.container("info")}>
          {errorLabel}
        </div>
        <div className={bemBlocks.container("steps")}>
          <FastClick handler={resetSearchFn}>
            <div className={bemBlocks.container("step-action")}>
              {tryAgainLabel}
            </div>
          </FastClick>
        </div>
      </div>
    )

  }
}
