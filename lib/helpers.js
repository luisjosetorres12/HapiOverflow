'use stric'

const handlebars = require('handlebars')

function registerHelpers() {
  handlebars.registerHelper('answerNumber', (answer) => {
    if(!answer) {
      return 0
    }
    const keys = Object.keys(answer)
    return keys.length
  })

  handlebars.registerHelper('ifEquals', (a, b, options) =>{ 
    if (a === b) {
      return options.fn(this)
    }

    return options.inverse(this)
  })
  
  return handlebars
}

module.exports =  registerHelpers()
