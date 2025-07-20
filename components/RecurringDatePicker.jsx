
"use client";
import React, { useState } from "react";
import DateInput from "./DateInput";
import RecurrenceOptions from "./RecurrenceOptions";
import CustomInterval from "./CustomInterval";
import DaysOfWeekSelector from "./DaysOfWeekSelector";
import SpecificDaySelector from "./SpecificDaySelector";
import MiniCalendarPreview from "./MiniCalendarPreview";

/**
 * RecurringDatePicker Component
 * Orchestrates the recurring schedule UI with validation and state management.
 * @param {Function} onChange - Callback for schedule changes.
 */
const RecurringDatePicker = ({ onChange }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [recurrence, setRecurrence] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState(1);
  const [stopOption, setStopOption] = useState("endDate");
  const [occurrenceCount, setOccurrenceCount] = useState(1);
  const [weekDays, setWeekDays] = useState(["Monday"]);
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [monthData, setMonthData] = useState({
    occurrence: "1st",
    weekDay: "Sunday",
    day: 1,
    isSpecific: false,
  });
  const [yearData, setYearData] = useState({
    month: "January",
    occurrence: "1st",
    weekDay: "Sunday",
    day: 1,
    isSpecific: false,
  });

  const handleRecurrenceChange = (type) => {
    setRecurrence(type);
    if (type !== "daily" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isInvalidDateRange(start, end, type)) {
        setStartDate("");
        setEndDate("");
        alert(
          `Please select start and end dates in different ${
            type === "weekly" ? "weeks" : type === "monthly" ? "months" : "years"
          } for ${type} recurrence.`
        );
      }
    }
    triggerChange({ recurrence: type });
  };

  const handleDateChange = (field) => (e) => {
    const value = e.target.value;
    const newStart = field === "startDate" ? value : startDate;
    const newEnd = field === "endDate" ? value : endDate;
    if (newStart && newEnd) {
      const start = new Date(newStart);
      const end = new Date(newEnd);
      if (isInvalidDateRange(start, end, recurrence)) {
        alert(
          `Please select start and end dates in different ${
            recurrence === "weekly"
              ? "weeks"
              : recurrence === "monthly"
              ? "months"
              : "years"
          } for ${recurrence} recurrence.`
        );
        if (field === "startDate") setStartDate("");
        if (field === "endDate") setEndDate("");
        return;
      }
    }
    if (field === "startDate") setStartDate(value);
    if (field === "endDate") setEndDate(value);
    triggerChange({ [field]: value });
  };

  const handleIntervalChange = (value) => {
    setInterval(value);
    triggerChange({ interval: value });
  };

  const handleStopOptionChange = (option) => {
    setStopOption(option);
    triggerChange({ stopOption: option });
  };

  const handleOccurrenceCountChange = (value) => {
    setOccurrenceCount(value);
    triggerChange({ occurrenceCount: value });
  };

  const handleWeekDayChange = (e) => {
    const value = e.target.value;
    setWeekDays((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
    triggerChange({ weekDays });
  };

  const handleMultiDayChange = (value) => {
    setIsMultiDay(value === "multi");
    if (value === "single") setWeekDays([weekDays[0] || "Monday"]);
    triggerChange({
      isMultiDay: value === "multi",
      weekDays: value === "single" ? [weekDays[0] || "Monday"] : weekDays,
    });
  };

  const handleMonthDataChange = (field) => (e) => {
    const value = e.target.value;
    setMonthData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "isSpecific") {
        return value === "specific"
          ? { ...newData, occurrence: "", weekDay: "", day: 1 }
          : { ...newData, day: 1 };
      }
      return newData;
    });
    triggerChange({ monthData: { ...monthData, [field]: value } });
  };

  const handleYearDataChange = (field) => (e) => {
    const value = e.target.value;
    setYearData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "isSpecific") {
        return value === "specific"
          ? { ...newData, occurrence: "", weekDay: "", day: 1 }
          : { ...newData, day: 1 };
      }
      return newData;
    });
    triggerChange({ yearData: { ...yearData, [field]: value } });
  };

  const triggerChange = (newData = {}) => {
    onChange?.({
      startDate,
      endDate,
      recurrence,
      interval,
      stopOption,
      occurrenceCount,
      weekDays,
      monthData,
      yearData,
      isMultiDay,
      ...newData,
    });
  };

  const handleSave = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isInvalidDateRange(start, end, recurrence)) {
        alert(
          `Please select start and end dates in different ${
            recurrence === "weekly"
              ? "weeks"
              : recurrence === "monthly"
              ? "months"
              : "years"
          } for ${recurrence} recurrence.`
        );
        return;
      }
    }
    alert(
      `Saved: ${recurrence} every ${interval} ${
        interval === 1 ? "day" : "days"
      } from ${startDate} to ${endDate}`
    );
    triggerChange();
  };

  const isInvalidDateRange = (start, end, recurrenceType) => {
    if (recurrenceType === "daily") return false;
    if (start > end) return true;
    const startDate = new Date(start);
    const endDate = new Date(end);
    switch (recurrenceType) {
      case "weekly":
        const startWeek =
          Math.floor(startDate.getDate() / 7) + (startDate.getDay() === 0 ? 0 : 1);
        const endWeek =
          Math.floor(endDate.getDate() / 7) + (endDate.getDay() === 0 ? 0 : 1);
        return (
          startWeek === endWeek &&
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getFullYear() === endDate.getFullYear()
        );
      case "monthly":
        return (
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getFullYear() === endDate.getFullYear()
        );
      case "yearly":
        return startDate.getFullYear() === endDate.getFullYear();
      default:
        return false;
    }
  };

  // const previewText = `Recurring ${recurrence} every ${interval} ${
  //   interval === 1 ? "day" : "days"
  // } from ${startDate || "start date"} to ${endDate || "end date"}${
  //   recurrence === "weekly"
  //     ? ` on ${weekDays.join(", ")}`
  //     : recurrence === "monthly"
  //     ? ` on ${
  //         monthData.isSpecific
  //           ? `day ${monthData.day}`
  //           : `${monthData.occurrence} ${monthData.weekDay}`
  //       }`
  //     : recurrence === "yearly"
  //     ? ` on ${
  //         yearData.isSpecific
  //           ? `day ${yearData.day} of ${yearData.month}`
  //           : `${yearData.occurrence} ${yearData.weekDay} of ${yearData.month}`
  //       }`
  //     : ""
  // }`;

  const previewText = `Recurring ${recurrence} every ${interval} ${interval === 1 ? "day" : "days"}${
    startDate && endDate
      ? ` from ${startDate} to ${endDate}${
          recurrence === "weekly"
            ? ` on ${weekDays.join(", ")}`
            : recurrence === "monthly"
            ? ` on ${
                monthData.isSpecific
                  ? `day ${monthData.day}`
                  : `${monthData.occurrence} ${monthData.weekDay}`
              }`
            : recurrence === "yearly"
            ? ` on ${
                yearData.isSpecific
                  ? `day ${yearData.day} of ${yearData.month}`
                  : `${yearData.occurrence} ${yearData.weekDay} of ${yearData.month}`
              }`
            : ""
        }`
      : ""
  }`;

  return (
    <div className="bg-gradient-to-r from-black to-gray-600 min-h-screen py-5 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl  font-extrabold text-center p-1 mb-5 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
        Recurring Schedule
      </h2>
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/70 blur-2xl opacity-50 pointer-events-none"></div>

        {/* Left side: controls */}
        <div className="w-full md:w-3/5 overflow-x-auto  relative z-10 space-y-6">
          <RecurrenceOptions
            recurrence={recurrence}
            onRecurrenceChange={handleRecurrenceChange}
          />
          <CustomInterval
            interval={interval}
            onIntervalChange={handleIntervalChange}
          />
          <DateInput
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
          {recurrence === "weekly" && (
            <DaysOfWeekSelector
              weekDays={weekDays}
              isMultiDay={isMultiDay}
              onWeekDayChange={handleWeekDayChange}
              onMultiDayChange={handleMultiDayChange}
            />
          )}
          {(recurrence === "monthly" || recurrence === "yearly") && (
            <SpecificDaySelector
              recurrence={recurrence}
              monthData={monthData}
              yearData={yearData}
              onMonthDataChange={handleMonthDataChange}
              onYearDataChange={handleYearDataChange}
            />
          )}
          {/* Stop Conditions */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md border border-gray-300 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-400 pb-3">
              Stop Condition
            </h3>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="stop"
                checked={stopOption === "never"}
                onChange={() => handleStopOptionChange("never")}
                className="h-6 w-6 text-indigo-600 rounded-full"
              />
              <span className="text-lg text-gray-700">Never stop</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="stop"
                checked={stopOption === "endDate"}
                onChange={() => handleStopOptionChange("endDate")}
                className="h-6 w-6 text-indigo-600 rounded-full"
              />
              <span className="text-lg text-gray-700">Run until a specific date</span>
            </label>
            {stopOption === "endDate" && (
              <input
                type="date"
                value={endDate}
                onChange={handleDateChange("endDate")}
                className="w-full p-3 rounded-lg border border-gray-300 shadow focus:ring-indigo-400"
              />
            )}
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="stop"
                checked={stopOption === "occurrences"}
                onChange={() => handleStopOptionChange("occurrences")}
                className="h-6 w-6 text-indigo-600 rounded-full"
              />
              <span className="text-lg text-gray-700">
                Run until it reaches
              </span>
            </label>
            {stopOption === "occurrences" && (
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="1"
                  value={occurrenceCount}
                  onChange={(e) =>
                    handleOccurrenceCountChange(parseInt(e.target.value) || 1)
                  }
                  className="w-28 p-3 rounded-lg border border-gray-300 shadow focus:ring-indigo-400"
                />
                <span className="text-lg text-gray-600">occurrences</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: preview and button */}
        <div className="w-full md:w-1/3 relative z-10 space-y-6">
          <MiniCalendarPreview
            isOpen={isPreviewOpen}
            onToggle={() => setIsPreviewOpen(!isPreviewOpen)}
            previewText={previewText}
          />
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
