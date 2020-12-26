const hapi = require('@hapi/hapi')
const inert = require('inert')
const path = require('path')
const handlerbars = require('handlebars')
const vision = require('vision')
const routes = require('./routes')

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

    server.route(routes)
    await server.start()
  } catch (error) {
    console.log(error)
  }
  console.log('The server is on', server.info.uri)
}

init()
