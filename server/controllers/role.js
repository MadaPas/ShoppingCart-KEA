/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Role,
} = require('../models/Role');

const getAllRoles = async (req, res) => {
  await Role.find({}, (err, roles) => {
    if (err) res.status(500).send(err);
    res.status(200).json(roles);
  });
};

const getRole = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong Role id format. Try again.');
  }
  return Role.findById(req.params.id, (err, role) => {
    if (role === null || role.length === 0) {
      return res.status(404).json('No role found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(role);
  });
};

const addRole = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const prooductExists = await Role.findOne({ name });

  if (prooductExists) {
    return res.status(400).json('This role already exists.');
  }

  const role = await Role.create({
    name,
  });

  return res.status(201).json({
    name: role.name,
  });
});

const updateRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    const newRole = await Role.findById(req.params.id, (err, role) => {
      if (role === null || role.length === 0) {
        return res.status(404).json('No role found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, pr) => {
          if (error) return res.status(500).send(error);
          return res.send(pr);
        },
      );
    });
    return newRole;
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

const deleteRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await Role.findById(req.params.id, (err, role) => {
      if (role === null || role.length === 0) {
        return res.status(404).json('No role found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Role.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) return res.status(500).send(error);
          const response = {
            message: 'Role successfully deleted',
            id: pr._id,
          };
          return res.status(200).send(response);
        },
      );
    });
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

module.exports.getAllRoles = getAllRoles;
module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
