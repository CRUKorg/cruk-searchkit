import {HighlightAccessor} from 'searchkit';
import {
  zipObjectDeep
} from 'lodash';

/**
 * Override highlight accessor to not squash objects.
 */
export default class CRUKHighlightAccessor extends HighlightAccessor {
  computeHighlightedFields(fields) {
    let highlightDefs = {};

    fields.forEach(f => {

      if (typeof f === 'string') {
        highlightDefs[f] = {};
      }
      if (typeof f === 'object') {
        let field = f.field
        delete f.field
        highlightDefs[field] = f;
      }
    });

    return highlightDefs ? {fields: highlightDefs} : null;
  }
}
