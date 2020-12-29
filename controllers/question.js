'use strict'

const questions = require('./../models/index').questions

async function createQuestion (req, h) {
  let result;

  try {
    result = await questions.create(req.payload, req.state.user)
    console.log(`Pregunta creada con el id ${result}`)
  } catch (error) {
    console.error('Ocurrio un error: ', error)
    
    return h.view('ask', {
      title: 'Crear Pregunta',
      error: 'Problema creando la pregunta'
    }).code(500).takeover()
  }

  return h.view('ask', {
    title: 'Crear Pregunta',
    success: 'Pregunta creada correctamente'
  })
}

module.exports = {
  createQuestion
}