var Twitter=require('twitter');
//const pool=require("./databaseConfig").pool;
var express =require("express");
var bodyParser=require("body-parser");
var path=require("path");
var tweetsdetails=require("./getTweets");
var winner=require("./findWinner");
var app =express();
var database=require('./database');
app.listen(8080,function(){
  console.log("server started at 8080 port");
});

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(logger);


//set static path
app.use(express.static(path.join(__dirname,'public')));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/views/index.html");
});


app.get("/winner",function(req,res){
 // console.log(req);
  res.sendFile(__dirname+"/views/winner.html");
});

app.get("/gettweets",function(req,res){
    var offset=req.query.startFrom;
    console.log(offset);
    database.getdata(offset,res);
   //tweetsdetails.sendTweets(offset,res);
})

app.get("/winlist",function(req,res){
    winner.sendMysqlWinner(res);
})


app.use("/myadmin",function(req,res){
  
  database.getdata(res);
});

app.use(function(req,res){
  res.redirect('/');
});

//code that contains confidentials code
var client=new Twitter({

	consumer_key:'BEq9XXyfTefQcM0kHXBVCZkeu',
	consumer_secret:'WBJl9qgndFEXpNiGFXuB0r2yypKfLf199Be9vVJuEnU37UqGA3',
	access_token_key:'3142473504-hT3jfeuFzYe2tejzo51K6wkK5vt5sUyy0hzoEiF',
	access_token_secret:'L0t0TTEJzHSZftVc1ArE0A7OdjsJXdRV7vtyluduasYZy'
});


// code to filter tweets
// client.stream('statuses/filter', {track: '@mozillaclubcrce,#frcrce,#crce,#drivetodevelop'},  function(stream) {
//   stream.on('data', function(tweet) {
   
//    console.log(tweet);
//     //check if the tweet are not retweets
//     if(tweet.retweeted || !tweet.retweeted){
//       //check if tweet contains media
//       var insertTweets;
//       if(typeof(tweet.entities.media)=="object"){
//         var data=tweet.entities.media[0];
//         var media=data.media_url;
//         var media_start=data.indices[0];
//         var media_end=data.indices[1];
//         var typeofphoto=data.type;
//         insertTweets={
//           name:"insert-tweets",
//           text:'insert into tweets(tweets,screenname,name,img,descp,points,addedate,tid,murl,mstart,mend,type) values ($1::text,$2::text,$3::text,$4::text,$5::text,$6::integer,LOCALTIMESTAMP,$7::bigint,$8::text,$9::text,$10::text,$11::text);',
//           values:[tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url_http,tweet.user.description,1,tweet.id,media,media_start,media_end,typeofphoto]
//         };
//       }
//       else{
//         insertTweets={
//           name:"insert-tweets",
//           text:'insert into tweets(tweets,screenname,name,img,descp,points,addedate,tid) values ($1::text,$2::text,$3::text,$4::text,$5::text,$6::integer,LOCALTIMESTAMP,$7::bigint);',
//           values:[tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url_https,tweet.user.description,1,tweet.id]
//         };
//       }
      	

//       pool.query(insertTweets,function(error,result){
//         if(error){
//           console.log(error);
//         }else{
//           console.log(tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url_https,tweet.user.description,1,tweet.id);
//         }
//       });
//     }

//   });

//   stream.on('error', function(error) {
//     console.log("error",error);
//   });
// });	
//database.insertdata("mentoring @ java","","tweet.user.name","tweet.user.profile_image_url_https","tweet.user.description",1,null,null,null,null,"13566");

//

client.stream('statuses/filter', {track: '#unscriptinstacontest,#unscript2k19,#unscript,#hackathon,#agnelcrcebandra,#frcrce,#codeforfood,#innovativeindia,#coding,#coderlife,#codetowin,#webdeveloper,#frcrcebandra,#bandraworlisealink,#codinglife,#engineer,#design,#software,#creativity,#engineerslife,#designing,#stepstowardssuccess,#happycoding,#codingdaries,#codebuster,#machinelearning,#mlforhealthcare,#skinzy,#developerlife,#struggleforsuccess,#hackathonfood'},  function(stream) {
  stream.on('data', function(tweet) {
   
    console.log("tweet-->",tweet);
    //check if the tweet are not retweets
    if(tweet.retweeted || !tweet.retweeted){
      //check if tweet contains media
      var insertTweets;
      if(typeof(tweet.entities.media)=="object"){
        var data=tweet.entities.media[0];
        var media=data.media_url;
        var media_start=data.indices[0];
        var media_end=data.indices[1];
        var typeofphoto=data.type;
        database.insertdata(tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url,tweet.user.description,1,media,media_start,media_end,typeofphoto,tweet.id);
      }
      else{
        console.log(tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url_https,tweet.user.description,1,tweet.id);
        database.insertdata(tweet.text,tweet.user.screen_name,tweet.user.name,tweet.user.profile_image_url,tweet.user.description,1,null,null,null,null,tweet.id);
      }
        
    }

  });

  stream.on('error', function(error) {
    console.log("error",error);
  });

});









