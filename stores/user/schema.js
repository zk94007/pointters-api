const {
  location: {
    schema: location
  }
} = require('./sub-schema');
const {
  Schema
} = require('mongoose');
const media = require('./sub-schema/media');

module.exports = {
  awards: {
    type: String
  },
  braintreeCustomerId: {
    type: String
  },
  completedRegistration: {
    type: Boolean,
    default: false,
    nodeProperty: true
  },
  completedRegistrationDate: Date,
  companyName: {
    type: String,
    nodeProperty: true
  },
  description: {
    type: String,
    nodeProperty: true
  },
  education: {
    type: String
  },
  email: {
    type: String,
    nodeProperty: true
  },
  firstName: {
    type: String,
    nodeProperty: true
  },
  hasPaymentMethod: {
    type: Boolean,
    default: false
  },
  insurance: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isEmail: {
    valid: {
      type: Boolean,
      default: true
    },
    bounced: {
      type: Boolean,
      default: false
    },
    spam: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    reason: String
  },
  lastName: {
    type: String,
    nodeProperty: true
  },
  license: {
    type: String
  },
  location: location,
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  profileBackgroundMedia: [media],
  profilePic: {
    type: String
  },
  resetPasswordExpires: String,
  settings: {
    generalNotifications: {
      type: String,
      description: 'generalNotifications',
      enum: ['pushNotification', 'email', 'all', 'none'],
      default: 'all'
    },
    orderNotifications: {
      type: String,
      description: 'orderNotifications',
      enum: ['pushNotification', 'email', 'all', 'none'],
      default: 'all'
    },
    offerNotifications: {
      type: String,
      description: 'offerNotifications',
      enum: ['pushNotification', 'email', 'all', 'none'],
      default: 'all'
    },
    summaryEmail: {
      type: String,
      description: 'summaryEmail',
      enum: ['daily', 'weekly', 'all', 'none'],
      default: 'all'
    },
    locationViewPermission: {
      type: String,
      description: 'locationViewPermission',
      enum: ['public', 'followers', 'onlyme'],
      default: 'onlyme'
    },
    phoneViewPermission: {
      type: String,
      description: 'phoneViewPermission',
      enum: ['public', 'followers', 'onlyme'],
      default: 'onlyme'
    }
  },
  socialNetwork: {
    name: String,
    id: String
  },
  tempPassword: String,
  verified: {
    type: Boolean
  },
  fcmWeb: String,
  fcmAndroid: String,
  fcmiOS: String,
  shareLink: {
    type: String
  },
  token:String,
  deviceTypes:String
};
