/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Role,
} = require('../models/Role');

const getAllRoles = async (req, res) => {
  try {
    Role.find({})
      .then(roles => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: roles,
      }))
      .catch(err => res.json({
        error: err,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

const getRole = (req, res) => Role.findById(req.params.id, (err, role) => {
  if (role === null || role.length === 0) {
    return res.status(404).json({
      message: 'No role found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: role,
  });
});

const addRole = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const exists = await Role.findOne({ name });

  if (exists) {
    return res.status(400).json({
      message: 'This role already exists.',
    });
  }

  const role = await Role.create(req.body);

  return res.status(200).json({
    message: 'Role created successfully.',
    data: role,
  });
});

const updateRole = async (req, res) => {
  try {
    await Role.findById(req.params.id, (err, role) => {
      if (role === null || role.length === 0) {
        return res.status(404).json({
          message: 'No role found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Role updated successfully.',
            data: pr,
          });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    await Role.findById(req.params.id, (err, role) => {
      if (role === null || role.length === 0) {
        return res.status(404).json({
          message: 'No role found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Role.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Role deleted successfully.',
            id: pr._id,
          });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

module.exports.getAllRoles = getAllRoles;
module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
