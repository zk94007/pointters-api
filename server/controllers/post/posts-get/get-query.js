module.exports = (ctx) => {

    function createQuery(skip,limit) {
      let query = 'match (a:user),(p:post),(me:user {mongoId:"'+ctx.queryToFindUserById._id+'"}) WHERE ((me)<-[:Followed_From]-(:following)-[:Followed_To]->(a) or me.mongoId=a.mongoId) and (p)-[:Posted_By]->(a)';
      query = query + ' return p ORDER BY p.mongoId DESC';
      if(skip) query = query + ' skip ' + skip;
      if(limit) query = query + ' limit ' + limit;

      return query;
    }

    let skip = ctx.query.skip?ctx.query.skip:'0';
    let limit = ctx.query.limit?ctx.query.limit:'10';
    return createQuery(skip, limit);
};
