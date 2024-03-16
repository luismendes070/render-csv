import React from 'react';
// ChatGPT components/__tests__/CSVComponent.test.tsx

// import { render, screen } from '@testing-library/react';
import CSVComponent from '../components/CSVComponent';

// components/__tests__/CSVComponent.test.tsx
// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import CSVComponent from '../CSVComponent';

// CSVComponent.test.tsx
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import CSVComponent from './CSVComponent';

test('renders CSV data', async () => {
  render(<CSVComponent />);
  const csvDataElement = await screen.findByText(/name,age/);
  expect(csvDataElement).toBeInTheDocument();
});


describe('CSVComponent', () => {
  it('renders CSV data', async () => {
    // Mock the fetch function to return CSV data
    jest.spyOn(global, 'fetch').mockResolvedValue({
      text: jest.fn().mockResolvedValue('name,age\nJohn,30\nJane,25'),
    });

    // Render the component
    render(<CSVComponent />);

    // Wait for CSV data to be rendered
    await waitFor(() => screen.getByText('name,age'));

    // Assert that CSV data is rendered
    expect(screen.getByText('name,age')).toBeInTheDocument();
    expect(screen.getByText('John,30')).toBeInTheDocument();
    expect(screen.getByText('Jane,25')).toBeInTheDocument();
  });
});

describe('CSVComponent', () => {
  it('renders CSV data with correct headers', () => {
    render(<CSVComponent />);
    
    const csvLink = screen.getByText('Download CSV');
    expect(csvLink).toBeInTheDocument();
    
    expect(csvLink).toHaveAttribute('href', '/data.csv');
    expect(csvLink).toHaveAttribute('download');
  });
});
