import _ from 'lodash';
import crypto from 'crypto';
import nodeMailer from 'nodemailer';
import { promisify } from 'util';
import passport from 'passport';
import validator from 'validator';
import mailChecker from 'mailchecker';
import User from '../models/User';

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.status(401).send('Unauthorized!!');
};

/**
 * POST /login
 * Sign in using username and password.
 */
exports.postLogin = (req, res, next) => {
  const { username = '', password = '' } = req.body;
  const validationErrors = [];
  if (!validator.isLength(username, { min: 5, max: 20 })) validationErrors.push({ msg: 'username must be at Between 8 and 20 characters long.' });
  if (!validator.isLength(password, { min: 5, max: 20 })) validationErrors.push({ msg: 'Password must be at Between 8 and 20 characters long.' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      res.status(409).send(info);
    } else {
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.send('Success! You are logged in.');
      });
    }
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.status(200).send('Success! You are logged out.');
  });
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  const {
    email = '',
    username = '',
    firstName = '',
    lastName = '',
    password = '',
    confirmPassword = ''
  } = req.body;

  if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(username, { min: 5, max: 20 })) validationErrors.push({ msg: 'Username must be at Between 8 and 20 characters long.' });
  if (!validator.isLength(firstName, { min: 5, max: 20 })) validationErrors.push({ msg: 'firstName must be at Between 8 and 20 characters long.' });
  if (!validator.isLength(lastName, { min: 5, max: 20 })) validationErrors.push({ msg: 'lastName must be at Between 8 and 20 characters long.' });
  if (!validator.isLength(password, { min: 10, max: 20 })) validationErrors.push({ msg: 'Password must be at Between 10 and 20 characters long.' });
  if (password !== confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }
  const emailValid = validator.normalizeEmail(email, { gmail_remove_dots: false });

  const user = new User({
    email: emailValid,
    username,
    password,
    firstName,
    lastName
  });

  User.findOne({ $or: [{ email: emailValid }, { username: { $regex: new RegExp(username, 'i') } }] }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      if (existingUser.username
        && existingUser.username.toLowerCase() === username.toLowerCase()) {
        res.status(409).send('Account with that username already exists.');
      } else res.status(409).send('Account with that email address already exists.');
      return;
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.send('Success! Account Created!');
      });
    });
  });
};

/**
 * GET /account
 * Profile Infos.
 */
