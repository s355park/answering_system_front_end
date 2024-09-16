import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/query', { query });
      setResponse(res.data.answer);
    } catch (err) {
      setError('Error: Unable to fetch the answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI-Powered Query Interface</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            required
          />
          <button type="submit" disabled={loading}>Ask</button>
        </form>
        {loading && <p>Loading...</p>}
        {response && <div className="response">{response}</div>}
        {error && <div className="error">{error}</div>}
      </header>
    </div>
  );
}

export default App;
