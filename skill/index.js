'use strict'

const axios = require('axios');
const Alexa = require('alexa-sdk');

//const alexaHandlers = require('/handlers');

const instance = axios.create({
    baseURL: 'https://c4tk.contentplatform.prod.lifeway.com/scripture/'
});



const handlers = {
    ReadVerse : function(){
        var vm = this;
        instance.get('/John%203%3A16')
        .then(function(res) {
            var scriptureText = res.data.text;
            console.log(scriptureText);
            vm.emit(':tell', scriptureText);
        })
        .catch( function(error){
            console.log(error);
        });
    },
    SayVerse : function(Book, Chapter, Verse) {
        let path = encodeURIComponent(`${Book} ${Chapter}:${Verse}`);
        instance.get(`/${path}`)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        });
    },
    Unhandled : function() {
        this.emit(':tell', "Sorry for you I have not this intent");
    }
}


exports.handler = function (event, context) {
    console.log(event);

    let alexa = Alexa.handler(event, context);

    // alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings; 
    alexa.registerHandlers(handlers);
    alexa.execute();
};
