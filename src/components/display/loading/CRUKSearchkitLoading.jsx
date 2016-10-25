import React from 'react';
import bem from 'bem-cn';
import {
  SearchkitComponent
} from "searchkit";

// Specify the main BEM class that will be used over this component.
const bemLoader = bem('cr-simple-loader')

/**
 * And the component.
 */
export default class CRUKSearchkitLoading extends SearchkitComponent {
  render() {
    if (!this.isLoading()) {
      return <div/>
    }

    return (<div className={bemLoader}>
    <div className={bemLoader("spinner")}>
      <div className={bemLoader("spinner-item ") + bemLoader("spinner-item--bounce1")}></div>
      <div className={bemLoader("spinner-item ") + bemLoader("spinner-item--bounce2")}></div>
      <div className={bemLoader("spinner-item ") + bemLoader("spinner-item--bounce3")}></div>
    </div>
  </div>)
  }
}
