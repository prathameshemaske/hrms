import { useEffect, useState } from 'react';
import { linkBugToTestCase, getTestCasesByBug } from '../../api/testcaseBugLink.api';
import api from '../../config/axios';

const LinkTestCase = ({ bugId }) => {
  const [testCases, setTestCases] = useState([]);
  const [linked, setLinked] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const load = async () => {
      const all = await api.get('/testcases');
      const linkedTc = await getTestCasesByBug(bugId);
      setTestCases(all.data);
      setLinked(linkedTc);
    };
    load();
  }, [bugId]);

  const handleLink = async () => {
    if (!selected) return;

    await linkBugToTestCase({
      testCaseId: selected,
      bugId,
    });

    const linkedTc = await getTestCasesByBug(bugId);
    setLinked(linkedTc);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>Linked Test Cases</h4>

      <ul>
        {linked.map(tc => (
          <li key={tc.id}>{tc.title}</li>
        ))}
      </ul>

      <select onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select test case</option>
        {testCases.map(tc => (
          <option key={tc.id} value={tc.id}>{tc.title}</option>
        ))}
      </select>

      <button onClick={handleLink}>Link</button>
    </div>
  );
};

export default LinkTestCase;
