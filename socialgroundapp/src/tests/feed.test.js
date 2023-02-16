import React from 'react';
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import {within} from '@testing-library/dom'
import Feed from "../components/ActivityFeed"
import CreateComment from '../components/Create';


test('renders Send Button', () => {
  const { getByText } = render(<CreateComment />);
  const linkElement = getByText('SEND');
  expect(linkElement).toBeInTheDocument();
});


test('renders username mario', () => {
  const { getByText } = render(<Post />);
  const linkElement = getByText('mario');
  expect(linkElement).toBeInTheDocument();
});

test('renders username yoshi', () => {
  const { getByText } = render(<Post />);
  const linkElement = getByText('yoshi');
  expect(linkElement).toBeInTheDocument();
});

test('renders username yoshi', () => {
  const { getByText } = render(<Comment />);
  const linkElement = getByText('username');
  expect(linkElement).toBeInTheDocument();
});

test('feed matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Feed />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('comment matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Comment />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Textbox to have value after input', async () => {
  render(
    <Router>
      <CreateComment />
    </Router>,
  );

  const commentLabel = getByText('Type');
  const commentPlaceholder = getByText('Add a comment');

  expect(commentLabel).toBeInDocument();
  expect(commentPlaceholder).toBeInDocument();

  const commentInput = getByLabelText('Add a comment');

  expect(commentInput).toHaveAttribute('maxRows', 'placeholder','required','variant');

  const element = screen.getByRole('textbox', { name: 'Add a comment' });

  await userEvent.type(element, 'username123@gmail.com');
  expect(screen.getByLabelText('Add a comment')).toHaveValue('user123@gmail.com');
});
