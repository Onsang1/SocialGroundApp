/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import SuccessfulRegistration from '../components/successfulRegistration';

test('renders successful page', () => {
  render(
    <Router>
      <SuccessfulRegistration />
    </Router>,
  );
  const linkElement = screen.getByText('Click here');
  expect(linkElement).toBeInTheDocument();
});

test('successfulRegistration page matches snapshot', () => {
  render(
    <Router>
      <SuccessfulRegistration />
    </Router>,
  );
  const component = renderer.create(<SuccessfulRegistration />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
