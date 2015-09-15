'use strict';

describe('ReactBmiApp', () => {
  let React = require('react/addons');
  let ReactBmiApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactBmiApp = require('components/ReactBmiApp.js');
    component = React.createElement(ReactBmiApp);
  });

  it('should create a new instance of ReactBmiApp', () => {
    expect(component).toBeDefined();
  });
});
