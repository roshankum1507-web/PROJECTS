import React, { useState } from 'react';

const initialFormState = {
  fullName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  bio: '',
  avatarUrl: ''
};

const placeholderAvatar = 'https://via.placeholder.com/300x300.png?text=Avatar';

function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedContact = {
      fullName: formData.fullName.trim(),
      jobTitle: formData.jobTitle.trim(),
      company: formData.company.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      avatarUrl: formData.avatarUrl.trim() || placeholderAvatar
    };

    onAddContact(normalizedContact);
    setFormData(initialFormState);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Full name</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="name"
            required
          />
        </label>

        <label>
          <span>Job title</span>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="job"
            required
          />
        </label>

        <label>
          <span>Company</span>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="company name"
            required
          />
        </label>

        <label>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="phone no."
            required
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
        </label>

        <label className="full-width">
          <span>Avatar URL</span>
          <input
            type="url"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            placeholder="image link"
          />
        </label>

        <label className="full-width">
          <span>Short bio</span>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short description about this person"
            rows="4"
            required
          />
        </label>
      </div>

      <button className="submit-button" type="submit">
        Add Contact Card
      </button>
    </form>
  );
}

export default ContactForm;
