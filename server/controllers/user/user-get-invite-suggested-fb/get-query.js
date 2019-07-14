module.exports = (ctx) => {

    function createQuery(skip,limit) {
      let query = 'match (a:user),(me:user {mongoId:"'+ctx.queryToFindUserById._id+'"}) WHERE a.completedRegistration="true" and a.mongoId <> me.mongoId AND NOT (me)<-[:Followed_From]-(:following)-[:Followed_To]->(a)';
      query = query + ' return a';
      if(skip) query = query + ' skip ' + skip;
      if(limit) query = query + ' limit ' + limit;

      return query;
    }

    let skip = ctx.query.skip?ctx.query.skip:'0';
    let limit = ctx.query.limit?ctx.query.limit:'10';
    return createQuery(skip, limit);
};
