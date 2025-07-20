"use client";
import React from 'react';
import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Page() {
  const handleChange = (data) => console.log('Schedule updated:', data);
  return <RecurringDatePicker onChange={handleChange} />;
}