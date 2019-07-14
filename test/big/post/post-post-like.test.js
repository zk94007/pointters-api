const assert = require('assert');

const { create: createpost } = require('../../../stores/post');
const { update: updateUser } = require('../../../stores/user');
const { get: getPostLikes } = require('../../../stores/post-like');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/like POST sohuld create a post given', async() => {
            const post = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                message: '$10 for 1 hour of dog walk service',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ {'tags_1': 'tags_1'},{'tags_2': 'tags_2'} ]
            };
            const postCreated = await createpost(post);
            await updateUser({
                email: __user.email
            },
                {
                    likesPost: []
                });
            
            const { body: res } = await agent.post(`/post/${postCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log(res);
            assert(res.liked, true );
            //const likesPost = await getPostLikes({ _id: __user._id });
            //assert.deepEqual(likesPost, [ postCreated._id ]);
        });
    });

    describe('FAIL', () => {

    });
});
