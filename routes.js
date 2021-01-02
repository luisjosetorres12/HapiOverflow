'use strict'
const Joi = require('@hapi/joi')
const { register, home, login, notFound,ask,viewQuestion } = require('./controllers/site')
const { createUser, validateUser, logout, failValidation } = require('./controllers/user')
const { createQuestion, answerQuestion } = require('./controllers/question')

const routes = [{
  method: 'GET',
  path: '/',
  handler: home
},
{
  method: 'GET',
  path: '/register',
  handler: register
},
{
  method: 'GET',
  path: '/login',
  handler: login
},
{
  method:'GET',
  path: '/logout',
  handler: logout
},
{
  method:'GET',
  path: '/ask',
  handler: ask
},
{
  method:'GET',
  path: '/question/{id}',
  handler: viewQuestion
},
{
  method: 'POST',
  path: '/create-user',
  handler: createUser,
  options:{
    validate:{
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(3)
      }),
      failAction: failValidation
    }
  }
},
{
  method: 'POST',
  path: '/validate-user',
  handler: validateUser,
  options:{
    validate:{
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
      }),
      failAction: failValidation
    }
  }
},
{
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true
    }
  }
},
{
  method: ['GET','POST'],
  path: '/{any*}',
  handler: notFound
},
{
  method: 'POST',
  path: '/create-question',
  handler: createQuestion,
  options:{
    validate:{
      payload: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
      }),
      failAction: failValidation
    }
  }
},
{
  method: 'POST',
  path: '/answer-question',
  handler: answerQuestion,
  options:{
    validate:{
      payload: Joi.object({
        answer: Joi.string().required(),
        id: Joi.string().required()
      }),
      failAction: failValidation
    }
  }
},
]

module.exports = routes
