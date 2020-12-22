const hapi = require('@hapi/hapi')

const server = hapi.server({
  port: 3000,
  host: 'localhost'
})

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      console.log('Llego peticion')
      return { hello: 'world' }
    }
  })

  try {
    await server.start()
  } catch (error) {
    console.log(error)
  }
  console.log('The server is on', server.info.uri)
}

init()
