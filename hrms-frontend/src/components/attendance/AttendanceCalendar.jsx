const AttendanceCalendar = () => {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">October 2023</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">Month</button>
          <button className="px-3 py-1 text-sm">Week</button>
          <button className="px-3 py-1 text-sm">Day</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <div key={d} className="bg-gray-50 text-xs font-bold text-center py-2">
            {d}
          </div>
        ))}

        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={i}
            className="bg-white h-28 p-2 text-sm border flex flex-col justify-between"
          >
            <span className="font-bold">{i + 1}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              PRESENT
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
