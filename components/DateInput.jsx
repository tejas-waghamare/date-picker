import React from "react";

/**
 * DateInput Component
 * Handles start and end date inputs with validation feedback.
 * @param {string} startDate - The start date value.
 * @param {string} endDate - The end date value.
 * @param {Function} onDateChange - Handler for date changes.
 */
const DateInput = ({ startDate, endDate, onDateChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={onDateChange("startDate")}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={onDateChange("endDate")}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default DateInput;