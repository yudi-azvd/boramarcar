const fs = require('fs')

const ifs = require('os').networkInterfaces();
const IPs = Object.keys(ifs)
  .map(x => [x, ifs[x].filter(x => x.family === 'IPv4')[0]])
  .filter(x => x[1])
  .map(x => x[1].address);

const firebaseJson = require('./firebase.example.json')

const host = IPs[1]
firebaseJson.emulators.database.host = host

fs.writeFileSync(
  './firebase.json', 
  JSON.stringify(firebaseJson, null, 2)
)