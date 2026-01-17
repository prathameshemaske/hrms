const AttendanceLegend = () => {
    return (
        <div className="bg-white p-6 rounded-xl border">
            <h4 className="text-xs font-bold uppercase mb-4">
                Status Legend
            </h4>
            <div className="space-y-2 text-sm">
                <div className="flex gap-2"><span className="w-3 h-3 bg-green-500 rounded-full" /> Present</div>
                <div className="flex gap-2"><span className="w-3 h-3 bg-red-500 rounded-full" /> Absent</div>
                <div className="flex gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full" /> Leave</div>
                <div className="flex gap-2"><span className="w-3 h-3 bg-gray-400 rounded-full" /> Weekend</div>
            </div>
        </div>
    );
};

export default AttendanceLegend;
