var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'971025',		//mYsql安装设置的密码
	database:'zgF4',	//数据库名称
	port:'3306'		//端口号
})


router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//发布按钮
router.post('/release',function(req,res){
	console.log("into zhuce...");
	var title = req.body.titl;
	var content = req.body.conten;
	var start = Number(req.body.star);
	var love = req.body.lov;
	var alla = Number(req.body.allaaa);
	console.log(alla);
	
	save(title,content,start,love,alla,function(err,result){
		if(result.insertId>0){
			console.log("result:"+result);
			res.send({flag:1})	//注册成功
		}
	})
	
		
});

//插入数据
function save(title,content,start,love,alla,callback){
	pool.getConnection(function(err,conn){
		var sql = "insert into list(title,content,start,love,alla) value (?,?,?,?,?)";
		conn.query(sql,[title,content,start,love,alla],function(err,result){
			if(err){
				console.log('Error:'+err.message);
				return;
			}
			
			conn.release();
			console.log("[getUserByName]");
			callback(err,result);
		})
		
	})
}








module.exports = router;
