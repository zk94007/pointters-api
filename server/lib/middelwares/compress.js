const compress = require('koa-compress');

const {compress:{threshold}} = require('../../../config');
const {Z_SYNC_FLUSH:flush} = require('zlib');

module.exports = () => compress({flush, threshold, });
