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
import Profile from '../components/profile';

test('renders Profile link', () => {
  render(
    <Router>
      <Profile />
    </Router>,
  );
  const linkElement = screen.getByText(/Posts/);
  expect(linkElement).toBeInTheDocument();
});

// snapshot testing

//TODO: update snapshot
test('SocialGround profile page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Profile />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
