import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTestSuite } from '../../api/testSuites.api';

const TestSuiteCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const suite = await createTestSuite({ name, description });
    navigate(`/test-suites/${suite.id}`);
  };

  return (
    <div>
      <h2>Create Test Suite</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Suite name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TestSuiteCreate;
