import React from 'react';

export default function PollList({ polls, onSelect, loading }) {
  if (loading) return <div className="card p-3">Loading polls...</div>;
  return (
    <div className="card p-3 shadow-sm">
      <h6>Available Polls</h6>
      <ul className="list-group list-group-flush">
        {polls.length === 0 && <li className="list-group-item">No polls found.</li>}
        {polls.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div style={{cursor: 'pointer'}} onClick={() => onSelect(p.id)}>{p.question}</div>
            <span className="badge bg-primary rounded-pill">{p.votes ? p.votes.reduce((a,b)=>a+b,0) : 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
