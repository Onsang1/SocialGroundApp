/**
* @jest-environment jsdom
*/

import React from 'react';
import {
  getByText, getByLabelText, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import Login from '../components/login';

test('renders Log In button', () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  const linkElement = screen.getByText('Log In');
  expect(linkElement).toBeInTheDocument();
});

test('renders Sign Up link', () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  const linkElement = screen.getByText('Sign Up');
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

test('Textbox to have value after input', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

  const emailLabel = getByText('Enter Your Email');
  const passwordLabel = getByText('Enter Your Password');

  expect(emailLabel).toBeInDocument();
  expect(passwordLabel).toBeInDocument();

  const emailInput = getByLabelText('Enter Your Email');
  const passwordInput = getByLabelText('Enter Your Password');

  expect(emailInput).toHaveAttribute('type', 'text');
  expect(passwordInput).toHaveAttribute('type', 'password');

  const element = screen.getByRole('textbox', { name: 'Enter Your Email' });

  await userEvent.type(element, 'username123@gmail.com');
  expect(screen.getByLabelText('Enter Your Email')).toHaveValue('user123@gmail.com');
});

test('Button should be disabled for invalid credentials', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

  const emailElement = screen.getByRole('textbox', { name: 'Enter Your Email' });
  const pwElement = screen.getByRole('textbox', { name: 'Enter Your Password' });

  await userEvent.type(emailElement, 'username123@gmail.com');
  await userEvent.type(pwElement, 'invalidPassword');
  expect(getByText(/Log In/i).closest('button')).toBeDisabled();
});

test('Error message should show for invalid credentials', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

  await userEvent.type(screen.getByRole('textbox', { name: 'Enter Your Email' }), 'user123@gmail.com');
  await userEvent.type(screen.getByRole('textbox', { name: 'Enter Your Password' }), 'invalidPassword');

  const errorMessage = getByText('Invalid Credentials.');

  expect(errorMessage).toBeInDocument();
});

test('Should call onSubmit when Log In button is clicked', async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  await userEvent.type(screen.getByRole('textbox', { name: 'Enter Your Email' }), 'user123@gmail.com');
  await userEvent.type(screen.getByRole('textbox', { name: 'Enter Your Password' }), 'password123');
  userEvent.click(screen.getByRole('button', { name: 'Log In' }));
  expect(onsubmit).toHaveBeenCalledWith('user123@gmail.com');
});
