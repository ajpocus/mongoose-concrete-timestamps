# mongoose-concrete-timestamps
Saves visible, non-virtual timestamps to Mongoose models. Intended as a replacement for mongoose-timestamp.

## Intro

You can install mongoose-concrete-timestamps with npm:

    npm install mongoose-concrete-timestamps

This module serves a simple purpose: write a createdAt timestamp on the first save(), and update the updatedAt timestamp on each save().

## Usage

Using this module is super-simple. Just require the module:

    var timestamps = require('mongoose-concrete-timestamps');

And plug it into your schema:

    var userSchema = new mongoose.Schema({ name: String });
    userSchema.plugin(timestamps);
    var User = mongoose.model('User', userSchema);

    var user = new User({ name: "Foo" });
    user.save(function (err, user) {
      // user.createdAt will be set to Date.now, at the time of the save() call.
      // The same goes for user.updatedAt, except it's updated on each save().
    });

## Testing

To run the tests for this module, make sure you have `mocha` installed:

    npm install -g mocha

Once installed, you can run the tests by invoking `mocha` from the project's root.
