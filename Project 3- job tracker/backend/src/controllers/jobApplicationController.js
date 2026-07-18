const JobApplication = require('../models/JobApplication');

const createJobApplication = async (req, res) => {
  try {
    const applicationDate = req.body.applicationDate || undefined;

    const application = await JobApplication.create({
      user: req.user._id,
      companyName: req.body.companyName,
      roleTitle: req.body.roleTitle,
      location: req.body.location,
      status: req.body.status,
      jobType: req.body.jobType,
      applicationDate,
      salaryRange: req.body.salaryRange,
      applicationLink: req.body.applicationLink,
      notes: req.body.notes,
    });

    res.status(201).json({
      success: true,
      message: 'Job application created successfully',
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating job application',
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const {
      search = '',
      status = '',
      jobType = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user._id,
    };

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { roleTitle: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const sortOptions = {};
    const allowedSortFields = ['createdAt', 'updatedAt', 'applicationDate', 'companyName', 'roleTitle', 'status'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeSortOrder = sortOrder === 'asc' ? 1 : -1;
    sortOptions[safeSortBy] = safeSortOrder;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);

    const totalCount = await JobApplication.countDocuments(query);
    const applications = await JobApplication.find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: 'Job applications fetched successfully',
      data: applications,
      meta: {
        totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job applications',
    });
  }
};

const getJobApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job application fetched successfully',
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job application',
    });
  }
};

const updateJobApplication = async (req, res) => {
  try {
    const application = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }

    application.companyName = req.body.companyName ?? application.companyName;
    application.roleTitle = req.body.roleTitle ?? application.roleTitle;
    application.location = req.body.location ?? application.location;
    application.status = req.body.status ?? application.status;
    application.jobType = req.body.jobType ?? application.jobType;
    application.applicationDate = req.body.applicationDate || application.applicationDate;
    application.salaryRange = req.body.salaryRange ?? application.salaryRange;
    application.applicationLink = req.body.applicationLink ?? application.applicationLink;
    application.notes = req.body.notes ?? application.notes;

    const updatedApplication = await application.save();

    res.status(200).json({
      success: true,
      message: 'Job application updated successfully',
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating job application',
    });
  }
};

const deleteJobApplication = async (req, res) => {
  try {
    const application = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job application deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting job application',
    });
  }
};

module.exports = {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
};
