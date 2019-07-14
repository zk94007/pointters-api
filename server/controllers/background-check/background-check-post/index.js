//const createCandidateAsync = require('./create-report-async');
const { create } = require('../../../../stores/background-candidate');

module.exports = async(ctx) => {
    ctx.request.body.userId = ctx.queryToFindUserById._id;
    const candidate = await create(ctx.request.body);
    if(!candidate || candidate.error) ctx.throw(404, 'error post background check data');
    ctx.body = candidate;
};
