const User = require('../models/User');
const JobApplication = require('../models/JobApplication');

const seedUsers = [
  { name: 'Test User 3', email: 'testuser3@example.com', password: '123456' },
  { name: 'Test User 4', email: 'testuser4@example.com', password: '123456' },
  { name: 'Test User 5', email: 'testuser5@example.com', password: '123456' },
  { name: 'Test User 6', email: 'testuser6@example.com', password: '123456' },
  { name: 'Test User 7', email: 'testuser7@example.com', password: '123456' },
  { name: 'Test User 8', email: 'testuser8@example.com', password: '123456' },
  { name: 'Test User 9', email: 'testuser9@example.com', password: '123456' },
  { name: 'Test User 10', email: 'testuser10@example.com', password: '123456' },
  { name: 'Test User 11', email: 'testuser11@example.com', password: '123456' },
  { name: 'Test User 12', email: 'testuser12@example.com', password: '123456' },
  { name: 'Test User 13', email: 'testuser13@example.com', password: '123456' },
];

const seedApplications = [
  {
    email: 'testuser4@example.com',
    application: {
      companyName: 'Google',
      roleTitle: 'Frontend Intern',
      location: 'Remote',
      status: 'applied',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹25,000/month',
      applicationLink: 'https://careers.google.com',
      notes: 'Resume shortlisted',
    },
  },
  {
    email: 'testuser4@example.com',
    application: {
      companyName: 'Microsoft',
      roleTitle: 'Software Engineer Intern',
      location: 'Hyderabad',
      status: 'interviewing',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹30,000/month',
      applicationLink: 'https://careers.microsoft.com',
      notes: 'Technical round scheduled',
    },
  },
  {
    email: 'testuser4@example.com',
    application: {
      companyName: 'Amazon',
      roleTitle: 'Backend Intern',
      location: 'Bangalore',
      status: 'offer',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹28,000/month',
      applicationLink: 'https://amazon.jobs',
      notes: 'Offer received, awaiting decision',
    },
  },
  {
    email: 'testuser9@example.com',
    application: {
      companyName: 'TCS',
      roleTitle: 'Junior Developer Intern',
      location: 'Remote',
      status: 'applied',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹18,000/month',
      applicationLink: 'https://www.tcs.com/careers',
      notes: 'Applied through the campus portal',
    },
  },
  {
    email: 'testuser10@example.com',
    application: {
      companyName: 'Oracle',
      roleTitle: 'Backend Engineering Intern',
      location: 'Bangalore',
      status: 'interviewing',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹34,000/month',
      applicationLink: 'https://www.oracle.com/careers/',
      notes: 'HR round completed',
    },
  },
  {
    email: 'testuser11@example.com',
    application: {
      companyName: 'IBM',
      roleTitle: 'Full Stack Intern',
      location: 'Hybrid',
      status: 'offer',
      jobType: 'internship',
      applicationDate: '2026-07-18',
      salaryRange: '₹36,000/month',
      applicationLink: 'https://www.ibm.com/careers',
      notes: 'Offer received after technical interview',
    },
  },
];

const seedDatabase = async () => {
  const createdUsers = {};

  for (const userData of seedUsers) {
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      try {
        user = await User.create(userData);
      } catch (error) {
        if (error && error.code === 11000) {
          user = await User.findOne({ email: userData.email });
        } else {
          throw error;
        }
      }
    }

    createdUsers[userData.email] = user;
  }

  for (const record of seedApplications) {
    const user = createdUsers[record.email];
    if (!user) {
      continue;
    }

    const existingApplication = await JobApplication.findOne({
      user: user._id,
      companyName: record.application.companyName,
    });

    if (!existingApplication) {
      try {
        await JobApplication.create({
          user: user._id,
          ...record.application,
        });
      } catch (error) {
        if (!error || error.code !== 11000) {
          throw error;
        }
      }
    }
  }

  console.log('Seed data checked: demo accounts and sample applications are ready');
};

module.exports = seedDatabase;