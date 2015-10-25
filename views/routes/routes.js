import App from '../components/App';
import Tags from '../components/Tags';
import Organization from '../components/Organization';
import NoRoute from '../components/NoRoute';

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
    },
    {
      path: /.*/,
      component: NoRoute
    }
  ]
};

export default routes;
