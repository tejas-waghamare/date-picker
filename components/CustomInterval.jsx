import React from "react";

/**
 * CustomInterval Component
 * Handles the repeat interval input.
 * @param {number} interval - The current interval value.
 * @param {Function} onIntervalChange - Handler for interval change.
 */
const CustomInterval = ({ interval, onIntervalChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Repeat Every</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => onIntervalChange(parseInt(e.target.value, 10))}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default CustomInterval;