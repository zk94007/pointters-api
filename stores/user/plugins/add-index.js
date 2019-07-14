module.exports = (schema) => {
    schema.index({
        email: 1
    }, {
        unique: true,
        sparse: true
    });

    schema.index({
        'sociaNetwork.name': 1,
        'socialNetwork.id': 1
    }, {
        unique: true,
        sparse: true
    });
};
