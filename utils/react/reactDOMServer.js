/***
 * Copyright (c) 2015, 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 * Build stub for ReactDOMServer to keep it out of the client bundle.
 * Legacy, React 0.14.x
 */
import noop from 'lodash/noop';

/**
 * ReactDOMServer dummy.
 */
export default {
  renderToString: noop,
  renderToStaticMarkup: noop
};