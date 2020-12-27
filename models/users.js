'use strict'

const bcryp = require('bcrypt')

class Users {
  constructor (db){
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  async create (data) {
    const user = {
      ...data
    }
    user.password = await this.constructor.encrypt(user.password)
    const newUser = this.collection.push(user)
    return newUser.key
  }

  static async encrypt(password){
    const saltRounds = 10
    const hashedPassword = await bcryp.hash(password,saltRounds)
    return hashedPassword
  }

  async validateUser (data) {
    const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value')
    const userFound = userQuery.val()
    if(userFound){
      const userId = Object.keys(userFound)[0]
      const passwordRight = await bcryp.compare(data.password,userFound[userId].password)
      const result = (passwordRight) ? userFound[userId] : false
      return result
    }

    return false
  }
}

module.exports = Users
