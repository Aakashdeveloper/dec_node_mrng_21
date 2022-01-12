let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp);

describe("Testing Rest Api",() => {
    it("Should return 200 for user check",(done) => {
        chai.request(`http://localhost:9870`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
    it("Should return 404 for user check",(done) => {
        chai.request(`http://localhost:9870`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
    it("Testing adding User",(done) => {
        chai.request(`http://localhost:9870`)
        .post('/addUser')
        .send({"name":"TestUser","city":"TestCity","phone":123456,"isActive":true})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
})
