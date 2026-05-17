import React from 'react';

function ContactCard({ contact }) {
  return (
    <article className="contact-card">
      <div className="contact-card__avatar-wrap">
        <img
          className="contact-card__avatar"
          src={contact.avatarUrl}
          alt={`${contact.fullName} avatar`}
        />
      </div>

      <div className="contact-card__body">
        <div>
          <h3>{contact.fullName}</h3>
          <p className="contact-card__role">
            {contact.jobTitle} at {contact.company}
          </p>
        </div>

        <p className="contact-card__bio">{contact.bio}</p>

        <div className="contact-card__details">
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </article>
  );
}

export default ContactCard;
