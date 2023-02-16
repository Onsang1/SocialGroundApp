/**
* @jest-environment jsdom
*/

import React from 'react';
// import testing library functions
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
// import { within } from '@testing-library/dom';
import Feed from '../components/ActivityFeed';
import Post from '../components/Post';
import Comment from '../components/Comment';
import CreateComment from '../components/Create';
import Posts from '../components/Posts';

test('renders Send Button', () => {
  render(
    <CreateComment />,
  );
  const linkElement = screen.getByText('SEND');
  expect(linkElement).toBeInTheDocument();
});

test('renders Send Button', () => {
  render(
    <CreateComment />,
  );
  const linkElement = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
});

test('renders caption mario', () => {
  render(
    <CreateComment />,
  );
  const linkElement = screen.getByPlaceholderText('Type');
  expect(linkElement).toBeInTheDocument();
});

test('renders username mario', () => {
  render(
    <Post />,
  );
  const linkElement = screen.getByText('mario');
  expect(linkElement).toBeInTheDocument();
});

test('renders caption mario', () => {
  render(
    <Post />,
  );
  const linkElement = screen.getByText('My First Blog');
  expect(linkElement).toBeInTheDocument();
});

test('renders caption yoshi', () => {
  render(
    <Post />,
  );
  const linkElement = screen.getByText('Opening Party!');
  expect(linkElement).toBeInTheDocument();
});

test('renders username yoshi', () => {
  render(
    <Post />,
  );
  const linkElement = screen.getByText('yoshi');
  expect(linkElement).toBeInTheDocument();
});

test('renders username yoshi', () => {
  render(
    <Comment />,
  );
  const linkElement = screen.getByText('username');
  expect(linkElement).toBeInTheDocument();
});

test('feed matches snapshot', () => {
  const component = renderer.create(
    <Feed />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('posts matches snapshot', () => {
  const component = renderer.create(
    <Posts />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('comment matches snapshot', () => {
  const component = renderer.create(
    <Comment />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('comment matches snapshot', () => {
  const component = renderer.create(
    <CreateComment />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should call onSubmit when Send button is clicked', async () => {
  render(
    <CreateComment />,
  );
  await userEvent.type(screen.getByRole('textbox', { name: 'Add a comment' }), 'user123@gmail.com');
  userEvent.click(screen.getByRole('button', { name: 'SEND' }));
  expect(onsubmit).toHaveBeenCalledWith('user123@gmail.com');
});

test('Textbox empty after clicking on a link', async () => {
  // render the component
  render(<CreateComment />);
  // create a reference to the textbox
  const element = screen.getByRole('textbox');
  // type some text (douala) into the textbox
  await userEvent.type(element, 'douala');

  // assertion: verify that the text is in the textbox
  expect(element).toHaveValue('douala');
  // fire a click on the a link (city) button
  await userEvent.click(screen.getByRole('button'));

  // assertion: verify that the textbox is empty
  expect(element).toHaveValue('');
});
