import { useState } from 'react';
import { updateBugStatus } from '../../api/bugs.api';
import useAuth from '../../hooks/useAuth';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

const BugStatusWorkflow = ({ bugId, currentStatus, onStatusUpdated }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canUpdate = user?.role === 'ADMIN' || user?.role === 'QA';

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    setError('');

    try {
      await updateBugStatus(bugId, newStatus);
      onStatusUpdated(newStatus);
    } catch (err) {
      console.error(err);
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>Status</h4>

      {canUpdate ? (
        <select value={status} onChange={handleChange} disabled={loading}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>
      ) : (
        <p>{status.replace('_', ' ')}</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BugStatusWorkflow;
