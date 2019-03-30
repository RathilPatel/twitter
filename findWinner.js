const pool=require("./databaseConfig").pool;

exports.sendWinner=function getWinner(res){
    // var selectWin={
    //     name:"selectWinner",
    //     text:'select name,screenname , sum(points)  from tweets group by screenname,name order by sum desc',
    //     values:[]
    //   };


    //   pool.query(selectWin,function(error,result){
    //     if(error){
    //       console.log(error);
    //     }else{
 
    //      // console.log("data pull",result.rows);
    //       console.log("return result is ",result.rows.length);
    //       res.json(result.rows);
    //     }
    //   });
}

exports.sendMysqlWinner=function getWinner(res){
  var mysql=require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "twitterdata",
    charset:"utf8mb4"
  });
  con.connect(function(error){

    if(error){
      throw res.json(error);
    }else{
      var sql="select name,screenname,sum(points) as points from tweets GROUP BY screenname,name order by points desc";
      con.query(sql,function(error,result){
        if(error){
          con.end();
          return res.send(error);
        }else{
          con.end();
          return res.json(result);
        }
      });
    }

  }); 

}

//query to get result---> select screenname , sum(points)  from tweets group by screenname order by sum desc