const fs = require('fs')
const { v4 } = require('uuid')


fs.writeFileSync('.env', `\nJWT_SECRET=${v4()}`, { encoding: 'utf8', flag: 'a' });
