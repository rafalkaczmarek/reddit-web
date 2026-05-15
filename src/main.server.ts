import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from '@admin-panel-web/app';
import { config } from '@admin-panel-web/app.config.server';

const bootstrap = (context: BootstrapContext): Promise<unknown> =>
  bootstrapApplication(App, config, context);

export default bootstrap;
