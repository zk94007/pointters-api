

const bounced = true;
const sendEmail = false;
const valid = false;

module.exports = (client) => async function(bounces) {
    const bouncesToDelete = [];
    for (let i = 0; i < bounces.length; i++) {
        const {email, reason} = bounces[i];
        const isEmail = {bounced, reason, valid};
        const {error} = await client.findOneAndUpdate({email}, {$set: {isEmail, sendEmail}})
            .catch((error) => {
                console.log(`${error } on `, bounces[i]);
                return {error};
            });

        if (!error) bouncesToDelete.push(email);
    }

    return bouncesToDelete;
}
;
