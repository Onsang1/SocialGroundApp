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
// import { renderHook } from '@testing-library/react-hooks';
// import mount from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Registration from '../components/registration';

test('test to see if registration components are rendered', () => {
  const tree = renderer.create(
    <Router>
      <Registration />
    </Router>,
  );
  expect(tree).toMatchSnapshot();
});

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

test('Error message should show for blank fields, invalid email format, or password', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );

  const nameElement = screen.findAllByText(/Full/)[0];
  const emailElement = screen.getByRole('textbox', { name: /Email/ });
  const pwElement = screen.getAllByText(/Password/)[0];
  const confirmPwElement = screen.findAllByText(/Confirm/)[0];
  expect(screen.getByRole('button')).toBeInTheDocument();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'user111@gmail.com');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/missing/)).toBeInTheDocument();
  expect(screen.getByTestId('blankregMsg')).toBeInTheDocument();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password111');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/format/)).toBeInTheDocument();
  expect(screen.getByTestId('emailErrorRegMsg')).toBeInTheDocument();

  await userEvent.type(nameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  await userEvent.type(confirmPwElement, 'password');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/match/)).toBeInTheDocument();
  expect(screen.getByTestId('pwRegMsg')).toBeInTheDocument();
});

test('test states', async () => {
  render(
    <Router>
      <Registration />
    </Router>,
  );
  const nameElement = screen.getByTestId('regNameUpdate');
  const usernameElement = screen.getByTestId('regUsernameUpdate');
  const emailElement = screen.getByTestId('regEmailUpdate');
  const pwElement = screen.getByTestId('regPwUpdate');
  const confirmPwElement = screen.getByTestId('regConfirmPwUpdate');
  expect(screen.getByRole('button')).toBeInTheDocument();

  await userEvent.type(nameElement, 'myname');
  await userEvent.type(usernameElement, 'user111');
  await userEvent.type(emailElement, 'username111@gmail.com');
  await userEvent.type(pwElement, 'password111');
  // await userEvent.type(confirmPwElement, 'password111');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByDisplayValue('myname')).toBeInTheDocument();
  expect(screen.getByDisplayValue('user111')).toBeInTheDocument();
  expect(screen.getByDisplayValue('username111@gmail.com')).toBeInTheDocument();
  expect(screen.getByDisplayValue('password111')).toBeInTheDocument();

  await userEvent.type(confirmPwElement, 'password111');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getAllByDisplayValue('password111')).toHaveLength(2);
});

// act(() => {
//   wrapper.find('button').simulate('click');
// });
// render(
//   <Router>
//     <Registration />
//   </Router>,
// );
// const { result } = renderHook(() => (
//   <Router>
//     <Registration />
//   </Router>
// ));
// expect(result.current.newName).toBe('');
// expect(result.current.newUsername).toBe('');
// expect(result.current.newEmail).toBe('');
// expect(result.current.newPassword).toBe('');
// expect(result.current.confirmPassword).toBe('');
// expect(result.current.blankError).toBe(false);
// expect(result.current.emailError).toBe(false);
// expect(result.current.passwordError).toBe(false);

// test('validation fuction to be called', async () => {
//   render(
//     <Router>
//       <Registration />
//     </Router>,
//   );
//   const mockRegistrationValidation = jest.fn();
//   jest.doMock('../components/registration', () => jest.fn().mockImplementation(() => ({
//     registrationValidation: mockRegistrationValidation,
//   })));

//   await userEvent.click(screen.getByRole('button'));
//   expect(mockRegistrationValidation).toHaveBeenCalled();
//   expect(mockRegistrationValidation).toHaveReturned();
// });
