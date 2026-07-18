import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import FormComponent from '../components/FormComponent';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    roleTitle: '',
    location: '',
    status: 'applied',
    jobType: 'internship',
    applicationDate: '',
    salaryRange: '',
    applicationLink: '',
    notes: '',
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await api.get(`/applications/${id}`);
        const application = response.data.data;
        setFormData({
          companyName: application.companyName || '',
          roleTitle: application.roleTitle || '',
          location: application.location || '',
          status: application.status || 'applied',
          jobType: application.jobType || 'internship',
          applicationDate: application.applicationDate ? application.applicationDate.slice(0, 10) : '',
          salaryRange: application.salaryRange || '',
          applicationLink: application.applicationLink || '',
          notes: application.notes || '',
        });
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Failed to load application');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/applications/${id}`, formData);
      navigate('/');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to update application');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container page-stack">
        <section className="card state-card">Loading application...</section>
      </main>
    );
  }

  return (
    <main className="container page-stack">
      {error && <section className="card state-card state-card--error">{error}</section>}
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={saving}
        submitLabel="Update Application"
        title="Edit application"
        subtitle="Update the record as your interview process moves forward."
      />
    </main>
  );
};

export default EditItem;
