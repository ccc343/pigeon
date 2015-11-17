import App from './components/App';
import Tags from './components/Tags';
import Organization from './components/Organization';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateOrg from './components/CreateOrg';

export const routes = {
  path: '/',
  component: App,
  children: [
    {
      path: 'tags',
      component: Tags
    },
    {
      path: 'organization',
      component: Organization
    },
    {
      path: 'login',
      component: Login
    },
    {
      path: 'signup',
      component: Signup
    },
    {
      path: 'organization/new',
      component: CreateOrg
    }
  ]
};
