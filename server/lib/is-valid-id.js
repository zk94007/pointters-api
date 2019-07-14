const mongoose = require('mongoose');


module.exports = (id) => new Promise((resolve) => resolve(mongoose.Types.ObjectId.isValid(id)));
