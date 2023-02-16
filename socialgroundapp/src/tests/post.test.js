/**
* @jest-environment jsdom
*/

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  afterEach, expect, test, jest,
} from '@jest/globals';
// import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import userEvent from '@testing-library/user-event';
// import PostEdit from '../components/PostEdit';
import Posts from '../components/Posts';

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

const mockPost = [
  {
    caption: 'My First Blog',
    body: 'image',
    author: 'mario',
    id: 1,
    userId: 1,
  },
];

// test('renders PostEdit Component', () => {
//     render()
// //   shallow(<PostEdit />);
// });
//   const deleteButton = getByAltText('deleteButton');
//   expect(deleteButton).toHaveAttribute('src');

//   const editPostButton = getByAltText('editPostButton');
//   expect(editPostButton).toHaveAttribute('src');

//   const likeIcon = getByAltText('like-icon');
//   expect(likeIcon).toHaveAttribute('src');

test('test if Post has been called with Posts', () => {
  const { getByText } = render(
    <Router>
      <Posts posts={mockPost} />
    </Router>,
  );
  expect(getByText(/My First Blog/i)).toBeInTheDocument();
  //   jest.fn().mockImplementation(() => <Posts props={mockedPost} />);

  //   expect(mockPostComponent).toHaveBeenCalled();
});

test('test rendering', () => {
  const tree = renderer.create(
    <Router>
      <Posts posts={mockPost} />
    </Router>,
  );
  expect(tree).toMatchSnapshot();
});

// const mockPostComponent = jest.fn();
// jest.mock('../components/Posts', (props) => {
//   mockPostComponent(props);
//   return <Post />;
// });

// test('If Posts is passed open and has props, Post is called with Posts open and props', () => {
//   render(<Posts open props={mockedPost} />);
//   expect(mockPostComponent).toHaveBeenCalledWith(
//     expect.objectContaining({
//       open: true,
//       data: mockedPost,
//     }),
//   );
// });
