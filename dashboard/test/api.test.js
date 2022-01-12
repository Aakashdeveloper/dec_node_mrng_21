let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp);

describe("Testing Rest Api",() => {
    it("Should return 200 for health check",(done) => {
        chai.request(`http://localhost:9870`)
        .get('/health')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })
})
