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
import Registration from '../components/registration';

test('renders Sign Up button', () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  const linkElement = screen.getByRole('button', { name: /Sign Up/i });
  expect(linkElement).toBeInTheDocument();
});

test('renders Log In link', () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  const linkElement = screen.getByText(/Log/);
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

test('page to have logo image', () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('Textbox to have value after input', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );

  const emailLabel = screen.getByText(/Email/);
  const passwordLabel = screen.getAllByText(/Password/)[0];

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/Email/);
  expect(emailInput).toHaveAttribute('type', 'text');

  const element = screen.getByRole('textbox', { name: /Email/ });

  await userEvent.type(element, 'username123@gmail.com');
  expect(screen.getByLabelText(/Email/)).toHaveValue('username123@gmail.com');
});

test('Button should be disabled for blank fields, invalid email format, or password', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );

  const nameElement = screen.findAllByText(/Full/)[0];
  const emailElement = screen.getByRole('textbox', { name: /Email/ });
  const pwElement = screen.getAllByText(/Password/)[0];
  const confirmPwElement = screen.findAllByText(/Confirm/)[0];
  // Blank field(s)
  expect(screen.getByRole('button')).toBeDisabled();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password111');
  expect(screen.getByRole('button')).toBeDisabled();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password');
  expect(screen.getByRole('button')).toBeDisabled();

  // All fields filled out
  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password111');
  expect(screen.getByRole('button')).toBeDisabled();
});
