const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findOneFollowing } = require('../../../stores/following');
const { avgOnTime, count: countOrder  } = require('../../../stores/order');
const { count: numLikes  } = require('../../../stores/service-like');
const { count: numWatching  } = require('../../../stores/service-watch');
const { avgQuality  } = require('../../../stores/service-review');
const errorMessage = 'Error in find user';

module.exports = async(ctx) => {
    let userId = ctx.query.userId?ctx.query.userId:ctx.queryToFindUserById._id;
    let isFollowingUser = false;

    const user = await findOneUser({ _id: userId });
    if (!user || user.error) ctx.throw(404, errorMessage);

    if (ctx.query.userId && ctx.query.userId != ctx.queryToFindUserById._id) {
        const followingDoc = await findOneFollowing({ followFrom: ctx.queryToFindUserById._id, followTo: ctx.query.userId });
        if (followingDoc && !followingDoc.error)
          isFollowingUser = true;
    }

    let result = {
      id: userId,
      awards: user.awards,
      companyName: user.companyName,
      description: user.description,
      education: user.education,
      firstName: user.firstName,
      lastName: user.lastName,
      insurance: user.insurance,
      license: user.license,
      profileBackgroundMedia: user.profileBackgroundMedia,
      profilePic: user.profilePic,
      verified: user.verified,
      isFollowed: isFollowingUser
    };

    switch (user.settings.locationViewPermission) {
      case "public":
        result.location = user.location;
        break;
      case "onlyme":
        if(!ctx.query.userId || ctx.query.userId == ctx.queryToFindUserById._id)
          result.location = user.location;
        break;
      case "followers":
        if(isFollowingUser)
          result.location = user.location;
        break;
    }

    switch (user.settings.phoneViewPermission) {
      case "public":
        result.phone = user.phone;
        break;
      case "onlyme":
        if(!ctx.query.userId || ctx.query.userId == ctx.queryToFindUserById._id)
          result.phone = user.phone;
        break;
      case "followers":
        if(isFollowingUser)
          result.phone = user.phone;
        break;
    }

    const p_avgOnTime = await avgOnTime({ sellerId: userId });
    const p_avgQuality = await avgQuality ({ sellerId: userId });
    const p_numOrdersCompleted = await countOrder({ sellerId: userId });
    const p_numLikes = await numLikes({ sellerId: userId });
    const p_numWatching  = await numWatching({ sellerId: userId });

    result.userMetrics = {
      avgOnTime: (!p_avgOnTime || p_avgOnTime.error)?'NA':p_avgOnTime,
      avgQuality: (!p_avgQuality || p_avgQuality.error)?'NA':p_avgQuality,
      numOrdersCompleted: (!p_numOrdersCompleted || p_numOrdersCompleted.error)?'0':p_numOrdersCompleted,
      avgResponseTime: 1,
      avgRating:100,
      avgWillingToBuyAgain:100,
      pointValue: 100,
      numLikes: (!p_numLikes || p_numLikes.error)?'0':p_numLikes,
      numWatching: (!p_numWatching || p_avgOnTime.error)?'0':p_numWatching
    };

    ctx.status = 200;
    ctx.body = { result };
};
