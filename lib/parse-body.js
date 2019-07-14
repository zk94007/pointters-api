module.exports = (body) => {
    try {
        return JSON.parse(body);
    } catch (error) {
        return body;
    }
};
