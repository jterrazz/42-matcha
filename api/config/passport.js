import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import _ from 'lodash';
import moment from 'moment';
import User from '../models/User';

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const { Strategy: FortyTwoStrategy } = require('passport-42');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

function randomUsername(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Sign in using username and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { msg: `Username ${username} not found.` });
    }
    if (!user.password) {
      return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid username or password.' });
    });
  });
}));

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findById(req.user.id, (err, user) => {
        if (err) { return done(err); }
        user.facebook = profile.id;
        user.tokens.push({ kind: 'facebook', accessToken });
        user.firstName = user.firstName || profile.name.givenName;
        user.lastName = user.lastName || profile.name.familyName;
        user.gender = user.gender || profile._json.gender;
        user.picture = user.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
        user.save((err) => {
          done(err, user);
        });
      });
    });
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          existingEmailUser.facebook = profile.id;
          existingEmailUser.tokens.push({ kind: 'facebook', accessToken });
          existingEmailUser.firstName = existingEmailUser.firstName || profile.name.givenName;
          existingEmailUser.lastName = existingEmailUser.lastName || profile.name.familyName;
          existingEmailUser.gender = existingEmailUser.gender || profile._json.gender;
          existingEmailUser.picture = existingEmailUser.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          existingEmailUser.save((err) => {
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.username = randomUsername(10);
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          user.gender = profile._json.gender;
          user.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with GitHub.
 */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
  passReqToCallback: true,
  scope: ['user:email']
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ github: profile.id }, (err, existingUser) => {
      if (existingUser) {
        done(err, existingUser);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.github = profile.id;
          user.tokens.push({ kind: 'github', accessToken });
          user.fisrtName = user.fisrtName || profile.displayName;
          user.picture = user.picture || profile._json.avatar_url;
          user.save((err) => {
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ github: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          existingEmailUser.github = profile.id;
          existingEmailUser.tokens.push({ kind: 'github', accessToken });
          existingEmailUser.fisrtName = existingEmailUser.fisrtName || profile.displayName;
          existingEmailUser.picture = existingEmailUser.picture || profile._json.avatar_url;
          existingEmailUser.save((err) => {
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.email = _.get(_.orderBy(profile.emails, ['primary', 'verified'], ['desc', 'desc']), [0, 'value'], null);
          user.github = profile.id;
          user.tokens.push({ kind: 'github', accessToken });
          user.username = randomUsername(10);
          user.firstName = profile.displayName;
          user.picture = profile._json.avatar_url;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with Twitter.
 */
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/twitter/callback`,
  passReqToCallback: true
}, (req, accessToken, tokenSecret, profile, done) => {
  if (req.user) {
    User.findOne({ twitter: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        done(err, existingUser);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.twitter = profile.id;
          user.tokens.push({ kind: 'twitter', accessToken, tokenSecret });
          user.firstName = user.firstName || profile.displayName;
          user.picture = user.picture || profile._json.profile_image_url_https;
          user.save((err) => {
            if (err) { return done(err); }
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ twitter: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      user.email = `${profile.username}@twitter.com`;
      user.twitter = profile.id;
      user.tokens.push({ kind: 'twitter', accessToken, tokenSecret });
      user.username = randomUsername(10);
      user.firstName = profile.displayName;
      user.picture = profile._json.profile_image_url_https;
      user.save((err) => {
        done(err, user);
      });
    });
  }
}));

/**
 * Sign in with Google.
 */
const googleStrategyConfig = new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, params, profile, done) => {
  if (req.user) {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser && (existingUser.id !== req.user.id)) {
        done(err, existingUser);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          user.firstName = user.firstName || profile._json.given_name;
          user.lastName = user.lastName || profile._json.family_name;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || profile._json.picture;
          user.save((err) => {
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          existingEmailUser.google = profile.id;
          existingEmailUser.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          existingEmailUser.firstName = existingEmailUser.firstName || profile._json.given_name;
          existingEmailUser.lastName = existingEmailUser.lastName || profile._json.family_name;
          existingEmailUser.gender = existingEmailUser.gender || profile._json.gender;
          existingEmailUser.picture = existingEmailUser.picture || profile._json.picture;
          existingEmailUser.save((err) => {
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          user.username = randomUsername(10);
          user.firstName = profile._json.given_name;
          user.lastName = profile._json.family_name;
          user.gender = profile._json.gender;
          user.picture = profile._json.picture;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
});
passport.use('google', googleStrategyConfig);
refresh.use('google', googleStrategyConfig);

/**
 * Sign in with LinkedIn.
 */
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_ID,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/linkedin/callback`,
  scope: ['r_liteprofile', 'r_emailaddress'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ linkedin: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        done(err, existingUser);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken });
          user.firstName = user.firstName || profile.name.givenName;
          user.lastName = user.lastName || profile.name.familyName;
          user.picture = user.picture || profile.photos[3].value;
          user.save((err) => {
            if (err) { return done(err); }
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ linkedin: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          existingEmailUser.linkedin = profile.id;
          existingEmailUser.tokens.push({ kind: 'linkedin', accessToken });
          existingEmailUser.firstName = existingEmailUser.firstName || profile.name.givenName;
          existingEmailUser.lastName = existingEmailUser.lastName || profile.name.familyName;
          existingEmailUser.picture = existingEmailUser.picture || profile.photos[3].value;
          existingEmailUser.save((err) => {
            if (err) { return done(err); }
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken });
          user.email = profile.emails[0].value;
          user.username = randomUsername(10);
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          user.picture = user.picture || profile.photos[3].value;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with Intra42.
 */
passport.use(new FortyTwoStrategy({
  clientID: process.env.FORTYTWO_APP_ID,
  clientSecret: process.env.FORTYTWO_APP_SECRET,
  callbackURL: '/auth/42/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ intra42: profile.id }, (err, existingUser) => {
    if (err) { return done(err); }
    if (existingUser) {
      return done(null, existingUser);
    }
    User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
      if (err) { return done(err); }
      if (existingEmailUser) {
        User.findById(existingEmailUser.id, (err, user) => {
          if (err) { return done(err); }
          user.intra42 = profile.id;
          user.tokens.push({ kind: 'intra42', accessToken });
          user.firstName = user.firstName || profile.name.givenName;
          user.lastName = user.lastName || profile.name.familyName;
          user.picture = user.picture || profile.photos[0].value;
          user.save((err) => {
            if (err) { return done(err); }
            done(err, user);
          });
        });
      } else {
        const user = new User();
        user.intra42 = profile.id;
        user.tokens.push({ kind: 'intra42', accessToken });
        user.email = profile.emails[0].value;
        user.username = randomUsername(10);
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.picture = user.picture || profile.photos[0].value;
        user.save((err) => {
          done(err, user);
        });
      }
    });
  });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized !!');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/')[2];
  const token = req.user.tokens.find((token) => token.kind === provider);
  if (token) {
    if (token.accessTokenExpires && moment(token.accessTokenExpires).isBefore(moment().subtract(1, 'minutes'))) {
      if (token.refreshToken) {
        if (token.refreshTokenExpires && moment(token.refreshTokenExpires).isBefore(moment().subtract(1, 'minutes'))) {
          res.redirect(`/auth/${provider}`);
        } else {
          refresh.requestNewAccessToken(`${provider}`, token.refreshToken, (err, accessToken, refreshToken, params) => {
            User.findById(req.user.id, (err, user) => {
              user.tokens.some((tokenObject) => {
                if (tokenObject.kind === provider) {
                  tokenObject.accessToken = accessToken;
                  if (params.expires_in) tokenObject.accessTokenExpires = moment().add(params.expires_in, 'seconds').format();
                  return true;
                }
                return false;
              });
              req.user = user;
              user.markModified('tokens');
              user.save((err) => {
                if (err) console.log(err);
                next();
              });
            });
          });
        }
      } else {
        res.redirect(`/auth/${provider}`);
      }
    } else {
      next();
    }
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
