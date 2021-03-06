import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { HomeView } from 'views/HomeView/index.js';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />);
}

describe('(View) Home', function () {
  let _component, _rendered, _props;

  beforeEach(function () {
    _props = {};

    _component = shallowRenderWithProps(_props);
    _rendered = renderWithProps(_props);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });

  it('Should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');

    expect(h1).to.exist;
    expect(h1.textContent).to.match(/Welcome to the React Redux Starter Kit/);
  });
});
