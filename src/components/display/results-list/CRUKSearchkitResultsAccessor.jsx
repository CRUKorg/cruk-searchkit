import { HitsAccessor } from 'searchkit';
import scroll from 'scroll';


/**
 * Override the hits accessor so it'll smooth scroll instead of sharp jump.
 */
export default class CRUKHitsAccessor extends HitsAccessor {
  scrollIfNeeded() {
    if (this.searchkit.hasHitsChanged()) {
      if (this.options.scrollTo) {
        scroll.top(document.querySelector('body'), 0)
        // IE and Firefox Hack
        document.documentElement.scrollTop = 0
      }
    }
  }
}
