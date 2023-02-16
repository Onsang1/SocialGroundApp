/**
* @jest-environment jsdom
*/

import React from 'react';
// import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import List from '../components/List';

const mockedUsers = [
  {
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
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    password: 'ant123',
    following: [],
    followers: [],
    postCount: 0,
  }];

const mockCurrUser = [
  {
    id: 1,
    name: 'Lena Sheng',
    username: 'xinyuesh',
    email: 'xinyuesh@gmail.com',
    following: [2, 4],
    followers: [3],
    suggested: [1, 2, 3],
  },
];

test('test to see if list components are rendered', async () => {
  const tree = renderer.create(<List
    input={[]}
    current={mockCurrUser}
    users={Array.from(mockedUsers)}
    listType="suggestion"
  />);
  expect(tree).toMatchSnapshot();
//   const linkElement = screen.getByText('Friends');
//   expect(linkElement).toBeInTheDocument();
//   expect(getByText(/Find Friends on Social/i)).toBeInTheDocument();
  // expect(Follow(follower={}, following={})).toHaveBeenCalled();
});
