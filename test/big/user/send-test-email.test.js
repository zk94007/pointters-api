
const sgMail = require('@sendgrid/mail');


const assert = require('assert');

const faker = require('faker');

const { findOne, create: createUser } = require('../../../stores/user');

describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user PUT ->send Email', async() => {
        	sgMail.setApiKey('ADoK4H-GQfGPDIEOQIRpKg');
        	const msg = {
			  to: 'frozenfish@yandex.ru',
			  from: 'black.horse775588@gmail.com',
			  subject: 'Sending with SendGrid is Fun',
			  text: 'and easy to do anywhere, even with Node.js',
			  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
			};
			sgMail.send(msg);

        });
    });
});
