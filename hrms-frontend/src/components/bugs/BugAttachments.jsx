import { useEffect, useState } from 'react';
import {
  uploadBugAttachment,
  getBugAttachments,
} from '../../api/bugAttachments.api';

const BugAttachments = ({ bugId }) => {
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAttachments = async () => {
    try {
      const data = await getBugAttachments(bugId);
      setAttachments(data);
    } catch (err) {
      console.error('Failed to load attachments', err);
    }
  };

  useEffect(() => {
    loadAttachments();
  }, [bugId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      await uploadBugAttachment(bugId, file);
      setFile(null);
      loadAttachments();
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h4>Attachments</h4>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div style={styles.list}>
        {attachments.map((att) => (
          <div key={att.id} style={styles.item}>
            <a
              href={att.file_url}
              target="_blank"
              rel="noreferrer"
            >
              {att.file_name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BugAttachments;

const styles = {
  container: {
    marginTop: '30px',
  },
  list: {
    marginTop: '15px',
  },
  item: {
    marginBottom: '8px',
  },
};
