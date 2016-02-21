// Import custom Mongoose setup
var mongoose = require('./_mongoosedb'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

// Create schema
var userSchema = new mongoose.Schema({
  "name": String,
  "username": {
    type: String,
    required: true,
    index: {
      unique: true
    },
    dropDups: true
  },
  "password": {
    type: String,
    required: true
  },
}, {
  collection: 'User',
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Create model if it doesn't already exist
module.exports = mongoose.model('User', userSchema);
