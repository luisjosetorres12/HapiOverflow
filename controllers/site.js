'use strict'

function register (req, h) {
  console.log('Llego peticion')
  return h.view('register', { title: 'Registro' })
}

function home (req, h) {
  console.log('Llego peticion')
  return h.view('index', { title: 'Home' })
}

module.exports = {
  register,
  home
}
