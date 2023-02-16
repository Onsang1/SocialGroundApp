/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import testing library functions
// import userEvent from '@testing-library/user-event';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
// import { within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Upload from '../components/upload';

test('renders Upload link', () => {
  render(
    <Router>
      <Upload />
    </Router>,
  );
  const linkElement = screen.getByText(/Share/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Upload link', () => {
  render(
    <Router>
      <Upload />
    </Router>,
  );
  const linkElement = screen.getByText(/Caption/);
  expect(linkElement).toBeInTheDocument();
});

// snapshot testing

test('SocialGround upload page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Upload />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
