import {HitsAccessor} from 'searchkit';
import scrollToElement from 'scroll-to-element';

/**
 * Override the hits accessor so it'll smooth scroll instead of sharp jump.
 */
export default class CRUKHitsAccessor extends HitsAccessor {
  scrollIfNeeded() {
    if (this.searchkit.hasHitsChanged()) {
      if (this.options.scrollTo) {
        scrollToElement(this.getScrollSelector(), {
          offset: 0,
          ease: 'linear',
          duration: 250
        });
      }
    }
  }
}
