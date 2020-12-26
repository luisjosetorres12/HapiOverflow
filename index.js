const hapi = require('@hapi/hapi')
const inert = require('inert')
const path = require('path')
const handlerbars = require('handlebars')
const vision = require('vision')

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

    //Vistas
    server.views({
      engines:{
        hbs: handlerbars
      },
      relativeTo: __dirname,
      path: 'views',
      layout:true,
      layoutPath: 'views'
    })

    // Rutas
    server.route({
      method: 'GET',
      path: '/',
      handler: (req, h) => {
        console.log('Llego peticion')
        return h.view('index', {title:'Home'})
      }
    })

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash:true
        }
      }
    })

    await server.start()
  } catch (error) {
    console.log(error)
  }
  console.log('The server is on', server.info.uri)
}

init()
