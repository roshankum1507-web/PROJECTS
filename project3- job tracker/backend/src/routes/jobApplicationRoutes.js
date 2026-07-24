const express = require('express');
const { body, param, query } = require('express-validator');
const {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require('../controllers/jobApplicationController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateMiddleware');

const router = express.Router();

const applicationValidationRules = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('roleTitle').trim().notEmpty().withMessage('Role title is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(['applied', 'interviewing', 'offer', 'rejected', 'accepted'])
    .withMessage('Invalid status value'),
  body('jobType')
    .optional({ checkFalsy: true })
    .isIn(['internship', 'full-time', 'part-time', 'contract'])
    .withMessage('Invalid job type value'),
  body('applicationDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Application date must be a valid date'),
  body('salaryRange').optional({ checkFalsy: true }).isString().withMessage('Salary range must be a string'),
  body('applicationLink').optional({ checkFalsy: true }).isURL().withMessage('Application link must be a valid URL'),
  body('notes').optional({ checkFalsy: true }).isString().withMessage('Notes must be a string'),
];

router.route('/')
  .post(protect, applicationValidationRules, validateRequest, createJobApplication)
  .get(
    protect,
    [
      query('status').optional({ checkFalsy: true }).isIn(['applied', 'interviewing', 'offer', 'rejected', 'accepted']),
      query('jobType').optional({ checkFalsy: true }).isIn(['internship', 'full-time', 'part-time', 'contract']),
      query('sortBy').optional().isString(),
      query('sortOrder').optional().isIn(['asc', 'desc']),
      query('search').optional().isString(),
    ],
    validateRequest,
    getJobApplications
  );

router.route('/:id')
  .get(
    protect,
    [param('id').isMongoId().withMessage('Invalid application id')],
    validateRequest,
    getJobApplicationById
  )
  .put(
    protect,
    [param('id').isMongoId().withMessage('Invalid application id')],
    applicationValidationRules,
    validateRequest,
    updateJobApplication
  )
  .delete(
    protect,
    [param('id').isMongoId().withMessage('Invalid application id')],
    validateRequest,
    deleteJobApplication
  );

module.exports = router;
