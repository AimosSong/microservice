const Seneca = require('seneca')
const Hapi = require('hapi')
const seneca = Seneca()

const Routes = require('./routes');

const server = Hapi.server({
  host:'localhost',
  port:8000
})

for(let route of Routes){
  server.route(route);
}

async function start() {
  try{
    await server.start();
  }catch(err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:' + server.info.uri);
}

start();