import api from '../config/axios';

export const createBugFromTestFailure = async ({
  testCase,
  executionNotes,
}) => {
  const payload = {
    title: `Test Failed: ${testCase.title}`,
    description: `
Test Case: ${testCase.title}

Precondition:
${testCase.precondition || '-'}

Steps:
${testCase.steps}

Expected Result:
${testCase.expected_result}

Failure Notes:
${executionNotes}
    `,
    priority: 'HIGH',
    severity: 'HIGH',
    project: 'QA',
  };

  const res = await api.post('/bugs', payload);
  return res.data;
};
