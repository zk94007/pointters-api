module.exports = (schema) => {
    schema.index({ userId: 1 });
    schema.index({ commentId: 1 });
    schema.index({ commentId: 1, userId: 1 });
}
;
