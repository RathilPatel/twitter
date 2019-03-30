const {Pool}=require("pg");
const config={
 	host:"35.200.240.149",
 	username:"postgres",
 	password:"root123",
 	database:"twitter"
 };
var connectionString="postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database;
console.log(connectionString);
exports.pool=new Pool({
	connectionString:connectionString
});
//35.200.240.149