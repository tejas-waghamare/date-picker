import RecurringDatePicker from '../components/RecurringDatePicker';

export default function AnotherPage() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <RecurringDatePicker onChange={(data) => console.log(data)} />
    </div>
  );
}