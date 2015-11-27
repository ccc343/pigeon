import App from './components/App';
import Tags from './components/Tags';
import Organization from './components/Organization';
import Login from './components/Login';

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
    }
  ]
};
