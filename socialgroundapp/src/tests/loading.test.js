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
import Loading from '../components/Loading';

test('renders loading image', () => {
  render(
    <Router>
      <Loading />
    </Router>,
  );
  expect(screen.getByTestId('loading')).toBeInTheDocument();
});

test('test to see if loading components are rendered', async () => {
  const tree = renderer.create(<Loading />);
  expect(tree).toMatchSnapshot();
});
