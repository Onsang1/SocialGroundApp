import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import testing library functions
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import {within} from '@testing-library/dom'
import App from './App';
import Profile from './profile'
import Upload from './upload';

test('renders Profile link', () => {
  const { getByText} = 
  render(
    <Router>
      <Profile />
    </Router>
  );
  const linkElement = getByText(/Posts/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Upload link', () => {
  const { getByText} = 
  render(
    <Router>
      <Upload />
    </Router>
  );
  const linkElement = getByText(/Share/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Upload link', () => {
  const { getByText} = 
  render(
    <Router>
      <Upload />
    </Router>
  );
  const linkElement = getByText(/Caption/);
  expect(linkElement).toBeInTheDocument();
});

// snapshot testing

test('SocialGround home page matches snapshot', () => {
  const component = render(
  <Router>
    <App />
  </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SocialGround profile page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Profile />
    </Router>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SocialGround upload page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Upload />
    </Router>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// // test type event
// test('When user enters a city it is displayed', async () => {
//   render(<WeatherApp />);
//   // create a reference to the textbox
//   const element = screen.getByRole('textbox')

//   // type some text (douala) into the textbox
//   await userEvent.type(element,  'douala');
//   // fire a click on the Ok button
//   // await user.click(screen.getByRole('button', {name: /OK/i}))
//   // assertion: verify that the text is in the textbox
//   expect(element).toHaveValue('douala')
// });

// // test click event

// test('Textbox empty after clicking on a link', async () => {
//   // render the component
//   render(
//   <Router>
//     <Upload />
//   </Router>
//     );
//   // create a reference to the textbox
//   const element = screen.getByRole('')

//   // type some text (douala) into the textbox
//   await userEvent.type(element,  'douala');

//   // assertion: verify that the text is in the textbox
//   expect(element).toHaveValue('douala')
//   // fire a click on the a link (city) button
//   await userEvent.click(screen.getByText('Mumbai'));

//   // assertion: verify that the textbox is empty
//   expect(element).toHaveValue('')
  
// });