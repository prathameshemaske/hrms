const SummaryCards = ({ summary }) => {
  const cards = [
    { label: 'Test Cases', value: summary.total_test_cases },
    { label: 'Executions', value: summary.total_executions },
    { label: 'Pass %', value: summary.pass_percentage },
    { label: 'Open Bugs', value: summary.open_bugs },
  ];

  return (
    <div style={styles.container}>
      {cards.map((card) => (
        <div key={card.label} style={styles.card}>
          <h3>{card.value}</h3>
          <p>{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};
