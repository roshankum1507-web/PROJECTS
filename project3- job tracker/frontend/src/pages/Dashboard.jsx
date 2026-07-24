import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [jobType, setJobType] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [meta, setMeta] = useState({ totalCount: 0, page: 1, limit: 10, totalPages: 0 });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/applications', {
        params: {
          search,
          status,
          jobType,
          sortBy,
          sortOrder,
          page: 1,
          limit: 20,
        },
      });

      setApplications(response.data.data);
      setMeta(response.data.meta);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, status, jobType, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Delete this application?');
    if (!shouldDelete) return;

    try {
      await api.delete(`/applications/${id}`);
      fetchApplications();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to delete application');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setJobType('');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  return (
    <main className="container dashboard">
      <section className="hero card">
        <div>
          <p className="eyebrow">Internship tracker</p>
          <h1>Manage applications like a real product.</h1>
          <p className="muted">
            Search by company or role, filter by status, and track your progress during placement season.
          </p>
        </div>
        <Link to="/applications/new" className="button button--primary">
          Add New Application
        </Link>
      </section>

      <section className="card filter-panel">
        <div className="filter-grid">
          <input
            type="text"
            placeholder="Search company, role, or location"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={jobType} onChange={(event) => setJobType(event.target.value)}>
            <option value="">All Job Types</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="createdAt">Sort by Created</option>
            <option value="applicationDate">Sort by Application Date</option>
            <option value="companyName">Sort by Company</option>
            <option value="roleTitle">Sort by Role</option>
            <option value="status">Sort by Status</option>
          </select>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <button className="button button--secondary" onClick={clearFilters} type="button">
            Clear Filters
          </button>
        </div>
      </section>

      {loading && <section className="card state-card">Loading applications...</section>}
      {error && <section className="card state-card state-card--error">{error}</section>}

      {!loading && !error && applications.length === 0 && (
        <section className="card empty-state">
          <h2>No applications yet</h2>
          <p className="muted">Create your first application to start tracking progress.</p>
          <Link to="/applications/new" className="button button--primary">
            Create Application
          </Link>
        </section>
      )}

      {!loading && applications.length > 0 && (
        <section className="applications-grid">
          {applications.map((application) => (
            <article className="card application-card" key={application._id}>
              <div className="application-card__header">
                <div>
                  <p className="eyebrow">{application.status}</p>
                  <h3>{application.companyName}</h3>
                </div>
                <span className={`status-badge status-badge--${application.status}`}>
                  {application.status}
                </span>
              </div>

              <p className="application-card__role">{application.roleTitle}</p>
              <p className="muted">{application.location}</p>

              <div className="application-meta">
                <span>{application.jobType}</span>
                <span>{new Date(application.applicationDate).toLocaleDateString()}</span>
              </div>

              {application.notes && <p className="application-card__notes">{application.notes}</p>}

              <div className="card-actions">
                <Link to={`/applications/${application._id}/edit`} className="button button--secondary">
                  Edit
                </Link>
                <button
                  className="button button--danger"
                  type="button"
                  onClick={() => handleDelete(application._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <section className="card summary-card">
        <p>
          Total Records: <strong>{meta.totalCount}</strong>
        </p>
        <p>
          Page {meta.page} of {meta.totalPages || 1}
        </p>
      </section>
    </main>
  );
};

export default Dashboard;
