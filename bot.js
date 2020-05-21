//problema link http non prende tutti i film  /////RISOLTO

var TelegramBot=require('node-telegram-bot-api');
var token="1235302424:AAH-ugpCRTl9h8AXhFjpmA3dyQ1y8c5RThs";
const sqlite3 = require('sqlite3').verbose();
var ok_log = false;
var ok_reg = false;
var request=require('request');
let db=new sqlite3.Database('./file.db',err =>{
    if(err)
    {
        console.error(err.message);
    }
});

//db.close();
let sql="SELECT * FROM utente ORDER BY username,password";

db.all(sql,[],(err,rows)=>
{
    if(err)
    {
        throw err;
    }
    rows.forEach((row)=>
    {
        console.dir("Utente");
        console.dir(row);
    });
});

var bot=new TelegramBot(token,
    {
        polling:true
    });
///////////////////////////////////////////////
    bot.onText(/\/start/,function(msg,options){
        var chatId=msg.chat.id;
                bot.sendMessage(chatId,"Hi!This is my bot.\nEnjoy it!\nIf you have any problem,contact me at filippo.risposi.studenti@isii.it!\n)",
                {
                    parse_mode:"HTML"
                }); 
                var options= {
                    "reply_markup":{
                        "keyboard": [
                            ['/register'],
                            ['/login'],
                        ]
                    }
                };
        bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
    });
///////////////////////////////////////////////
        bot.onText(/\/help/,function(msg,options){
            var chatId=msg.chat.id;
            if(ok_log==true){
                    bot.sendMessage(chatId,"<strong>Here are some useful commands:</strong>\n1)/film <b>TITLE</b> - Use this command to search a film/anime/tv-series and its description!\n2)/streaming - Use this command after /film and you will be sent to the streaming site!",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/logout','/about'],
                                ['/timeimplementations'],
                                ['/technologiesused'],
                            ]
                        }
                    };
                   
                }
                    else{
                        bot.sendMessage(chatId,"You need to login/register!",
                        {
                            parse_mode:"HTML",
                        });
                        options= {
                            "reply_markup":{
                                "keyboard": [
                                    ['/login'],
                                    ['/register'],
                                ]
                            }
                        };
                    }
                    bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
                });
///////////////////////////////////////////////
        bot.onText(/\/about/,function(msg,options){
            var chatId=msg.chat.id;
            if(ok_log==true){
                    bot.sendLocation(chatId,45.0477,9.7004);
                    bot.sendMessage(chatId,"<strong>Developed by\n</strong>Filippo Risposi\nICT Student at ISII Marconi,Piacenza,IT\nDOB: 16/08/2001",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/help','/logout'],
                                ['/timeimplementations'],
                                ['/technologiesused'],
                            ]
                        }
                    };
                }
                else{
                    bot.sendMessage(chatId,"You need to login/register!",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/login'],
                                ['/register'],
                            ]
                        }
                    };
                }
                bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
                });
///////////////////////////////////////////////
        bot.onText(/\/timeimplementations/,function(msg,options){
            var chatId=msg.chat.id;
                if(ok_log==true){
                    bot.sendMessage(chatId,"<b>Started</b>:09/04/2020\n<b>Finished</b>:24/05/2020",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/help','/logout'],
                                ['/about'],
                                ['/technologiesused'],
                            ]
                        }
                    };
                }
                else{
                    bot.sendMessage(chatId,"You need to login/register!",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/login',,'/logout'],
                                ['/register'],
                            ]
                        }
                    };
                }
                bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
                });
///////////////////////////////////////////////
        bot.onText(/\/technologiesused/,function(msg){
            var chatId=msg.chat.id;
            if(ok_log==true){
                    bot.sendMessage(chatId,"<strong>Nodejs</strong>\nKeyboard with buttons\nQueries\nDatabase",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/help','/logout'],
                                ['/about'],
                                ['/timeimplementations']
                            ]
                        }
                    };
                }
                else{
                    bot.sendMessage(chatId,"You need to login/register!",
                    {
                        parse_mode:"HTML",
                    });
                    options= {
                        "reply_markup":{
                            "keyboard": [
                                ['/login'],
                                ['/register'],
                            ]
                        }
                    };
                }
                bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
                });

    /*bot.on('message', (msg) =>  {
    
    var ciao = "ciao";
    if (msg.text.toString().toLowerCase().indexOf(ciao) === 0) {
    bot.sendMessage(msg.chat.id,"ciao!");
    } 
        
    var arrivederci = "arrivederci";
    if (msg.text.toString().toLowerCase().includes(arrivederci)) {
    bot.sendMessage(msg.chat.id, "Alla prossima!Torna ad utilizzarmi!");
    } 
    
    });
    */
