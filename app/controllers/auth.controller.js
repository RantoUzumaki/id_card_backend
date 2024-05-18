import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { secret } from '../config/auth';

dotenv.config();

const User = db.user;
const Role = db.role;

export function signup(req, res) {
  const token = crypto.createHash('md5').update(Math.random().toString().substring(2)).digest('hex');

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    token: token
  });

  user
    .save()
    .then((user) => {
      Role.find({ name: { $in: req.body.role } })
        .then((roles) => {
          user.roles = roles.map((role) => role._id);
          user
            .save()
            .then(() => {
              res.status(201).json({
                success: {
                  message: 'Signup successful.'
                }
              });
              return;
            })
            .catch((err) => {
              if (err) {
                res.status(500).json({ error: err });
                return;
              }
            });
        })
        .catch((err) => {
          if (err) {
            res.status(500).json({ error: err });
            return;
          }
        });
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
    });
}

export function signIn(req, res) {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .then((resUser) => {
      var passwordIsValid = bcrypt.compareSync(req.body.password, resUser.password);

      if (!passwordIsValid) {
        res.status(401).json({ error: 'Wrong Password.' });
        return;
      }

      var token = jwt.sign({ id: resUser.id }, secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).json({
        success: {
          roles: resUser.roles[0].name.toUpperCase(),
          accessToken: token,
          user: req.body.username,
          message: 'Successfully signed in'
        }
      });
      return;
    })
    .catch(() => {
      res.status(500).json({ error: 'Try again after sometime.' });
      return;
    });
}

export function getDetails(req, res) {
  User.findOne({
    _id: req.userId
  })
    .populate('roles', '-__v')
    .then((resUser) => {
      res.status(200).json({
        success: {
          roles: resUser.roles[0].name.toUpperCase(),
          accessToken: req.headers['x-access-token'],
          user: req.body.username,
          message: 'Details fetched successfully'
        }
      });
      return;
    })
    .catch(() => {
      res.status(500).json({ error: 'Login again.' });
      return;
    });
}
