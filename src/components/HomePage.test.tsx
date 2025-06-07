import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import React from 'react';

describe('HomePage', () => {
  it('renders the welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
