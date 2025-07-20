import React from "react";

/**
 * DaysOfWeekSelector Component
 * Handles day selection for weekly recurrence.
 * @param {Array} weekDays - Array of selected weekdays.
 * @param {boolean} isMultiDay - Toggle for single or multiple days.
 * @param {Function} onWeekDayChange - Handler for weekday selection changes.
 * @param {Function} onMultiDayChange - Handler for multi-day toggle change.
 */
const DaysOfWeekSelector = ({ weekDays, isMultiDay, onWeekDayChange, onMultiDayChange }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="dayType"
            value="single"
            checked={!isMultiDay}
            onChange={() => onMultiDayChange("single")}
            className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
          />
          <span className="text-sm text-gray-700">Single Day</span>
        </label>
        <label className="flex items-center space-x-2 ml-4">
          <input
            type="radio"
            name="dayType"
            value="multi"
            checked={isMultiDay}
            onChange={() => onMultiDayChange("multi")}
            className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
          />
          <span className="text-sm text-gray-700">Multiple Days</span>
        </label>
      </div>
      {isMultiDay ? (
        <div className="grid grid-cols-2 gap-2">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={day}
                checked={weekDays.includes(day)}
                onChange={onWeekDayChange}
                className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
              />
              <span className="text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="radio"
                name="weekDay"
                value={day}
                checked={weekDays[0] === day}
                onChange={onWeekDayChange}
                className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
              />
              <span className="text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaysOfWeekSelector;