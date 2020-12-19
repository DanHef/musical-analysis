import { Application } from '../declarations';
import users from './users/users.service';
import roles from './roles/roles.service';
import analysisSession from './analysis-session/analysis-session.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(roles);
  app.configure(analysisSession);
}