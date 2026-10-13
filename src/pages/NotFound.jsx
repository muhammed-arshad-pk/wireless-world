import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="card empty-state">
        <h3>Page not found</h3>
        <p className="muted">That page doesn’t exist.</p>
        <Link className="btn btn-primary" to="/">Back to dashboard</Link>
      </div>
    </div>
  );
}
