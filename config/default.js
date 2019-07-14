module.exports = {
  angularSite: {
    angularSiteUrl: 'localhost:4200'
  },
  braintree: {
    merchantId: 'wnqf5ysfcdrn5yyn',
    publicKey: 'pvfmj48vrfyydcqg',
    privateKey: '419868a71f71a12d28d3c3552f201945'
  },
  checkr: {
    authToken: 'f2416654047474c3d1257bb7c6894e0a0482c8c8'
  },
  compress: {
    threshold: 1024
  },
  easyPost: {
    ApiKey: 'y1ssBgKnItXIiHlu5McAEQ'
  },
  elasticsearch: {
    hosts: ['localhost:9200']
  },
  emailSenderingCong: {
    emailRemitentInOpt: 'help@pointters.com',
    sendgridApiKey: process.env.SENDGRID_API_KEY || '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',
    subjectOptEmail: 'Password Reset',
    contentOptEmail: 'Your password was resetted with: '

  },
  longOfPasswordTemp: 10,
  facebook: {
    appId: '995599163788797',
    appSecret: '4868095834fef8a3538045527b5c7da9',
    version: 'v2.10'
  },
  fcmConfig: {
    type: "service_account",
    project_id: "pointters-firebase",
    private_key_id: "357e2383c15a69961c2d51b5aff8f63e78e75889",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDao4vvBJs35uVm\nDKccg4l96ZWfd1hgkvkgfaCCXQW5hAq8leobjjsir9KGSP2fiN2guPOsSJ9nPkd2\nSCaXm1tY990CxNaAfrzUCL/O+Riy0qHhteR4jzvogNN6mNAIi3SaatBs/jKVYez8\n7YOP1VX4e7kR0jutRkDRansFWCzUw020nXWzSll7wwkR3DMKASarZzsi1oPJQ2Rl\nySG7hp3ujZz4K5UITqctP9XgTqkulGQXn2B5s8tplPx5oDcO+WqulQhgStPoyo/Q\nYddKtojrFnay864jxZHtY4FP8OJpydH3DGtzPVHK8cn9XEC3/aoWTvFjOpQGCFV4\ndZCpVi9lAgMBAAECggEAFnDyeEBOCUUdFyYl0e6rYl3jImjOzKzRPtU+MBtJruK/\ncl9l1dm5tqP61RcxVxpmeyx4sF6M4/03uwuJUIbc76sTR4k6Jhq8GXxjaaRWNWaa\nwI7ZqkkzYjg03LDKK5Jaz822YnWN7hjMySI83nrMdfKHCq38O5sKJKSMB36nLVhE\n9Gp04S7eADerHgs+odvsFucXaFdeGORYKvXaQ4os0D/plg34vLVs9ejDXzbbBuhi\nuEYUvQX7Yb1tWqzn5Dx58lNcpsmfWbRepji6Z0fcfKzVORj+B/GPTBib3MOX7TXG\nPWRyc+jPlfTyud7BrZkjCFUCDIkOtKk22RwjmK/RwQKBgQDuOTRBE7riTLOpSE0t\nLarUaEU6V/GFI0cWA6SCEMbMRDr7jD2gTMh0fi/bio4d3LvubSaN4oS2zFiIorYP\nzIWrY5bBHWPHS9s8DfUYhaWQYaW968bILSctF3UP13o+4kcD9+T9ycAYNvJJyqZB\njyLFklUbyVP9YZjPreDHGUBDJQKBgQDq9DeAWfa57E+mNClgG+PshgLZ5C60N9AQ\nCM2u9eK7fY8jT7ohWPW6JQCI+Tek2v8v8uvK2fwPJ3KMBVWV89dE1UCONoOZ3kLI\nQg27Kd6GjgOWcZiTYc/2p5m/uumjyzANNmpKeWwx0FYN8sabVQIa/F4jXnh9ZveT\nesHR6dinQQKBgFAeKwXL9elP9Ih1SYdtOWvQWaACnbayI6EyvmwD6mgedlvNUZiM\n2knbeorycVN3vji0uuezDAFSfmANoP91QGtgxf3SvZD0YRo0c364y/Lf9FcIacU+\n8lMG9ZbLWFC31zxtbbUw2gsKx7erkPixg/dAfKEot7ea0ELgbp1nT6aFAoGBAJ+N\nkvc1oMgngvtSJtredcyUQPFo9JJr6H5LDCqJThyWqpKHPNYSjGSJZjCeVTw9f9g2\n9gr+Nx6vYilWIgW/3msfCkTJHltqRR2rRZnZWAU2AZezsrI7VTeiH1XFf448mHgQ\ngOPsSx4U5at5N4galWBwCxmnuNkoCG59iYucawVBAoGBAJCbta+5vScvXp3ytzvt\n4SqukLN7STWkhmnfBpy0poMe2YeAdPWu0GyhboBV7h8CLxiBs5wDNvhyqfiYDKD9\npwc2QC8Kow05ojC6r9rSfyOeqJWQTDpdmk2q9SVmE6UCyJfJtpVdbriMve++LP1a\njkxVFa2g5jOwomT7FwUo3gQO\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-psywe@pointters-firebase.iam.gserviceaccount.com",
    client_id: "104995349038349930698",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-psywe%40pointters-firebase.iam.gserviceaccount.com"
  },
  neo4j: {
    url: 'http://localhost:7474'
  },
  pagination: {
    serviceReviews: 100,
    requests: 100,
    offers: 100,
    postComments: 100,
    requestOffers: 100,
    categories: 100
  },
  pathUnprotected: [
    '/homepage',
    '/homepage/public',    
    '/homepage/mobile',
    '/user/login',
    '/user/signup',
    '/user/facebook/token',
    '/user/otp',
    '/user/otp/validate',
    '/user/reset',
    '/user/reset/password',
    '/push-notification',
    '/fcm-token',
    {
      path: '/category/:idCategory/sub-category/:idSubCategory',
      method: 'GET'
    },
    {
      path: '/category/:idCategory?',
      method: 'GET'
    },
    {
      path: '/categories/:idCategory?',
      method: 'GET'
    }
  ],
  propsToBeEverPrivate: 'settings,password',
  rateLimitCalls: {
    duration: 60000,
    max: 100,
    blacklist: [],
    whitelist: []
  },
  redis: {
    url: 'redis://127.0.0.1:6379'
  },
  review: {
    minLengthForComment: 100
  },
  schedule: {
    BounceEmail: '00 00 * * * *',
    SpamEmail: '00 00 * * * *',
    InvalidEmail: '00 00 * * * *'
  },
  timeout: {
    apiTimeout: 30000,
    timeoutOptions: {
      status: 504,
      message: 'service unavailable'
    }
  },
  urlToValidateTokenFacebook: 'https://graph.facebook.com/me/?access_token=XYZ'
};
