import bCrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  birthday: Date,
  gender: String,
  sexualPreference: {
    type: String,
    enum: ['heterosexual', 'homosexual', 'bisexual', 'other'],
    default: 'heterosexual'
  },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  fameRating: mongoose.Decimal128,
  biography: String,
  likedBy: [String],
  seenBy: [String],
  interests: [String],
  lastSeenNotification: Date,

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [48, 2.3] // coordinates 42
    }
  },

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  linkedin: String,
  tokens: Array,

  picture: String,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bCrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bCrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bCrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
