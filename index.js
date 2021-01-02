const hapi = require('@hapi/hapi')
const inert = require('inert')
const path = require('path')
const handlerbars = require('./lib/helpers')
const vision = require('vision')
const routes = require('./routes')
const site = require('./controllers/site')

const server = hapi.server({
  port: 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

const init = async () => {
  try {
    // Registrando Plugins
    await server.register(inert)
    await server.register(vision)

    //Definiendo Cookies
    server.state('user',{
      ttl:1000 * 60 * 60 * 24,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    // Configuracion de Vistas
    server.views({
      engines: {
        hbs: handlerbars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)
    await server.start()
  } catch (error) {
    console.log(error)
  }
  console.log('The server is on', server.info.uri)
}


// Manejando Errores no controlados
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error.message, error)
})

process.on('unhandleException', error => {
  console.error('unhandleException', error.message, error)
})

init()
