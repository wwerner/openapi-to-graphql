'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const OasGraph = require('../lib/index.js')

let oas = require('./fixtures/example_oas.json')
// let oas = require('./fixtures/github_oas.json')
// let oas = require('./fixtures/instagram.json')
// let oas = require('./fixtures/government_social_work_api.json')

// const yamljs = require('yamljs')
// const fs = require('fs')
// // requires Box API from API Guru
// let oas = yamljs.parse(fs.readFileSync('../tmp/APIs/box.com/content/2.0/swagger.yaml', 'utf8'))

OasGraph.createGraphQlSchema(oas, {
  addSubOperations: true
}).then(schema => {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }))

  app.listen(3001, () => {
    console.log('GraphQL accessible at: http://localhost:3001/graphql')
  })
})
.catch(err => {
  console.log(err)
})
