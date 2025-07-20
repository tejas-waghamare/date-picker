import React from "react";

/**
 * SpecificDaySelector Component
 * Handles day selection for monthly and yearly recurrences.
 * @param {string} recurrence - The current recurrence type.
 * @param {Object} monthData - Data for monthly recurrence (occurrence, weekDay, day, isSpecific).
 * @param {Object} yearData - Data for yearly recurrence (month, occurrence, weekDay, day, isSpecific).
 * @param {Function} onMonthDataChange - Handler for monthly data changes.
 * @param {Function} onYearDataChange - Handler for yearly data changes.
 */
const SpecificDaySelector = ({ recurrence, monthData, yearData, onMonthDataChange, onYearDataChange }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const monthOccurrences = ["1st", "2nd", "3rd", "4th", "last"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleChange = (field) => (e) => {
    const handler = recurrence === "monthly" ? onMonthDataChange : onYearDataChange;
    handler(field)(e);
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">Day of {recurrence === "monthly" ? "Month" : "Year"}</label>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`${recurrence}Type`}
            value="week"
            checked={!recurrence === "monthly" ? !monthData.isSpecific : !yearData.isSpecific}
            onChange={handleChange("isSpecific")}
            className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
          />
          <span className="text-sm text-gray-700">By Weekday</span>
        </label>
        <label className="flex items-center space-x-2 ml-4">
          <input
            type="radio"
            name={`${recurrence}Type`}
            value="specific"
            checked={recurrence === "monthly" ? monthData.isSpecific : yearData.isSpecific}
            onChange={handleChange("isSpecific")}
            className="h-4 w-4 text-custom-blue focus:ring-2 focus:ring-custom-blue"
          />
          <span className="text-sm text-gray-700">Specific Day</span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recurrence === "yearly" && (
          <select
            value={yearData.month}
            onChange={handleChange("month")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
          >
            {monthsOfYear.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        )}
        {!recurrence === "monthly" ? !monthData.isSpecific : !yearData.isSpecific ? (
          <>
            <select
              value={recurrence === "monthly" ? monthData.occurrence : yearData.occurrence}
              onChange={handleChange("occurrence")}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
            >
              {monthOccurrences.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
            <select
              value={recurrence === "monthly" ? monthData.weekDay : yearData.weekDay}
              onChange={handleChange("weekDay")}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </>
        ) : (
          <select
            value={recurrence === "monthly" ? monthData.day : yearData.day}
            onChange={handleChange("day")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all"
          >
            {daysOfMonth.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default SpecificDaySelector;