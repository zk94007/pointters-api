module.exports = (schema) => {
    schema.index({ userId: 1 });
    schema.index({ requestId: 1 });
};
