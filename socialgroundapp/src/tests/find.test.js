import React from 'react';
// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import Find from '../components/FindFriends';
import List from '../components/List';
import NotFound from '../components/NotFound';

// test('renders welcome message', () => {
//   const { getByText } = render(<Find />);
//   const linkElement = getByText(/Find Friends on Social Ground/);
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders message', () => {
//   render(
//     <Router>
//       <Find />
//     </Router>,
//   );
//   const linkElement = screen.getByText(/Find Friends on Social Ground/);
//   expect(linkElement).toBeInTheDocument();
// });

test('comment matches snapshot', () => {
  const component = renderer.create(
    <Find />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders welcome message', () => {
  render(
    <Find />,
  );
  const linkElement = screen.getByText('Find Friends on Social Ground');
  expect(linkElement).toBeInTheDocument();
});

test('page to have logo image', () => {
  render(
    <Find />,
  );
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('When user enters username it is displayed', async () => {
  render(<Find />);
  // create a reference to the textbox
  const element = screen.getByRole('textbox');

  // type some text (douala) into the textbox
  await userEvent.type(element, 'douala');
  // fire a click on the Ok button
  // await user.click(screen.getByRole('button', {name: /OK/i}))
  // assertion: verify that the text is in the textbox
  expect(element).toHaveValue('douala');
});

test('list to have profile image', () => {
  render(
    <List />,
  );
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(
    <List />,
  );
  const linkElement = screen.getByText('Karianne');
  expect(linkElement).toBeInTheDocument();
});

test('list snapshot', () => {
  const component = renderer.create(
    <List />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders username ', () => {
  render(
    <List />,
  );
  const linkElement = screen.getByText('Bret');
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(
    <NotFound />,
  );
  const linkElement = screen.getByText('Sorry');
  expect(linkElement).toBeInTheDocument();
});

test('page not found message', () => {
  render(
    <NotFound />,
  );
  const linkElement = screen.getByText('That page cannot be found');
  expect(linkElement).toBeInTheDocument();
});

test('comment matches snapshot', () => {
  const component = renderer.create(
    <NotFound />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('page not found message', () => {
  render(
    <List />,
  );
  const linkElement = screen.getByText('Follow');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('type');
});
