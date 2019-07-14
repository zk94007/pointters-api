const https = require('https');
const axios = require("axios");
const {
  fdlConfig: key
} = require('../../config');
const PROJECT_ID = key.web_api_key;
const URL = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${PROJECT_ID}`;
var shortLink;


module.exports = async(link) => {
  
   
    config={
      
      method: 'POST',
      headers: {"Content-Type": "application/json"}

    };

    const fdlData = {
      "dynamicLinkInfo": {
        "dynamicLinkDomain": "pointters.page.link",
        "link": key.server_url+link,
        "androidInfo": { "androidPackageName": "com.pointters.androiddevelopment" },
        "iosInfo": { "iosBundleId": "com.pointters.iosdevelopment" }

      }
    };
    
    await axios.post(URL, fdlData, config)
    .then(function (response) {
      console.log("DYNAMIC_LINK:  ",response.data.shortLink);
      shortLink = response.data.shortLink;
    })
    .catch(function (error) {
      console.log(error);
    });

    return shortLink;
  
}

