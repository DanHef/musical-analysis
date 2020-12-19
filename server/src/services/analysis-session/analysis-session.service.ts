// Initializes the `analysis-session` service on path `/analysis-sessions`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { AnalysisSession } from './analysis-session.class';
import createModel from '../../models/analysis-session.model';
import hooks from './analysis-session.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'analysis-sessions': AnalysisSession & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/analysis-sessions', new AnalysisSession(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('analysis-sessions');

  service.hooks(hooks);
}
