'use strict'

const questions = require('./../models/index').questions

function register (req, h) {
  if(req.state.user){
    return h.redirect('/')
  }
  return h.view('register', { title: 'Registro', 
  user: req.state.user })
}

async function home (req, h) {
  let data;
  try {
    data = await questions.getLast(10)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
  return h.view('index', { title: 'Home',
  user: req.state.user,
  questions:data })
}

function login (req, h) {
  if(req.state.user){
    return h.redirect('/')
  }
  return h.view('login', { title: 'Login', 
  user: req.state.user })
}

function  notFound (req, h) {
  return h.view('404', {}, {
    layout: 'error-layout'
  }).code(404)
}

function  fileNotFound (req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404 ){
    return h.view('404', {}, {
      layout: 'error-layout'
    }).code(404)
  }

  return h.continue
}

function ask (req, h) {
  if(!req.state.user){
    return h.redirect('/')
  }
  return h.view('ask', {
    title: 'Crear Pregunta',
    user: req.state.user
  })
}

async function viewQuestion (req, h) {
  let data;
  try {
    data = await questions.getOne(req.params.id)
    if(!data) {
      return notFound(req, h)
    }
  } catch (error) {
    console.error(error)
  }

  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question:data,
    key: req.params.id
  })
}

module.exports = {
  register,
  home,
  login,
  notFound,
  fileNotFound,
  ask,
  viewQuestion
}
