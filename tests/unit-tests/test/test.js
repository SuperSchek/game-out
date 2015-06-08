// Load configuration
var env = 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');


var should = require('should'),
    supertest = require('supertest');

describe('API routing for CRUD operations on books', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path + "/");

    var tmpBookId = null;
    var tmpBookResponse;

    before(function (done) {
        done();
    });

    describe('CREATE user', function () {
        it('should post /users', function (done) {
            request
                .post('/users/register')
                .send({
                    "firstname": "Johny",
                    "lastname": "Boom",
                    "city": "Kansas",
                    "email": "johny@mail.com",
                    "username": "johnyboy",
                    "password": "wachtwoord123"
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');

                    tmpBookId = JSON.parse(res.text).doc._id;
                    done();
                });
        });
    });

    describe('RETREVE all books', function () {
        it('should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    tmpBookResponse = res.text;
                    done();
                });
        });
    });

    describe('RETREVE 1 book', function () {
        it('should GET /books/{id}', function (done) {
            request
                .get('/books/' + tmpBookId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('detail');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 book', function () {
        it('should Put /books/{id}', function (done) {
            request
                .put('/books/' + tmpBookId)
                .send({
                    "doc": {
                        "title": "Good book!" + Date.now(),
                        "author": "Better book",
                        "description": "Book is updated"
                    }
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 book', function () {
        it('should DELETE /books/{id}', function (done) {
            request
                .del('/books/' + tmpBookId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                // .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text).should.have.property('doc').be.exactly(1);
                    // or use this, but somehow the old way works with me
                    //JSON.parse(res.text)
                    //    .should.have.property('doc')
                    //    .and.have.property('ok')
                    //    .be.exactly(1);
                    //JSON.parse(res.text)
                    //    .should.have.property('doc')
                    //    .and.have.property('n')
                    //    .be.exactly(1);

                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('RETREVE all books to verify that the original collection is restored', function () {
        it('should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
});
