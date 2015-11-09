import App from '../pages/App';
import Tags from '../pages/Tags';
import Organization from '../pages/Organization';

const routes = {
  path: '/',
  component: App,
  redirect: '/tags',
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
