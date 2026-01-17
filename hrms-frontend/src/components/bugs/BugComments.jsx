import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import {
  getBugComments,
  addBugComment,
} from '../../api/bugComments.api';

const BugComments = ({ bugId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const loadComments = async () => {
    const data = await getBugComments(bugId);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [bugId]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addBugComment(bugId, {
      comment: text,
      commented_by: user.id,
    });

    setText('');
    loadComments();
  };

  return (
    <div style={styles.container}>
      <h4>Comments</h4>

      <div>
        {comments.map((c) => (
          <div key={c.id} style={styles.comment}>
            <b>{c.commented_by_name || 'User'}:</b>
            <p>{c.comment}</p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <form onSubmit={submitComment}>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BugComments;

const styles = {
  container: {
    marginTop: '30px',
  },
  comment: {
    background: '#f5f5f5',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
  },
};
