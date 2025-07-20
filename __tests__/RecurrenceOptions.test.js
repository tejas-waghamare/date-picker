// import { render, screen, fireEvent } from '@testing-library/react';
// import React from 'react';
// import RecurrenceOptions from '../components/RecurrenceOptions';

// describe('RecurrenceOptions', () => {
//   const mockOnChange = jest.fn();
//   const recurrence = { type: 'daily', interval: 1, daysOfWeek: [], specificDay: null };

//   it('renders all recurrence options', () => {
//     render(<RecurrenceOptions recurrence={recurrence} onChange={mockOnChange} />);
//     expect(screen.getByText('Daily')).toBeInTheDocument();
//     expect(screen.getByText('Weekly')).toBeInTheDocument();
//     expect(screen.getByText('Monthly')).toBeInTheDocument();
//     expect(screen.getByText('Yearly')).toBeInTheDocument();
//     expect(screen.getByText('Custom')).toBeInTheDocument();
//   });

//   it('calls onChange with correct value when button is clicked', () => {
//     render(<RecurrenceOptions recurrence={recurrence} onChange={mockOnChange} />);
//     fireEvent.click(screen.getByText('Weekly'));
//     expect(mockOnChange).toHaveBeenCalledWith('weekly');
//   });
// });


import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import RecurrenceOptions from '../components/RecurrenceOptions';

describe('RecurrenceOptions', () => {
  const mockOnChange = jest.fn();
  const defaultRecurrence = { type: 'daily', interval: 1, daysOfWeek: [], specificDay: null };

  it('renders all recurrence options', () => {
    render(<RecurrenceOptions recurrence={defaultRecurrence} onChange={mockOnChange} />);
    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('calls onChange with correct value when button is clicked', () => {
    render(<RecurrenceOptions recurrence={defaultRecurrence} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Weekly'));
    expect(mockOnChange).toHaveBeenCalledWith('weekly');
  });

  it('handles invalid recurrence prop gracefully', () => {
    render(<RecurrenceOptions recurrence={{ type: 'invalid', interval: 1 }} onChange={mockOnChange} />);
    expect(screen.getByText('Daily')).toBeInTheDocument(); // Should default to a valid option
    expect(mockOnChange).not.toHaveBeenCalled(); // No change should trigger
  });

  it('triggers custom logic when Custom is clicked', () => {
    render(<RecurrenceOptions recurrence={defaultRecurrence} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Custom'));
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'custom' }));
  });

  it('maintains selected state visually', () => {
    render(<RecurrenceOptions recurrence={{ type: 'weekly', interval: 1 }} onChange={mockOnChange} />);
    expect(screen.getByText('Weekly')).toHaveAttribute('aria-checked', 'true');
    // Adjust based on actual implementation (e.g., class or attribute for selection)
  });
});