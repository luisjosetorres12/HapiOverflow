'use strict'

class Questions {
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('questions')
  }

  async create(data, user){
    
    const question = {
      ...data
     }
    question.owner = user
    const newQuestion = this.collection.push(question)
    return newQuestion.key
  }

  async getLast (amount) {
    const query = await this.collection.limitToLast(amount).once('value')
    const data = query.val()
    return data
  }

  async getOne(id) {
    const query = await this.collection.child(id).once('value')
    const data = query.val()
    return data
  }

  async answer (data, user) {
    const answerResult = {
      ...data
    }
    const answer = await this.collection.child(answerResult.id).child('answers').push()
    answer.set({text: answerResult.answer, user:user})
    return answer
  }
}

module.exports = Questions