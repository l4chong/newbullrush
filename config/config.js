'use strict';

var logger = require('./logger'),
  bluemix  = require('./bluemix'),
  extend   = require('extend'),
  env      = process.env.VCAP_SERVICES ? 'prod' : 'dev';

var services = {
  mongodb: 'mongodb://localhost/celebs',

  personality_insights: {
      "url": "https://gateway.watsonplatform.net/personality-insights/api",
      "username": "ec653fa9-4009-44f3-81a5-8d5a72a1b294",
      "password": "bqCW57WSBPVf",
    version: 'v2'
  },

  twitter: [
  // Twitter app credentials: https://apps.twitter.com/app
  {
      consumer_key:       'zfztqDJNUsNFIWflxyqS6tuve',
      consumer_secret:    '6mb9X3mdbnvcoxmrqb71YhVOQTVMxzicCx7q6LggWsOfHpzw2h',
      access_token_key:   '4289837116-bdgpzt4WP5erhXPpepYSqHgw76md797EbbPcaJs',
      access_token_secret:'V1au48k4XWnAaFqyStMEmhnWe15MhXVa8KwdsSg4KC2z3'
  }]
};


// Get the service
if (env === 'prod') {
  services.mongodb = bluemix.serviceStartsWith('mongodb').url;
  services.personality_insights = extend({'version':'v2'}, bluemix.serviceStartsWith('personality_insights'));
}

logger.info('mongodb:',services.mongodb);
logger.info('personality_insights:',services.personality_insights);

module.exports = {
    services: services,
    host: '127.0.0.1',
    port: 3000
};
