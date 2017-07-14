'use strict';

import v2 from './v2';
import v1 from './v1';

export default (app) => {
  app.use('/v2', v2);
  app.use('/v1', v1);
}
