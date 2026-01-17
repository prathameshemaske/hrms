import AttendanceCalendar from '../../components/attendance/AttendanceCalendar.jsx';
import AttendanceStats from '../../components/attendance/AttendanceStats';
import AttendanceLegend from '../../components/attendance/AttendanceLegend';

const AttendanceDashboard = () => {
    return (
        <div className="p-8 flex gap-8">
            {/* Left: Calendar */}
            <div className="flex-1">
                <AttendanceCalendar />
            </div>

            {/* Right: Stats */}
            <div className="w-80 flex flex-col gap-6">
                <AttendanceStats />
                <AttendanceLegend />
            </div>
        </div>
    );
};

export default AttendanceDashboard;
