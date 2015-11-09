import React from 'react';

function getComponentsAlongPath(node, rootPath, path) {
  if (!node.path) {
    throw 'Node with no path found.';
  }

  let currentPath;
  if (node.path[0] === '/') {
    currentPath = node.path;
  } else if (rootPath === '/') {
    currentPath = rootPath + node.path;
  } else {
    currentPath = rootPath + '/' + node.path;
  }

  // If path matched, return its component.
  if (path === currentPath) return [node.component];

  // Otherwise, search through the node's children.
  if (node.children) {
    let result, i = 0;
    while (!result && i < node.children.length) {
      result = getComponentsAlongPath(node.children[i], currentPath, path);
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

// Renders the component tree for <path>. This function returns
// a valid React component.
export function renderPath(routes, path) {
  console.log('rendering tree for ' + path);

  const components = getComponentsAlongPath(routes, '', path);
  if (!components) {
    throw `The path ${path} could not be matched.`;
  }

  // Render the tree of children for this route.
  function renderChildren (index) {
    const component = components[index];
    if (index === 0) return React.createElement(component);
    return React.createElement(component, null, renderChildren(index - 1));
  }

  return renderChildren(components.length - 1);
}
