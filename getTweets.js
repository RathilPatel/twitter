const pool=require("./databaseConfig").pool;

exports.sendTweets=function getTweets(offset,res){
    var selectTweets={
        name:"selectTweets",
        text:'select img,name,screenname,tweets,mstart as start ,mend as end , murl as media_url, type as typeofmedia from tweets  offset $1 limit 10 ',
        values:[offset]
      };


      pool.query(selectTweets,function(error,result){
        if(error){
          console.log(error);
          res.json(error);
        }else{
 
         // console.log("data pull",result.rows);
          console.log("return result is ",result.rows.length);
          res.json(result.rows);
        }
      });
}

//query to get result---> select screenname , sum(points)  from tweets group by screenname order by sum desc