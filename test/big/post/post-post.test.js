const assert = require('assert');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post POST sohuld create a post given', async() => {
            const body = {
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ {'tags_1': 'tags_1'},{'tags_2': 'tags_2'} ],
                shareLink: 'http://pointters.com/'
            };
            
            const { body: res } = await agent.post('/post')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(body.message, res.post.message);
            assert(body.media, res.post.media);
            assert.deepEqual(body.tags, res.post.tags);
        });
    });

    describe('FAIL', () => {

    });
});
