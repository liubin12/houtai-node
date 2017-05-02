var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var formidable = require('formidable');
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
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



router.post('/shanc',function(req,res){	
	var id=req.body.id;
	console.log(id)
	shanchu(id,function(err,result){
		if(err){
			err={flag:2}//删除失败
		}else{
			res.send({flag:1,result:result})
		}
	});
})

function shanchu(id,callback){//uname1传下面?
	pool.getConnection(function(err,conn){		
		var sql='delete from list where id =?';
		conn.query(sql,[id],function(err,result){		
			console.log("result:"+result);
			if(err){
				console.log('getw Error:'+err.message)
				return;
			}
			conn.release();
			callback(err,result);
		})
	})	
}













module.exports = router;

