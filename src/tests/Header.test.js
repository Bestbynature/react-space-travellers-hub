import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';
import store from '../redux/store';

describe('Header component', () => {
  test('renders header with correct content', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    const planetImage = screen.getByAltText('planet');
    expect(planetImage).toBeInTheDocument();

    const heading = screen.getByText("Space Travelers' Hub");
    expect(heading).toBeInTheDocument();
  });
});
