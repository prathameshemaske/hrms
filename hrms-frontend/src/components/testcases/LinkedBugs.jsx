import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBugsByTestCase } from '../../api/testcaseBugLink.api';

const LinkedBugs = ({ testCaseId }) => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBugs = async () => {
      try {
        const data = await getBugsByTestCase(testCaseId);
        setBugs(data);
      } catch (err) {
        console.error('Failed to load linked bugs', err);
      }
    };

    loadBugs();
  }, [testCaseId]);

  if (bugs.length === 0) {
    return <p>No bugs linked to this test case.</p>;
  }

  return (
    <div style={styles.container}>
      <h4>Linked Bugs</h4>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr
              key={bug.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/bugs/${bug.id}`)}
            >
              <td>{bug.title}</td>
              <td>{bug.status}</td>
              <td>{bug.severity}</td>
              <td>{bug.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkedBugs;

const styles = {
  container: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};
