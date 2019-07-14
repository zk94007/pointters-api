
const callAPI = require('./client');
const snakify = require('./snakify');
const validateData = require('./validate-candidate');
const uri = 'v1/candidates';
const method = 'POST';
const options = { uri, method };
module.exports = async(data) => {
    console.log('data', data);
    const dataSnakified = snakify(data);
    console.log('dataSnakify', dataSnakified);
    const { error, value: dataValidated } = validateData(dataSnakified);

    if (error) return { error };

    options.json = dataValidated;
    return await callAPI(options);
};
