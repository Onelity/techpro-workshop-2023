import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

test('renders Spinner component', () => {
  render(<Spinner />);

  // Assert that the loader container and loader span are rendered
  const loaderContainer = screen.getByTestId('loader-container');
  expect(loaderContainer).toBeInTheDocument();

  const loaderSpan = screen.getByTestId('loader');
  expect(loaderSpan).toBeInTheDocument();

  // Assert that the appropriate classes are present
  expect(loaderContainer).toHaveClass('loader-container');
  expect(loaderSpan).toHaveClass('loader');
});