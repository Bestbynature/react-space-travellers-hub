import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';

describe('Layout', () => {
  test('renders layout with title and outlet', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(getByText('Layout')).toBeInTheDocument();
  });
});
