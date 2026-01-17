import api from '../config/axios';

export const linkBugToTestCase = async (payload) => {
  const res = await api.post('/testcase-bugs', payload);
  return res.data;
};

export const getBugsByTestCase = async (testCaseId) => {
  const res = await api.get(`/testcase-bugs/test-case/${testCaseId}`);
  return res.data;
};

/* ✅ NEW */
export const getOpenBugForTestCase = async (testCaseId) => {
  const res = await api.get(
    `/testcase-bugs/test-case/${testCaseId}/open-bug`
  );
  return res.data;
};
