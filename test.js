var should = require('should'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('./index');

describe("mongoose-concrete-timestamps", function () {
  var userSchema = new Schema({
    name: String
  }, { safe: true });
  userSchema.plugin(timestamps);
  var User = mongoose.model('User', userSchema);
  it("should add a createdAt timestamp on creation", function () {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      if (err) { console.log(err); throw(err); return done(err); }
      console.log(user);
      should.exist(user.createdAt);
    });
  });
  
  it("should add an updatedAt timestamp after saving", function () {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      if (err) { throw(err); return done(err); }
      console.log(user);
      should.exist(user.updatedAt);
    });
  });
});
