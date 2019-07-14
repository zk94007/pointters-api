const SendGrid = require('sendgrid');

const sg = require('./client');
const {emailSenderingCong:{emailRemitentInOpt}} = require('../../config');

const helper = SendGrid.mail;

const sendEmail = async(emailReceiver, subject, _content) => {
    console.log('emailReceiver, subject, _content', emailReceiver, subject, _content);
    const fromEmail = new helper.Email(emailRemitentInOpt);
    const toEmail = new helper.Email(emailReceiver);
    const content = new helper.Content('text/plain', _content);
    console.log('fromEmail, subject, toEmail, content', fromEmail, subject, toEmail, content);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    const response = await sg.API(request).catch((error) => ({error}));
    console.log('response ==============', response);
    return response;
};

module.exports = sendEmail;
