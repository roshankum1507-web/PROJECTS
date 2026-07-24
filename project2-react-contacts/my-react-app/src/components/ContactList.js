import React from 'react';
import ContactCard from './ContactCard';

function ContactList({ contacts }) {
  return (
    <div className="contact-list" aria-live="polite">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}

export default ContactList;
