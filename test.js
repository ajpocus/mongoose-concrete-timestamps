var should = require('should'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('./index');

var userSchema = new Schema({
  name: String
}, { safe: true });
userSchema.plugin(timestamps);
var User = mongoose.model('User', userSchema);

describe("mongoose-concrete-timestamps", function () {
  it("should add a createdAt timestamp on creation", function (done) {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      if (err) { throw(err); }
      should.exist(user.createdAt);
      done();
    });
  });
  
  it("should add an updatedAt timestamp after saving", function (done) {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      if (err) { throw(err); }
      should.exist(user.updatedAt);
      done();
    });
  });
});
