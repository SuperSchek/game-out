// Load configuration
var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('./../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing on Groups CRUD', function(){
    var request = supertest(localConfig.host + ':' + config.port + localConfig.api_path);

    var tmpUserId = null;
    var tmpUserResponse;

    before(function(done){
        done();
    });

    describe('CREATE', function(){
        it('POST /groups', function(done){
            request
                .post('/groups')
                .send({
                    name: 'BadmenGroep'
                })
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('message').be.exactly('Group created succesfully!');

                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');
                    console.log(JSON.parse(res.text));

                    tmpUserId = JSON.parse(res.text).group._id;
                    done();
                })
        });
    });

    describe('RETRIEVE 1 groups', function(){
        it('GET /groups', function(done){
            request
                .get('/groups/' + tmpUserId)
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('name').be.exactly('BadmenGroep');

                    res.statusCode.should.be.exactly(200);

                    tmpUserResponse = res.text;
                    done();
                })
        });
    });


    describe('DELETE', function(){
        it('DELETE /groups/{id}', function(done){
            request
                .del('/groups/' + tmpUserId)
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


