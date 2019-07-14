const { find: findCategory, count } = require('../../../../stores/category');
const {pagination:{categories:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetWatching = 'Error in get to category-category';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    console.log('query = ', query);
    const categories = await findCategory(query, {limit});
    if (!categories || !categories.length || categories.error) ctx.throw(404, errorInGetWatching);
    if (ctx.params.idCategory) {
        ctx.body = {
            category: categories[0]
        };
        return;
    }
    ctx.body = {categories};
    const lastOne = categories[categories.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    console.log();
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
