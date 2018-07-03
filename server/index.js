const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

class Champion {
    constructor(name, attackDamage) {
        this.name = name
        this.attackDamage = attackDamage
    }
}

const schema = buildSchema(`
  type Query {
    language: String,
    getChampions: [Champion]    
  }
  type Champion {
     name: String
     attackDamage: Float
   }  
  
`)

const champions = [
    new Champion('Ashe', 100),
    new Champion('Vayne', 200)
]

const rootValue = {
  language: () => 'GraphQL12345',
  getChampions: () => champions
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))
app.listen(4000, () => console.log('Listening on 4000'))
