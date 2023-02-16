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
import Registration from '../components/registration';

test('renders Sign Up button', () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  const linkElement = screen.getByText('Sign Up');
  expect(linkElement).toBeInTheDocument();
});

test('renders Log In link', () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  const linkElement = screen.getByText('Log In');
  expect(linkElement).toBeInTheDocument();
});

test('registration page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Registration />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Textbox to have value after input', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );

  const nameLabel = getByText('Full Name');
  const emailLabel = getByText(/Email/);
  const passwordLabel = getByText(/Password/);
  const confirmPasswordLabel = getByText('Confirm Password');

  expect(nameLabel).toBeInDocument();
  expect(emailLabel).toBeInDocument();
  expect(passwordLabel).toBeInDocument();
  expect(confirmPasswordLabel).toBeInDocument();

  const nameInput = getByLabelText('Full Name');
  const emailInput = getByLabelText(/Email/);
  const passwordInput = getByLabelText(/Password/);
  const confirmPasswordInput = getByLabelText('Confirm Password');

  expect(nameInput).toHaveAttribute('type', 'text');
  expect(emailInput).toHaveAttribute('type', 'text');
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(confirmPasswordInput).toHaveAttribute('type', 'password');

  const element = screen.getByRole('textbox', { name: 'Email' });

  await userEvent.type(element, 'username123@gmail.com');
  expect(screen.getByLabelText(/Email/)).toHaveValue('user123@gmail.com');
});

test('Button should be disabled for blank fields, invalid email format, or password', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );

  const nameElement = screen.getByRole('textbox', { name: 'Full Name' });
  const emailElement = screen.getByRole('textbox', { name: 'Email' });
  const pwElement = screen.getByRole('textbox', { name: 'Password' });
  const confirmPwElement = screen.getByRole('textbox', { name: 'Confirm Password' });
  // Blank field(s)
  expect(getByText(/Sign Up/i).closest('button')).toBeDisabled();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password111');
  expect(getByText(/Sign Up/i).closest('button')).toBeDisabled();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password');
  expect(getByText(/Sign Up/i).closest('button')).toBeDisabled();

  // All fields filled out
  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password111');
  expect(getByText(/Sign Up/i).closest('button')).not.toBeDisabled();
});
