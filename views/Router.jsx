import React from 'react';
import NoRoute from './NoRoute';

import routes from './routes';

class Router extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path: this.props.path};
    this.go = this.go.bind(this);
  }

  go(path) {
    this.setState({path: path});
    history.pushState(null, null, path);
  }

  getComponentsAlongPath(node, rootPath, path) {
    // Form an absolute path for the current node.
    const currentPath = rootPath + node.path;

    // If path matched, return its component.
    if (currentPath === path) return [node.component];

    // Otherwise, search through the node's children.
    if (node.children) {
      let result, i = 0;
      while (!result && i < node.children.length) {
        result = this.getComponentsAlongPath(node.children[i], currentPath, path);
        i++;
      }

      // Unwind the stack once a path has been matched.
      if (result) {
        result.push(node.component);
        return result;
      }
    }

    return null;
  }

  renderPath(path) {
    const components = this.getComponentsAlongPath(routes, '', path);

    // Render a 404 page if the route couldn't be matched.
    if (!components) return <NoRoute />;

    // Render the tree of children for this route.
    let renderChildren = (index) => {
      const component = components[index];

      // We want to pass the current path & routing callback to all children.
      const props = {
        go: this.go,
        path: this.state.path
      };

      if (index === 0) return React.createElement(component, props);
      return React.createElement(component, props, renderChildren(index - 1));
    }

    return renderChildren(components.length - 1);
  }

  render() {
    return this.renderPath(this.state.path);
  }
}

export default Router;
