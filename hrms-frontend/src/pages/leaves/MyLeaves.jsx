import { useEffect, useState } from 'react';
import { getMyLeaves } from '../../api/leaves.api';

const MyLeaves = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        getMyLeaves().then(setLeaves);
    }, []);

    return (
        <div>
            <h2>My Leaves</h2>

            <ul>
                {leaves.map((l) => (
                    <li key={l.id}>
                        {l.leave_type} | {l.start_date} → {l.end_date} | {l.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyLeaves;
