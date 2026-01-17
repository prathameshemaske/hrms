import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBugById } from '../../api/bugs.api';
import BugStatusWorkflow from "../../components/bugs/BugStatusWorkflow";
import BugComments from '../../components/bugs/BugComments';
import BugHistory from '../../components/bugs/BugHistory';
import LinkTestCase from '../../components/bugs/LinkTestCase';



const BugDetails = () => {
  const { id } = useParams();
  const [bug, setBug] = useState(null);

  useEffect(() => {
    const loadBug = async () => {
      const data = await getBugById(id);
      setBug(data);
    };
    loadBug();
  }, [id]);

  if (!bug) return <p>Loading...</p>;

  return (
    <div>
      <h2>{bug.title}</h2>

      <p><b>Status:</b> {bug.status}</p>
      <p><b>Severity:</b> {bug.severity}</p>
      <p><b>Priority:</b> {bug.priority}</p>
      <p><b>Description:</b> {bug.description}</p>
      <LinkTestCase bugId={id} />
      <BugComments bugId={id} />
      <BugHistory bugId={id} />
    </div>
  );
};

export default BugDetails;
