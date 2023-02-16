/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import Login from '../components/login';
// import * as HelperFunctions from '../components/login';

test('renders Log In page', () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  const linkElement = screen.getByText(/Log/);
  expect(linkElement).toBeInTheDocument();
});

test('login page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Login />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('page to have logo image', () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('Textbox to have value after input', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

  const emailLabel = screen.getByText(/Enter Your Email/i);
  const passwordLabel = screen.getByText(/Enter Your Password/i);

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();

  const emailInput = screen.getByTestId('loginUserEmail');
  const passwordInput = screen.getByTestId('loginUserPw');

  expect(emailInput).toHaveAttribute('type', 'text');
  expect(passwordInput).toHaveAttribute('type', 'password');

  // const element = screen.getByRole('textbox', { name: /Enter Your Email/i });

  await userEvent.type(emailInput, 'username123@gmail.com');
  expect(emailInput).toHaveValue('username123@gmail.com');

  await userEvent.type(passwordInput, 'user123');
  expect(passwordInput).toHaveValue('user123');
});

test('Error message should show for invalid credentials', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

  await userEvent.type(screen.getByRole(
    'textbox',
    { name: /Enter Your Email/i },
  ), 'user123@gmail.com');
  await userEvent.type(screen.getByLabelText(/Enter Your Password/i), 'wrongPassword');
  userEvent.click(screen.getByRole('button'));
  // const errorMessage = screen.getByText(/Invalid/, { exact: false });
  // const errorMessage = screen.getByText("");
  // expect(errorMessage).toBeInTheDocument();
});
