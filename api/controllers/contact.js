import validator from 'validator';
import nodeMailer from 'nodemailer';

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  const validationErrors = [];
  const { name = '', email = '', message = '' } = req.body;
  let fromName;
  let fromEmail;
  if (!req.user) {
    if (validator.isEmpty(name)) validationErrors.push({ msg: 'Please enter your name' });
    if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  }
  if (validator.isEmpty(message)) validationErrors.push({ msg: 'Please enter your message.' });

  if (validationErrors.length) {
    res.status(409).send(validationErrors);
    return;
  }

  if (!req.user) {
    fromName = name;
    fromEmail = email;
  } else {
    fromName = req.user.username || '';
    fromEmail = req.user.email;
  }

  let transporter = nodeMailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const mailOptions = {
    to: 'abbensid@student.42.fr',
    from: `${fromName} <${fromEmail}>`,
    subject: 'Contact Form | Matcha',
    text: message
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      res.send('Email has been sent successfully!');
      return false;
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
        return transporter.sendMail(mailOptions);
      }
      res.send('Error sending the message. Please try again shortly.');
      return false;
    })
    .then((result) => {
      if (result) {
        res.send('Email has been sent successfully!');
        return false;
      }
    })
    .catch((err) => {
      res.send(`Error sending the message. Please try again shortly.\n ${err}`);
      return false;
    });
};
