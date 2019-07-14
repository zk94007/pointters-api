const nock = require('nock');
const EventEmitter = require('events');
const emitter = new EventEmitter();

module.exports = (fromEmail, toEmail, subject) => {
    nock('https://api.sendgrid.com:443', {encodedQueryParams:true})
        .post('/v3/mail/send', (req) => {
            emitter.emit('content', req.content[0].value);
            return req.subject === subject &&
                req.from.email === fromEmail &&
                req.personalizations[0].to[0].email === toEmail;
        })
        .reply(202, '', [
            'Server',
            'nginx',
            'Date',
            'Wed, 16 Aug 2017 20:38:36 GMT',
            'Content-Type',
            'text/plain; charset=utf-8',
            'Content-Length',
            '0',
            'Connection',
            'close',
            'X-Message-Id',
            'zb0J0TOeRq6AYBNWmMs4oQ',
            'X-Frame-Options',
            'DENY',
            'Access-Control-Allow-Origin',
            'https://sendgrid.api-docs.io',
            'Access-Control-Allow-Methods',
            'POST',
            'Access-Control-Allow-Headers',
            'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl',
            'Access-Control-Max-Age',
            '600',
            'X-No-CORS-Reason',
            'https://sendgrid.com/docs/Classroom/Basics/API/cors.html' ]);

    return emitter;
};
