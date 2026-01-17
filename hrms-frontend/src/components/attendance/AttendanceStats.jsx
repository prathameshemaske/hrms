const AttendanceStats = () => {
    return (
        <>
            <div className="bg-white p-6 rounded-xl border">
                <p className="text-xs text-gray-500 font-bold uppercase">
                    Total Working Hours
                </p>
                <h3 className="text-2xl font-bold">160h 30m</h3>
                <div className="h-2 bg-gray-100 rounded mt-2">
                    <div className="h-2 bg-blue-600 rounded w-[85%]" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
                <p className="text-xs text-gray-500 font-bold uppercase">
                    Avg Login Time
                </p>
                <h3 className="text-2xl font-bold">09:05 AM</h3>
                <p className="text-xs text-green-600 mt-1">
                    12m earlier than last month
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
                <p className="text-xs font-bold uppercase mb-4">
                    Summary Stats
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-2xl font-bold">18</p>
                        <p className="text-xs text-gray-500">Days Present</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-500">1</p>
                        <p className="text-xs text-gray-500">Unpaid Absent</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-xs text-gray-500">Leaves Taken</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-xs text-gray-500">Holidays</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendanceStats;