///////////////////////////////////////////////
    bot.onText(/\/register/, (msg) => {
        Register(msg);
    });

    function Register(msg) {
        var username;
        var password;
        var risposte = {};
        var query = "INSERT INTO utente(username, password) VALUES(?, ?)";
        var sql = "SELECT * FROM utente";
        bot.on('message', function (mess) {
            var callback = risposte[mess.chat.id];
            if (callback) {
                delete risposte[mess.chat.id];
                return callback(mess);
            }
        });
                        bot.sendMessage(msg.chat.id, "Insert Username").then(function () {
                            risposte[msg.chat.id] = function (risposta) {
                                username = risposta.text;
                                bot.sendMessage(msg.chat.id, "Insert Password").then(function () {
                                    risposte[msg.chat.id] = function (risposta) {
                                        password = risposta.text;
                                        db.all(sql, [], (err, rows) => {
                                            if (err)
                                                console.error(err.message);
                                            db.run(query, [username, password], (err) => {
                                                if (err)
                                                    console.error(err.message);
                                                ok_reg = true;
                                                bot.sendMessage(msg.chat.id, "Registered correctly <b>"+ username +"</b>\n'login':\n/login premi qua o nella keyboard ",{ parse_mode: "HTML" });

                                            });
                                        });
    
                                    }
                                });
                            }
                        });
    }
///////////////////////////////////////////////
    bot.onText(/\/login/, (msg) => {
        Login(msg);
    });
///////////////////////////////////////////////
    function Login(msg) {
        var username;
        var password;
        var risposte = {};
        var query = "SELECT * FROM utente WHERE username=? AND password=?";
        bot.on('message', function (mess) {
            var callback = risposte[mess.chat.id];
            if (callback) {
                delete risposte[mess.chat.id];
                return callback(mess);
            }
        });
        bot.sendMessage(msg.chat.id, "Username:").then(function () {
            risposte[msg.chat.id] = function (risposta) {
                username = risposta.text;
                bot.sendMessage(msg.chat.id, "Password:").then(function () {
                    risposte[msg.chat.id] = function (risposta) {
                        password = risposta.text;
                        db.all(query, [username, password], (err, rows) => {
                            if (err) {
                                console.error(err.message);
                            }
                            for (let i = 0; i < rows.length; i++) {
                                if (rows[i].username == username && rows[i].password == password) {
                                    ok_log = true;
                                    bot.sendMessage(msg.chat.id, "Hi <b>"+ username + "</b>!\n/help for commands", { parse_mode: "HTML" });
                                    return;
                                }
                                else{
                                    if(rows[i].username != username && rows[i].password == password||rows[i].username == username && rows[i].password != password||rows[i].username != username && rows[i].password != password){
                                    //ok_log = false;
                                    bot.sendMessage(msg.chat.id,"error",{ parse_mode: "HTML" });
                                    return;
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }
/////////////////////////////////////
    bot.onText(/\/logout/, (msg) => {
        ok_log = false;
        options= {
            "reply_markup":{
                "keyboard": [
                    ['/login'],
                    ['/register'],
                ]
            }
        };
        bot.sendMessage(msg.chat.id, "Log-out done;choose one of the options on the fixed keyboard:", options);
    });

bot.onText(/\/film (.+)/,function(msg,match,options){
    var film=match[1];//primo risultato cercato
    var chatId=msg.chat.id;
    if(ok_log==true){
    request(`http://www.omdbapi.com/?apikey=bef9e638&t=${film}`,function(error,response,body){//http://www.omdbapi.com/?i=tt3896198&apikey=bef9e638 //problema link HTTP per selezionare il film
        if(!error && response.statusCode==200){//in caso di errore caricamento
            bot.sendMessage(chatId,'Looking for the film..',{parse_mode:'Markdown'})
            .then(function(){
                var res=JSON.parse(body);
                //bot.sendMessage(chatId,'Title: '+ res.Title +'\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released );
                bot.sendPhoto(chatId,res.Poster,{caption:'Result: \nTitle: '+ res.Title +'\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released + '\nLanguage: ' + res.Language + '\nCountry: ' + res.Country + '\nGenre: '  + res.Genre + '\nRating: ' + res.imdbRating + '\nProduction: ' + res.Production + '\nBoxOffice: ' + res.BoxOffice + '\nDirector: '+ res.Director +  '\nWriter: ' + res.Writer + '\nActors: '+ res.Actors + '\nAwards: ' + res.Awards + '\nFor streaming site: /streaming'});
            })
        bot.onText(/\/streaming/,function(msg){//https://ww2.123movies.la/
        var chatId=msg.chat.id;
        request(`https://ww2.123movies.la/`,function(error,response){
        if(!error && response.statusCode==200){//in caso di errore caricamento
                bot.sendMessage(chatId,"<a href=\"https://ww2.123movies.la/\">Streaming site</a>",
                {
                    parse_mode:"HTML"
                });
            }});
        });
        }
        });
    }
    else{
        bot.sendMessage(chatId,"You need to login/register!",
        {
            parse_mode:"HTML",
        });
        options= {
            "reply_markup":{
                "keyboard": [
                    ['/login'],
                    ['/register']
                ]
            }
        };
    }
    bot.sendMessage(chatId, "Choose one of the options on the fixed keyboard:", options);
    },
    );