exports.convertToCSV = (rows) => {
  if (!rows || rows.length === 0) return '';

  const headers = Object.keys(rows[0]).join(',');
  const values = rows.map(row =>
    Object.values(row)
      .map(val => `"${val ?? ''}"`)
      .join(',')
  );

  return [headers, ...values].join('\n');
};
