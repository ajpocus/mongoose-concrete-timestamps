exports = module.exports = function concreteTimestamps(schema, options) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.createdAt= new Date();
    } else {
      this.updatedAt = new Date();
    }
    next();
  });
};
