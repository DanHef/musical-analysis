// Initializes the `roles` service on path `/roles`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Roles } from './roles.class';
import createModel from '../../models/roles.model';
import hooks from './roles.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'roles': Roles & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/roles', new Roles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('roles');

  service.hooks(hooks);
}
