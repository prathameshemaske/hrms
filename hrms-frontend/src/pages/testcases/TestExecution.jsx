const [showBugConfirm, setShowBugConfirm] = useState(false);
const [pendingExecution, setPendingExecution] = useState(null);

const handleExecuteTest = async (status, executionNotes) => {
  if (status === "FAIL") {
    setPendingExecution({ status, executionNotes });
    setShowBugConfirm(true);
    return;
  }

  await executeTestCase({
    test_case_id: testCase.id,
    executed_by: user.id,
    status,
    execution_notes: executionNotes,
    linked_bug_id: null,
  });
};


const handleCreateBug = async () => {
  let linkedBugId = null;
  const { status, executionNotes } = pendingExecution;

  const bug = await createBugFromTestFailure({
    testCase,
    executionNotes,
  });

  if (bug?.id) {
    linkedBugId = bug.id;

    await linkBugToTestCase({
      testCaseId: testCase.id,
      bugId: bug.id,
    });
  }

  await executeTestCase({
    test_case_id: testCase.id,
    executed_by: user.id,
    status,
    execution_notes: executionNotes,
    linked_bug_id: linkedBugId,
  });

  setShowBugConfirm(false);
};

const handleSkipBug = async () => {
  const { status, executionNotes } = pendingExecution;

  await executeTestCase({
    test_case_id: testCase.id,
    executed_by: user.id,
    status,
    execution_notes: executionNotes,
    linked_bug_id: null,
  });

  setShowBugConfirm(false);
};


<ConfirmModal
  open={showBugConfirm}
  title="Test Failed"
  message="Do you want to create a bug for this test failure?"
  onConfirm={handleCreateBug}
  onCancel={handleSkipBug}
/>
