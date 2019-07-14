module.exports = (schema) => {
    schema.index({ userId: 1 });
    schema.index({ orderId: 1, serviceId:1}, {unique:true});
    schema.index({ orderId: 1 }, {unique:true});
    schema.index({ serviceId: 1 }, {unique:true});
}
;
