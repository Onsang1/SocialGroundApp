/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import { createMemoryHistory } from 'history';
import { Router } from "react-router";
import renderer from 'react-test-renderer';
import Likes from '../components/Likes';
import NavBar from '../components/Navbar'
import Navbar from '../components/Navbar';

const mockLikeUser = [{
  id: 1,
  name: 'Bret Watermelon',
  username: 'Bret',
  email: 'bwatermelon@gmail.com',
  password: 'bret123',
  following: [
    2,
    4,
  ],
  followers: [
    3,
  ],
  postCount: 1,
  suggested: [1, 2, 3],
}];

const mockLikePost = [
  {
    caption: 'My First Blog',
    body: 'image',
    author: 'mario',
    id: 1,
    userId: 1,
  },
];

test('renders Like', () => {
  render(<Likes post={mockLikePost} current={mockLikeUser} />);
  expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
});

test('test to see if likes components are rendered', async () => {
  const tree = renderer.create(<Likes />);
  expect(tree).toMatchSnapshot();
});

// test('testing navbar', () => {
//   const { getByText } = render(
//     <Router>
//       <Navbar />
//     </Router>,
//   );
//   expect(getByText()).toBeInTheDocument();
//   //   jest.fn().mockImplementation(() => <Posts props={mockedPost} />);

//   //   expect(mockPostComponent).toHaveBeenCalled();
// });
test("testing navbar",() =>{
  const history = createMemoryHistory();
  const component = render(
      <Router location={history.location} navigator={history}>
          <NavBar />,
      </Router>,

  );
  const labelNode = component.getByRole("link",{name: "search icon"});
  expect(labelNode).toBeInTheDocument();

});