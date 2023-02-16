/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from '@jest/globals';
// import renderer from 'react-test-renderer';
// import userEvent from '@testing-library/user-event';
import Setting from '../components/Setting';

test('renders submit button', () => {
  render(
    <Router>
      <Setting />
    </Router>,
  );
  const linkElement = screen.getByRole('button', { name: /Submit/i });
  expect(linkElement).toBeInTheDocument();
});
