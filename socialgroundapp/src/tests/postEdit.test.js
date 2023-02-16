/**
* @jest-environment jsdom
*/

import React from 'react';
// import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import PostEdit from '../components/PostEdit';

test('test to see if postEdit components are rendered', () => {
  const tree = shallow(renderer.create(
    <Router>
      <PostEdit />
    </Router>,
  ));
  expect(tree).toMatchSnapshot();
});
