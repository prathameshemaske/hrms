import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { bulkExecuteTestSuite } from '../../api/testSuiteExecution.api';

const BulkExecuteSuite = ({ testSuiteId }) => {
  const { user } = useAuth();

  const [status, setStatus] = useState('PASS');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBulkExecute = async () => {
    if (!window.confirm('Execute ALL test cases in this suite?')) return;

    setLoading(true);

    await bulkExecuteTestSuite({
      testSuiteId,
      status,
      executionNotes: notes,
      executedBy: user.id,
    });

    setNotes('');
    setLoading(false);
    alert('Bulk execution completed');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Bulk Execute Test Suite</h4>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PASS">PASS</option>
        <option value="FAIL">FAIL</option>
        <option value="BLOCKED">BLOCKED</option>
      </select>

      <br /><br />

      <textarea
        placeholder="Execution notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={handleBulkExecute} disabled={loading}>
        {loading ? 'Executing...' : 'Execute Entire Suite'}
      </button>
    </div>
  );
};

export default BulkExecuteSuite;
