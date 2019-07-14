

const spam = true;
const sendEmail = false;
const valid = false;

module.exports = (client) => async function(spams) {
    const spamsToDelete = [];
    for (let i = 0; i < spams.length; i++) {
        const {email, reason} = spams[i];
        const isEmail = {spam, reason, valid};
        const {error} = await client.findOneAndUpdate({email}, {$set: {isEmail, sendEmail}})
            .catch((error) => {
                console.log(`${error } on `, spams[i]);
                return {error};
            });

        if (!error) spamsToDelete.push(email);
    }

    return spamsToDelete;
}
;
