import { useEffect, useState } from 'react';
import { getBugHistory } from '../../api/bugHistory.api';

const BugHistory = ({ bugId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getBugHistory(bugId);
      setHistory(data);
    };

    loadHistory();
  }, [bugId]);

  return (
    <div style={styles.container}>
      <h4>History</h4>

      {history.map((h) => (
        <div key={h.id} style={styles.item}>
          <p>
            <b>{h.action}</b> — {h.old_value} → {h.new_value}
          </p>
          <small>
            {h.performed_by_name || 'System'} |{' '}
            {new Date(h.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default BugHistory;

const styles = {
  container: {
    marginTop: '30px',
  },
  item: {
    padding: '8px',
    borderBottom: '1px solid #ddd',
  },
};
