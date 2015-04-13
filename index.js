exports = module.exports = function concreteTimestamps(schema, options) {
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });
  
  schema.pre('save', function (next) {
    if (this.isNew && !this.createdAt) {
      this.createdAt = new Date();
    }
    
    this.updatedAt = new Date();
    next();
  });
};
