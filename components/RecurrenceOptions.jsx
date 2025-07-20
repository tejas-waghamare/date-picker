import React from "react";

/**
 * RecurrenceOptions Component
 * Handles the selection of recurrence type (daily, weekly, monthly, yearly).
 * @param {string} recurrence - The current recurrence type.
 * @param {Function} onRecurrenceChange - Handler for recurrence change.
 */
const RecurrenceOptions = ({ recurrence, onRecurrenceChange }) => {
  const recurrenceOptions = ["daily", "weekly", "monthly", "yearly"];

  return (
    <div className="flex space-x-2 border-b-2 border-gray-200 mb-8">
      {recurrenceOptions.map((type) => (
        <button
          key={type}
          onClick={() => onRecurrenceChange(type)}
          className={`px-4 py-2 -mb-px text-sm font-medium transition-all duration-300 ease-in-out ${recurrence === type
            ? "border-b-2 border-custom-blue text-custom-blue bg-blue-50 shadow-inner"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            } rounded-t-md`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceOptions;