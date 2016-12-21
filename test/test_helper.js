const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.chai = chai
global.expect = chai.expect
global.sinon = sinon

process.env.NODE_ENV = 'test'
