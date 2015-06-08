// Load configuration
var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('./../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing on books CRUD', function(){
    var request = supertest(localConfig.host + ':' + config.port + localConfig.api_path);

    var tmpUserId = null;
    var tmpUserResponse;

    before(function(done){
        done();
    });

    describe('CREATE', function(){
        it('POST /users/register', function(done){
            request
                .post('/users/register')
                .send({
                    firstname: 'Herman',
                    lastname: 'van Heijn',
                    username: 'HvH',
                    city: 'Stokkum',
                    email: 'herman@ah.nl',
                    password: 'testtest'
                })
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('firstname').be.exactly('Herman');

                    JSON.parse(res.text)
                        .should.have.property('city').be.exactly('Stokkum');

                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');
                    console.log(JSON.parse(res.text));

                    tmpUserId = JSON.parse(res.text)._id;
                    done();
                })
        });
    });

    describe('RETRIEVE 1 user', function(){
        it('GET /users/{id}', function(done){
            request
                .get('/users/' + tmpUserId)
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('firstname').be.exactly('Herman');

                    JSON.parse(res.text)
                        .should.have.property('city').be.exactly('Stokkum');

                    res.statusCode.should.be.exactly(200);

                    tmpUserResponse = res.text;
                    done();
                })
        });
    });


    describe('DELETE', function(){
        it('DELETE /users/delete/{id}', function(done){
            request
                .del('/users/delete/' + tmpUserId)
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');

                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);

                    res.statusCode.should.be.exactly(200);

                    done();
                })
        });
    });
});


