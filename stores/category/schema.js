const {schema: subCategories} = require('./sub-schema/sub-category');
module.exports = {
    isActive:{
        type:Boolean,
        default:true,
    },
    keywords: [ String ],
    name: {
        type: String,
        required: true,
        unique:true
    },
    subCategories: [ subCategories ],
    icon: String,
    thumbnail: String
};
