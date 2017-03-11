'use strict'

const axios = require('axios');
const Alexa = require('alexa-sdk');
<<<<<<< HEAD:index.js
//const alexaHandlers = require('/handlers');
=======
const alexaHandlers = require('./handlers');
>>>>>>> 0f9d20b96d3c8c7ea9fc881ed5bda18eb8d4e99a:skill/index.js

const instance = axios.create({
    baseURL: 'https://c4tk.contentplatform.prod.lifeway.com/scripture/'
});

const handlers = {
    ReadVerse : function(){
        instance.get('/John%203%3A16')
        .then(function(res) {
            var scriptureText = res.data.text;
            console.log(scriptureText);
            this.emit(':tell', scriptureText.text);
        })
        .catch( function(error){
            console.log(error);
        });
    },
    SayVerse : function(Book, Chapter, Verse) {

    }
}


exports.handler = function (event, context) {
    context.log("hello-world")

    let alexa = Alexa.handler(event, context);

    // alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings; 
    alexa.registerHandlers(handlers);
    alexa.execute();
};