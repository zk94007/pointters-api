

const invalid = true;
const sendEmail = false;
const valid = false;

module.exports = (client) => async function(invalids) {
    const invalidsToDelete = [];
    for (let i = 0; i < invalids.length; i++) {
        const {email, reason} = invalids[i];
        const isEmail = {invalid, reason, valid};
        const {error} = await client.findOneAndUpdate({email}, {$set: {isEmail, sendEmail}})
            .catch((error) => {
                console.log(`${error } on `, invalids[i]);
                return {error};
            });

        if (!error) invalidsToDelete.push(email);
    }

    return invalidsToDelete;
}
;