exports.getAccount = (req, res) => {
  const user = {
    email: req.user.email,
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    sexualPreference: req.user.sexualPreference,
    seenBy: req.user.seenBy,
    interests: req.user.interests,
    likedBy: req.user.likedBy,
    location: req.user.location,
    facebook: req.user.facebook,
    github: req.user.github,
    linkedin: req.user.linkedin,
    twitter: req.user.twitter
  };
  res.send(user);
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    if (user.email !== req.body.email) user.emailVerified = false;
    user.location = { type: 'Point', coordinates: [44, 43] };
    user.email = req.body.email || '';
    user.username = req.body.username || '';
    user.firstName = req.body.firstName || '';
    user.lastName = req.body.lastName || '';
    user.birthday = req.body.birthday || '';
    user.sexualPreference = req.body.sexualPreference || '';
    user.fameRating = req.body.fameRating || 4.3;
    user.gender = req.body.gender || '';
    user.interests = req.body.interests.split('#').filter((x) => x) || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address or username you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  const validationErrors = [];
  const { password = '', confirmPassword = '' } = req.body;
  if (!validator.isLength(password, { min: 10, max: 20 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (password !== confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.password = password;
    user.save((err) => {
      if (err) { return next(err); }
      res.send('Password has been changed.');
      return false;
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    res.send('Your account has been deleted.');
  });
};

/**
 * POST /account/unlink
 * Unlink OAuth provider.
 */
exports.postOauthUnlink = (req, res, next) => {
  const validationErrors = [];
  const { provider = '' } = req.body;
  const providers = ['facebook', 'github', 'twitter', 'google', 'linkedin', '42'];
  if (!providers.includes(provider)) validationErrors.push({ msg: 'provider not found' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter((token) =>
      token.kind !== provider.toLowerCase());
    if (
      !(user.email && user.password)
      && tokensWithoutProviderToUnlink.length === 0
    ) {
      res.status(409).send(`The ${_.startCase(_.toLower(provider))} account cannot be unlinked without another form of login enabled.`
          + ' Please link another account or add an email address and password.');
      return;
    }
    user.tokens = tokensWithoutProviderToUnlink;
    user.save((err) => {
      if (err) { return next(err); }
      res.send(`${_.startCase(_.toLower(provider))} account has been unlinked.`);
      return false;
    });
  });
};

/**
 * GET /reset/:token
 * Check token Reset Password.
 */
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  const validationErrors = [];
  if (!validator.isHexadecimal(req.params.token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        res.status(409).send('Password reset token is invalid or has expired.');
        return;
      }
      res.send('good token :)');
    });
};

/**
 * POST /account/verify
 * Verify email address
 */
exports.postVerifyEmailToken = (req, res, next) => {
  const { token = '' } = req.body;
  if (req.user.emailVerified) {
    res.send('The email address has been verified.');
    return;
  }

  const validationErrors = [];
  if ((token && (!validator.isHexadecimal(token))) || !token) validationErrors.push({ msg: 'Invalid Token. Please retry.' });
  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  if (token === req.user.emailVerificationToken) {
    User
      .findOne({ email: req.user.email })
      .then((user) => {
        if (!user) {
          res.status(409).send('There was an error in loading your profile.');
          return;
        }
        user.emailVerificationToken = '';
        user.emailVerified = true;
        user = user.save();
        res.send('Thank you for verifying your email address.');
        return false;
      })
      .catch((error) => {
        res.status(409).send(`There was an error when updating your profile. Please try again later.\n ${error}`);
        return false;
      });
  } else {
    res.status(409).send('email address token is invalid.');
    return false;
  }
};

/**
 * GET /account/verify
 * Verify email address
 */
exports.getVerifyEmail = (req, res, next) => {
  if (req.user.emailVerified) {
    res.send('The email address has been verified.');
    return;
  }

  if (!mailChecker.isValid(req.user.email)) {
    res.status(409).send('The email address is invalid or disposable and can not be verified. Please update your email address and try again.');
    return;
  }

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) => {
    User
      .findOne({ email: req.user.email })
      .then((user) => {
        user.emailVerificationToken = token;
        user = user.save();
      });
    return token;
  };

  const sendVerifyEmail = (token) => {
    let transporter = nodeMailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: req.user.email,
      from: 'matcha@42.fr',
      subject: 'Please verify your email address on matcha',
      text: `Thank you for registering with matcha.\n\n
        This verify your email address please click on the following link, or paste this into your browser:\n\n
        http://${req.headers.host}/account/verify/${token}\n\n
        \n\n
        Thank you!`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.send(`An e-mail has been sent to ${req.user.email} with further instructions.`);
      })
      .catch((err) => {
        if (err.message === 'self signed certificate in certificate chain') {
          transporter = nodeMailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          return transporter.sendMail(mailOptions)
            .then(() => {
              res.send(`An e-mail has been sent to ${req.user.email} with further instructions.`);
            });
        }
        res.send('Error sending the email verification message. Please try again shortly.');
        return false;
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendVerifyEmail)
    .catch(next);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  const validationErrors = [];
  const { password = '', confirmPassword = '', token = '' } = req.body;
  if (!validator.isLength(password, { min: 10, max: 20 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (password !== confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
  if (!validator.isHexadecimal(token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  const resetPassword = () =>
    User
      .findOne({ passwordResetToken: token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          res.status(409).send('Password reset token is invalid or has expired.');
          return;
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(() => new Promise((resolve, reject) => {
          req.logIn(user, (err) => {
            if (err) { return reject(err); }
            resolve(user);
          });
        }));
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) { return; }
    let transporter = nodeMailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'matcha@42.fr',
      subject: 'Your matcha password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.send('Success! Your password has been changed.');
      })
      .catch((err) => {
        if (err.message === 'self signed certificate in certificate chain') {
          transporter = nodeMailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          return transporter.sendMail(mailOptions)
            .then(() => {
              res.send('Success! Your password has been changed.');
            });
        }
        res.send(`Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.\n ${err}`);
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .catch((err) => next(err));
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
  const validationErrors = [];
  const { username = '' } = req.body;
  if (!validator.isLength(username, { min: 5, max: 20 })) validationErrors.push({ msg: 'Please enter a valid username.' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) =>
    User
      .findOne({ username: { $regex: new RegExp(username, 'i') } })
      .then((user) => {
        if (!user) {
          res.status(409).send('Account with that username does not exist.');
        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    let transporter = nodeMailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'matcha@42.fr',
      subject: 'Reset your password on matcha',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.send(`An e-mail has been sent to ${user.email} with further instructions.`);
      })
      .catch((err) => {
        if (err.message === 'self signed certificate in certificate chain') {
          transporter = nodeMailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          return transporter.sendMail(mailOptions)
            .then(() => {
              res.send(`An e-mail has been sent to ${user.email} with further instructions.`);
            });
        }
        res.send(`Error sending the password reset message. Please try again shortly.\n ${err}`);
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .catch(next);
};
