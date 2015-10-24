import App from './App';
import Tags from './Tags';
import Organization from './Organization';

const routes = {
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
    }
  ]
};

export default routes;
