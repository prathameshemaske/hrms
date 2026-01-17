import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import {
  executeTestCase,
  getExecutionsByTestCase,
} from '../../api/testExecution.api';

import { createBugFromTestFailure } from '../../api/autoBug.api';
import {
  linkBugToTestCase,
  getOpenBugForTestCase,
} from '../../api/testcaseBugLink.api';

import { closeBug } from '../../api/bugs.api';

const TestExecution = ({ testCase }) => {
  const { user } = useAuth();

  if (!testCase) return null;

  const [status, setStatus] = useState('PASS');
  const [executionNotes, setExecutionNotes] = useState('');
  const [executions, setExecutions] = useState([]);

  const loadExecutions = async () => {
    const data = await getExecutionsByTestCase(testCase.id);
    setExecutions(data);
  };

  useEffect(() => {
    loadExecutions();
  }, [testCase.id]);

  const handleExecute = async () => {
    let linkedBugId = null;

    /* 🔴 FAIL → create or reuse bug */
    if (status === 'FAIL') {
      const existingBug = await getOpenBugForTestCase(testCase.id);

      if (existingBug) {
        linkedBugId = existingBug.id;
        alert(`Existing OPEN bug found (#${existingBug.id}).`);
      } else {
        const shouldCreateBug = window.confirm(
          'Test failed. Create a new bug?'
        );

        if (shouldCreateBug) {
          const bug = await createBugFromTestFailure({
            testCase,
            executionNotes,
          });

          if (bug && bug.id) {
            linkedBugId = bug.id;

            await linkBugToTestCase({
              testCaseId: testCase.id,
              bugId: bug.id,
            });
          }
        }
      }
    }

    /* 🟢 PASS → auto-close existing OPEN bug */
    if (status === 'PASS') {
      const openBug = await getOpenBugForTestCase(testCase.id);

      if (openBug) {
        await closeBug(openBug.id);
      }
    }

    /* ✅ Always save execution */
    await executeTestCase({
      test_case_id: testCase.id,
      executed_by: user.id,
      status,
      execution_notes: executionNotes,
      linked_bug_id: linkedBugId,
    });

    setExecutionNotes('');
    loadExecutions();
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>Test Execution</h4>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PASS">PASS</option>
        <option value="FAIL">FAIL</option>
        <option value="BLOCKED">BLOCKED</option>
      </select>

      <br /><br />

      <textarea
        placeholder="Execution notes"
        value={executionNotes}
        onChange={(e) => setExecutionNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={handleExecute}>Submit Execution</button>

      <hr />

      <h4>Execution History</h4>

      {executions.length === 0 && <p>No executions yet.</p>}

      <ul>
        {executions.map((ex) => (
          <li key={ex.id}>
            <b>{ex.status}</b> — {ex.execution_notes}
            <br />
            <small>
              By {ex.executed_by} |{' '}
              {new Date(ex.executed_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestExecution;
