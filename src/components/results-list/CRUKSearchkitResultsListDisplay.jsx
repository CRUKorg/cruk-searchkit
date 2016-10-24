import React from 'react';
import {
  HitsList,
  block,
  renderComponent
} from 'searchkit';
import {map} from 'lodash';

/**
 * Define our class.
 */
export default class CRUKSearchkitResultsListDisplay extends HitsList {
  render() {
    const {hits, mod, className, itemComponent, additionalFields} = this.props
    const bemBlocks = {
      container: block(mod),
      item: block(`${mod}-hit`)
    }
    return (
      <section data-qa="hits" className={bemBlocks.container().mix(className)}>
        {map(hits, (result, index)=> {
          return renderComponent(itemComponent, {
            key:result._id, result, bemBlocks, index, additionalFields
          })
        })}
      </section>
    )
  }
}
