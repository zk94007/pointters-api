module.exports = (schema) => {
    schema.index({ userId: 1, name:1}, {unique:true});
    schema.index({ name: 1 }, {unique:true});
    schema.index({ userId: 1 });
};
