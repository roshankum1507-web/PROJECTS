import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import FormComponent from '../components/FormComponent';

const initialFormState = {
  companyName: '',
  roleTitle: '',
  location: '',
  status: 'applied',
  jobType: 'internship',
  applicationDate: '',
  salaryRange: '',
  applicationLink: '',
  notes: '',
};

const CreateItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/applications', formData);
      navigate('/');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to create application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container page-stack">
      {error && <section className="card state-card state-card--error">{error}</section>}
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Application"
        title="Create a new application"
        subtitle="Add company details, current status, and notes in a clean form." 
      />
    </main>
  );
};

export default CreateItem;
