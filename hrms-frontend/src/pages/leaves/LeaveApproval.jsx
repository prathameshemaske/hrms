import { useEffect, useState } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../../api/leaves.api';

const LeaveApproval = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        getAllLeaves().then(setLeaves);
    }, []);

    const act = async (id, status) => {
        await updateLeaveStatus(id, status);
        setLeaves(await getAllLeaves());
    };

    return (
        <div>
            <h2>Leave Requests</h2>

            <ul>
                {leaves.map((l) => (
                    <li key={l.id}>
                        {l.employee_name} | {l.leave_type}
                        <button onClick={() => act(l.id, 'APPROVED')}>Approve</button>
                        <button onClick={() => act(l.id, 'REJECTED')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveApproval;
