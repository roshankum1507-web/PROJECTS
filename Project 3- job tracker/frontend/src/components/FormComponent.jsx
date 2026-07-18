const FormComponent = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  submitLabel,
  title,
  subtitle,
}) => {
  return (
    <section className="card form-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Application details</p>
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          <span>Company Name</span>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Google, TCS, Infosys"
            required
          />
        </label>

        <label>
          <span>Role Title</span>
          <input
            type="text"
            name="roleTitle"
            value={formData.roleTitle}
            onChange={handleChange}
            placeholder="Frontend Intern"
            required
          />
        </label>

        <label>
          <span>Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Bangalore / Remote"
            required
          />
        </label>

        <label>
          <span>Status</span>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label>
          <span>Job Type</span>
          <select name="jobType" value={formData.jobType} onChange={handleChange}>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </label>

        <label>
          <span>Application Date</span>
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Salary Range</span>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="₹25,000/month"
          />
        </label>

        <label>
          <span>Application Link</span>
          <input
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label className="form-grid__full">
          <span>Notes</span>
          <textarea
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Interview tips, referral details, follow-up reminders"
          />
        </label>

        <div className="form-grid__full form-actions">
          <button type="submit" className="button button--primary" disabled={loading}>
            {loading ? 'Saving...' : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormComponent;
