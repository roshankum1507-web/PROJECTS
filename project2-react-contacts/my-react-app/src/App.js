import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const CONTACTS_STORAGE_KEY = 'react-contact-cards-manager.contacts';
const THEME_STORAGE_KEY = 'react-contact-cards-manager.theme';

const getStoredContacts = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawContacts = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!rawContacts) {
      return [];
    }

    const parsedContacts = JSON.parse(rawContacts);
    return Array.isArray(parsedContacts) ? parsedContacts : [];
  } catch (error) {
    return [];
  }
};

const getStoredTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === 'dark' ? 'dark' : 'light';
};

function App() {
  const [contacts, setContacts] = useState(getStoredContacts);
  const [theme, setTheme] = useState(getStoredTheme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleAddContact = (newContact) => {
    const contactWithId = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...newContact
    };

    setContacts((currentContacts) => [contactWithId, ...currentContacts]);
  };

  const filteredContacts = contacts.filter((contact) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    if (!normalizedSearch) {
      return true;
    }

    return (
      contact.fullName.toLowerCase().includes(normalizedSearch) ||
      contact.company.toLowerCase().includes(normalizedSearch)
    );
  });

  const showEmptyState = contacts.length === 0;
  const showNoResults = contacts.length > 0 && filteredContacts.length === 0;
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div className="app-shell">
      <main className="app-container">
        <section className="hero-card">
          <div className="hero-topbar">
            <p className="eyebrow">React SPA</p>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(nextTheme)}
              aria-label={`Switch to ${nextTheme} theme`}
            >
              {nextTheme === 'dark' ? 'Dark Theme' : 'Light Theme'}
            </button>
          </div>

          <div className="hero-copy">
            <h1>React Contact Cards Manager</h1>
            <p className="hero-text">
              Add digital contact cards, search them in real time, and keep everything organized in one clean workspace.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Add a contact</h2>
              <p>Save a new business card and it appears instantly below.</p>
            </div>
          </div>

          <ContactForm onAddContact={handleAddContact} />
        </section>

        <section className="panel">
          <div className="panel-header panel-header-space">
            <div>
              <h2>Contacts</h2>
              <p>{contacts.length} saved contact{contacts.length === 1 ? '' : 's'}</p>
            </div>

            <label className="search-field" htmlFor="searchContacts">
              <span>Search</span>
              <input
                id="searchContacts"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name or company"
              />
            </label>
          </div>

          {showEmptyState ? (
            <div className="empty-state">
              <h3>No contacts yet</h3>
              <p>Add your first contact card using the form above.</p>
            </div>
          ) : showNoResults ? (
            <div className="empty-state">
              <h3>No results found</h3>
              <p>Try a different search term for name or company.</p>
            </div>
          ) : (
            <ContactList contacts={filteredContacts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
