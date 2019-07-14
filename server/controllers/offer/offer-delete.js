const { remove: removeOffer } = require('../../../stores/offer');

const errorMessage = 'Offer does not exists';
module.exports = async(ctx) => {
    const offerRemoved = await removeOffer({ _id: ctx.params.idOffer });
    if (!offerRemoved || offerRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: !offerRemoved.isActive };
};
