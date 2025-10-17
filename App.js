import React, {useEffect, useState} from 'react';
import PollList from './components/PollList';
import PollChart from './components/PollChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_BASE = "https://68eb4b0976b3362414cd43c6.mockapi.io/polls";

function App() {
  const [polls, setPolls] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setPolls(data);
      if (data.length > 0) setSelected(data[0]);
    } catch (err) {
      console.error('Fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    const p = polls.find(x => x.id === id);
    setSelected(p);
  };

  const handleVote = async (index) => {
    if (!selected) return;
    const updated = { ...selected };
    const votes = Array.isArray(updated.votes) ? [...updated.votes] : Array(updated.options.length).fill(0);
    votes[index] = (votes[index] || 0) + 1;
    updated.votes = votes;

    setSelected(updated);
    setPolls(polls.map(p => p.id === updated.id ? updated : p));

    try {
      await fetch(API_BASE + '/' + updated.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error('Vote update failed', err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">QuickPoll — Poll & Voting Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <PollList polls={polls} onSelect={handleSelect} loading={loading} />
        </div>
        <div className="col-md-8">
          {selected ? (
            <div className="card p-3 shadow-sm">
              <h5>{selected.question}</h5>
              <div className="my-3">
                {selected.options && selected.options.map((opt, i) => (
                  <button key={i} className="btn btn-outline-primary m-1" onClick={() => handleVote(i)}>
                    {opt}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <PollChart options={selected.options} votes={selected.votes} />
              </div>
            </div>
          ) : (
            <div className="card p-3">No poll selected.</div>
          )}
        </div>
      </div>
      <footer className="text-center mt-4 text-muted">
        QuickPoll — Team: Raunak, Jinay | Subject: Web Technologies-ll
      </footer>
    </div>
  );
}

export default App;
