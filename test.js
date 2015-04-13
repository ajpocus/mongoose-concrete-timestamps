var should = require('should'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('./index');

describe("mongoose-concrete-timestamps", function () {
  var db;
  var User;

  before(function(done) {
    mongoose.connect('mongodb://localhost/test');
    db = mongoose.connection;
    db.on('error', done);
    db.on('open', function () { done(); });
  });

  before(function() {
    var userSchema = new Schema({ name: String });
    userSchema.plugin(timestamps);
    User = mongoose.model('User', userSchema);
  });

  it("should add a createdAt timestamp on creation", function (done) {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      should(err).not.be.ok;
      should.exist(user.createdAt);
      done(err);
    });
  });

  it("should add an updatedAt timestamp after saving", function (done) {
    var user = new User({ name: "foobar" });
    user.save(function (err, user) {
      should(err).not.be.ok;
      should.exist(user.updatedAt);
      done(err);
    });
  });

  it("shouldn't override an explicitly set value for createdAt", function (done) {
    var user = new User({ name: "foobar" });
    var date = user.createdAt = new Date();
    // disable test timeout so we can delay the save
    this.timeout(0);
    setTimeout(saveUser, 200);

    function saveUser() {
      user.save(function (err, user) {
        should(err).not.be.ok;
        should.exist(user.createdAt);
        should.equal(user.createdAt.valueOf(), date.valueOf());
        done(err);
      });
    }
  });
});
