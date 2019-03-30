var mysql = require('mysql');



// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   //Insert a record in the "customers" table:
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
 

exports.getdata= function(offset,res){

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "twitterdata",charset:"utf8mb4"
	});
	con.connect(function(error){

	  if(error){
	  	console.log(error);
	    return res.json(error);
	  }else{
	    console.log("connected");
	    var sql="select * from tweets limit 10 offset "+offset;
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

exports.insertdata=(text,screen_name,name,profileurl,desp,point,media,media_start,media_end,typeofphoto,id)=>{
	var sql=`INSERT INTO tweets(tweets,screenname, name, img, descp,points, addedate, murl, mstart, mend, type, tid)
			VALUES ('${text}', '${screen_name}', '${name}', '${profileurl}', '${desp}', '${point}', NOW(), '${media}', '${media_start}', '${media_end}', '${typeofphoto}', '${id}');
			`;
	console.log(sql);

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "twitterdata",
	  charset:"utf8mb4"
	});

	con.connect(function(error){

		if(error){
			console.log(error);
		}else{

			con.query(sql,function(error,result){
				if(error){
					console.log("insert error message is -->",error);
				}else{
					console.log("insert result",result);
				}

				con.end();
			});

		}
	});
}

