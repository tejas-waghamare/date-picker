// import { render, screen, fireEvent } from '@testing-library/react';
// import React from 'react';
// import RecurringDatePicker from '../components/RecurringDatePicker';

// describe('RecurringDatePicker', () => {
//   it('updates state and displays preview correctly', () => {
//     const mockOnChange = jest.fn(); // Mock the onChange function
//     render(<RecurringDatePicker onChange={mockOnChange} />);
//     fireEvent.click(screen.getByLabelText('Expand date picker'));
//     fireEvent.change(screen.getByLabelText('Start Date'), {
//       target: { value: '2025-07-19' }
//     });
//     fireEvent.click(screen.getByText('Weekly')); // Ensure a recurrence is selected
//     expect(screen.getByText(/Preview/)).toBeInTheDocument();
//     expect(screen.getByText(/Recurring every weekly/)).toBeInTheDocument();
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import RecurringDatePicker from '../components/RecurringDatePicker';

describe('RecurringDatePicker', () => {
  const mockOnChange = jest.fn(); // Mock the onChange function

  it('updates state and displays preview correctly for weekly recurrence', () => {
    render(<RecurringDatePicker onChange={mockOnChange} />);
    // Select Weekly recurrence
    fireEvent.click(screen.getByRole('button', { name: /recurrence/i }) || screen.getByText('Weekly'));
    fireEvent.click(screen.getByText('Weekly'));
    // Set start date
    fireEvent.change(screen.getByRole('textbox', { name: /start date/i }), {
      target: { value: '2025-07-19' }
    });
    // Expect preview to update
    expect(screen.getByText(/Recurring weekly every 1 day/)).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('handles end date and stop condition correctly', () => {
    render(<RecurringDatePicker onChange={mockOnChange} />);
    // Set end date
    fireEvent.change(screen.getByRole('textbox', { name: /end date/i }), {
      target: { value: '2025-07-26' }
    });
    // Select "Never stop" option
    fireEvent.click(screen.getByLabelText(/never stop/i));
    expect(screen.getByText(/Recurring.*to 2025-07-26/)).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ endDate: '2025-07-26', stopOption: 'never' }));
  });

  it('supports monthly recurrence with specific day pattern', () => {
    render(<RecurringDatePicker onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Monthly'));
    // Simulate selecting "2nd Tuesday" (adjust based on SpecificDaySelector implementation)
    // Placeholder: Assume a select or input for occurrence and weekday
    fireEvent.change(screen.getByRole('combobox', { name: /occurrence/i }), { target: { value: '2nd' } });
    fireEvent.change(screen.getByRole('combobox', { name: /weekday/i }), { target: { value: 'Tuesday' } });
    expect(screen.getByText(/Recurring monthly on 2nd Tuesday/)).toBeInTheDocument();
  });
});