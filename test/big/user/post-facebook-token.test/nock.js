const nock = require('nock');

module.exports = (token, id, name) => {
    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/v2.10/me')
        .query((query) => query.access_token === token)
        .reply(200, { name, id }, [
            'Access-Control-Allow-Origin',
            '*',
            'ETag',
            '"d9348d5d9501386885c032b7cad648cad90bcd61"',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'private, no-cache, no-store, must-revalidate',
            'x-fb-rev',
            '3197549',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'BpT6tCmkVjY',
            'facebook-api-version',
            'v2.10',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'A7yM+VMzgenTbK+gjgHsVE9hP0tVPjnnnj2nfEz398umMKJjHbJQHZizoHUQUQi10dmJbT+hubzWgVDzf/SYaA==',
            'Date',
            'Wed, 02 Aug 2017 22:45:12 GMT',
            'Connection',
            'keep-alive',
            'Content-Length',
            '45' ]);

    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/v2.10/me')
        .query((query) => query.access_token === token)
        .reply(200, { name, id }, [
            'Access-Control-Allow-Origin',
            '*',
            'ETag',
            '"d9348d5d9501386885c032b7cad648cad90bcd61"',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'private, no-cache, no-store, must-revalidate',
            'x-fb-rev',
            '3197549',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'BpT6tCmkVjY',
            'facebook-api-version',
            'v2.10',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'A7yM+VMzgenTbK+gjgHsVE9hP0tVPjnnnj2nfEz398umMKJjHbJQHZizoHUQUQi10dmJbT+hubzWgVDzf/SYaA==',
            'Date',
            'Wed, 02 Aug 2017 22:45:12 GMT',
            'Connection',
            'keep-alive',
            'Content-Length',
            '45' ]);
    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/v2.10/me')
        .query((query) => query.access_token === token)
        .reply(200, { name, id }, [
            'Access-Control-Allow-Origin',
            '*',
            'ETag',
            '"d9348d5d9501386885c032b7cad648cad90bcd61"',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'private, no-cache, no-store, must-revalidate',
            'x-fb-rev',
            '3197549',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'BpT6tCmkVjY',
            'facebook-api-version',
            'v2.10',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'A7yM+VMzgenTbK+gjgHsVE9hP0tVPjnnnj2nfEz398umMKJjHbJQHZizoHUQUQi10dmJbT+hubzWgVDzf/SYaA==',
            'Date',
            'Wed, 02 Aug 2017 22:45:12 GMT',
            'Connection',
            'keep-alive',
            'Content-Length',
            '45' ]);
    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get('/v2.10/me')
        .query({ access_token: 'invalid_token', appsecret_proof: 'b1450f52ae59df279ba1726e25bd3c7a16225f929a69b6a3911ee459caf0f894' })
        .reply(404, { error: { message: 'Invalid OAuth access token.', type: 'OAuthException', code: 190, fbtrace_id: 'BNvzw2rgrFJ' } }, [ 'Access-Control-Allow-Origin',
            '*',
            'WWW-Authenticate',
            'OAuth "Facebook Platform" "invalid_token" "Invalid OAuth access token."',
            'Pragma',
            'no-cache',
            'Cache-Control',
            'no-store',
            'x-fb-rev',
            '3197549',
            'Content-Type',
            'text/javascript; charset=UTF-8',
            'x-fb-trace-id',
            'BNvzw2rgrFJ',
            'Expires',
            'Sat, 01 Jan 2000 00:00:00 GMT',
            'X-FB-Debug',
            'UusJt7vS5KqA4iLs+MPFTGmnvQHjUqT0bfakvSPZD/baktNEFl0Sf30kka4gxTy3kNkzN7HcnCKPuFDwwYsW5A==',
            'Date',
            'Wed, 02 Aug 2017 22:45:13 GMT',
            'Connection',
            'keep-alive',
            'Content-Length',
            '113' ]);
};
