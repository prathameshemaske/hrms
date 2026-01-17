const BUG_STATUS_TRANSITIONS = {
    OPEN: ['IN_PROGRESS'],
    IN_PROGRESS: ['FIXED'],
    FIXED: ['CLOSED', 'REOPENED'],
    CLOSED: ['REOPENED'],
    REOPENED: ['IN_PROGRESS'],
};

exports.isValidTransition = (currentStatus, nextStatus) => {
    return (
        BUG_STATUS_TRANSITIONS[currentStatus] &&
        BUG_STATUS_TRANSITIONS[currentStatus].includes(nextStatus)
    );
};
