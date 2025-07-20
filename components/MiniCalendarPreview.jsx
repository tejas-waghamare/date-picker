import React from "react";

/**
 * MiniCalendarPreview Component
 * Displays a collapsible preview of the schedule.
 * @param {boolean} isOpen - Whether the preview is open.
 * @param {Function} onToggle - Handler to toggle preview visibility.
 * @param {string} previewText - The preview text to display.
 * @param {number|string} interval - The interval value to highlight.
 * @param {string} startDate - The start date to highlight.
 * @param {string} endDate - The end date to highlight.
 */
const MiniCalendarPreview = ({ isOpen, onToggle, previewText, interval, startDate, endDate }) => {
  return (
    <div className="mb-8 w-full">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-sm font-medium flex justify-between hover:bg-gray-50 transition-all duration-300"
      >
        <span>Preview Schedule</span>
        <span className="text-custom-blue">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md max-h-32 overflow-auto">
          <h4 className="font-medium text-sm text-gray-800 mb-2">Schedule Preview</h4>
          <p className="text-gray-700 text-sm whitespace-normal break-words">
            {previewText.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  word === "daily" ||
                  word === "weekly" ||
                  word === "monthly" ||
                  word === "yearly" ||
                  word === (interval?.toString() ?? "") ||
                  word === (startDate ?? "") ||
                  word === (endDate ?? "")
                    ? "font-semibold text-custom-blue"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default MiniCalendarPreview;