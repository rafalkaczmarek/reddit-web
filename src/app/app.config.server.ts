import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { appConfig } from '@admin-panel-web/app.config';
import { serverRoutes } from '@admin-panel-web/app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
