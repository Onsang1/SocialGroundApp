// /**
// * @jest-environment jsdom
// */

// import React from 'react';
// // import testing library functions
// import { BrowserRouter as Router } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderer from 'react-test-renderer';
// import Feed from "../components/ActivityFeed";
// import Post from "../components/Post";
// import Comment from "../components/Comment";
// import CreateComment from '../components/Create';


// test('renders Send Button', () => {
//   render(
//     <Router>
//       <CreateComment />
//     </Router>,
//   ); 
//   const linkElement = getByText('SEND');
//   expect(linkElement).toBeInTheDocument();
// });


// test('renders username mario', () => {
//   render(
//     <Router>
//       <Post />
//     </Router>,
//   ); 
//   const linkElement = getByText('mario');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders username yoshi', () => {
//   render(
//     <Router>
//       <Post />
//     </Router>,
//   ); 
//   const linkElement = screen.getByText('yoshi');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders username yoshi', () => {
//   render(
//     <Router>
//       <Comment />
//     </Router>,
//   ); 
//   const linkElement = screen.getByText('username');
//   expect(linkElement).toBeInTheDocument();
// });

// test('feed matches snapshot', () => {
//   const component = renderer.create(
//     <Router>
//       <Feed />
//     </Router>,
//   );
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('comment matches snapshot', () => {
//   const component = renderer.create(
//     <Router>
//       <Comment />
//     </Router>,
//   );
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });


// test('Textbox to have value after input', async () => {
//   render(
//     <Router>
//       <CreateComment />
//     </Router>,
//   );

//   const commentLabel = getByText('Type');
//   const commentPlaceholder = getByText('Add a comment');

//   expect(commentLabel).toBeInDocument();
//   expect(commentPlaceholder).toBeInDocument();

//   const commentInput = getByLabelText('Add a comment');

//   expect(commentInput).toHaveAttribute('maxRows', 'placeholder','required','variant');

//   const element = screen.getByRole('textbox', { name: 'Add a comment' });

//   await userEvent.type(element, 'username123@gmail.com');
//   expect(screen.getByLabelText('Add a comment')).toHaveValue('user123@gmail.com');
// });

// test('Should call onSubmit when Send button is clicked', async () => {
//   render(
//     <Router>
//       <CreateComment />
//     </Router>,
//   );
//   await userEvent.type(screen.getByRole('textbox', { name: 'Add a comment' }), 'user123@gmail.com');
//   userEvent.click(screen.getByRole('button', { name: 'SEND' }));
//   expect(onsubmit).toHaveBeenCalledWith('user123@gmail.com');
// });
