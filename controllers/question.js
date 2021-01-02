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

async function answerQuestion (req, h) {
  let result;
  try {
    result = await questions.answer(req.payload, req.state.user)
  } catch (error) {
    console.error(error)
  }

  return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
  createQuestion,
  answerQuestion
}