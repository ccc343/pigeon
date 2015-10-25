import React from 'react';

// Correctly concatenates strings and/or regex to a single
// regex. For example, concatPaths('/', /.*/) = /\/.*/
function concatPaths(first, second) {
  const rFirst = new RegExp(first);
  const rSecond = new RegExp(second);
  return new RegExp(rFirst.source + rSecond.source);
}

function match(path, regex) {
  return path.match(new RegExp(regex.source + '$'));
}

// Returns an array of components along <path>. Each
// array component represents what should be rendered into
// its parent's {this.props.children} at that level of the
// component tree.
//
// NOTE: the *last* index of the returned array represents
// the root of the tree.
function getComponentsAlongPath(node, rootPath, path) {
  // Form an absolute path for the current node.
  const currentPath = concatPaths(rootPath, node.path);

  // If path matched, return its component.
  if (match(path, currentPath)) return [node.component];

  // Otherwise, search through the node's children.
  if (node.children) {
    let result, i = 0;
    while (!result && i < node.children.length) {
      result = getComponentsAlongPath(node.children[i],
        currentPath, path);
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
  const components = getComponentsAlongPath(routes, '', path);

  // Render the tree of children for this route.
  function renderChildren (index) {
    const component = components[index];
    if (index === 0) return React.createElement(component);
    return React.createElement(component, null, renderChildren(index - 1));
  }

  return renderChildren(components.length - 1);
}
