// Load configuration
var env = 'development';//process.env.NODE_ENV ||
var config = require('../../server/config/config.js')[env],
    localConfig = require('./../config-test.json');

console.log('>>>>>', env, '<<<<<');

//describe('Book test homepage', function () {
//
//    beforeEach(function () {
//        browser.get('http://' + localConfig.host + ':' + config.port);
//    });

    //it('should get the titles', function () {
    //
    //    expect(browser.getTitle()).toBe('Book demo');
    //    expect(element(by.tagName('h1')).getText()).toBe('Book demo');
    //    expect(element(by.tagName('h2')).getText()).toBe('Books');
    //
    //    // Get CSS value
    //    element(by.tagName('h1')).getCssValue('color')
    //        .then(function (v) {
    //            expect(v).toBe('rgba(0, 0, 0, 1)');
    //        });
    //
    //});
//
//    it('should count the number of books', function () {
//
//        var books = element.all(by.repeater('book in books'));
//
//        expect(books.count()).toBe(10);
//
//    });
//
//    it('should get the first book', function () {
//
//        var books = element.all(by.repeater('book in books'));
//
//        expect(books.get(0).getText()).toEqual('DOCTOR SLEEP, Stephen King');
//
//    });
//
//    it('should get the last book', function () {
//
//        var books = element.all(by.repeater('book in books'));
//
//        expect(books.last().getText()).toEqual('SYCAMORE ROW, John Grisham');
//
//    });
//
//    it('should filter the books and return 1 book', function () {
//
//        element(by.model('query')).sendKeys('tar');
//
//        var books = element.all(by.repeater('book in books'));
//
//        expect(books.count()).toBe(1);
//        expect(books.get(0).getText()).toEqual('THE GOLDFINCH, Donna Tartt');
//
//    });
//});

describe('CRUD on users', function () {

    var _id;

    beforeEach(function () {
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/searchfriends');
    });

    /**
     * @see https://docs.angularjs.org/api/ng/directive/form
     */
    it('should display an empty form', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/register');

        expect(element(by.model('regInfo.firstname')).getText()).toBe('');
        expect(element(by.model('regInfo.lastname')).getText()).toBe('');
        expect(element(by.model('regInfo.city')).getText()).toBe('');
        expect(element(by.model('regInfo.username')).getText()).toBe('');
        expect(element(by.model('regInfo.password')).getText()).toBe('');
        expect(element(by.model('regInfo.email')).getText()).toBe('');
    });

    it('should create a new user and when succesful should be redirected', function () {

        /**
         * First we create the new user
         */
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/register');

        element(by.model('regInfo.firstname')).sendKeys('Yorick');
        element(by.model('regInfo.lastname')).sendKeys('Janssen');
        element(by.model('regInfo.city')).sendKeys('Utrecht');
        element(by.model('regInfo.username')).sendKeys('YorJans');
        element(by.model('regInfo.password')).sendKeys('wachtwoord123');
        element(by.model('regInfo.email')).sendKeys('Yorick@eenmailprovider.com');

        element(by.id('register')).click();

        expect(browser.getLocationAbsUrl()).toMatch("/login");

    });

    it('should get userInfo', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/searchfriends');

        // search for the user
        element(by.model('query')).sendKeys('YorJans');


        //check the data
        expect(element(by.tagName('h4')).getText()).toBe('YorJans');
        element(by.tagName('h4')).click();
        expect(element(by.id('name')).getText()).toBe('Naam: Yorick Janssen');
        expect(element(by.id('city')).getText()).toBe('Stad: Utrecht');
    });






    //it('should query the new created book', function () {
    //
    //    browser.get('http://' + localConfig.host + ':' + config.port);
    //
    //    element(by.model('query')).sendKeys('Anthony Doerr');
    //
    //    var books = element.all(by.repeater('book in books'));
    //
    //    expect(books.count()).toBe(1);
    //    expect(books.get(0).getText()).toEqual('ALL THE LIGHT WE CANNOT SEE, Anthony Doerr');
    //
    //});
    //
    it('should update the new created book', function () {
        //login
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/login');

        element(by.model('loginInfo.username')).sendKeys('YorJans');
        element(by.model('loginInfo.password')).sendKeys('wachtwoord123');
        element(by.id('login')).click();

        //change city
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/myprofile');
        element(by.id('theCity')).click();
        element(by.model('user.city')).clear();
        element(by.model('user.city')).sendKeys('Stokkum');
        element(by.id('saveCity')).click();


        //refresh page
        browser.get('http://' + localConfig.host + ':' + config.port + '/#/myprofile');
        expect(element(by.id('theCity')).getText()).toBe('Stokkum');





    });

    it('should delete the new created user', function () {

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/login');

        element(by.model('loginInfo.username')).sendKeys('YorJans');
        element(by.model('loginInfo.password')).sendKeys('wachtwoord123');
        element(by.id('login')).click();

        browser.get('http://' + localConfig.host + ':' + config.port + '/#/myprofile');

        element(by.id('deleteAccount')).click();

    });


});

