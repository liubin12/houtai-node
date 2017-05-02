var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();

//连接数据库
var pool = mysql.createPool({
	host:'127.0.0.1',		//
	user:'root',			//数据库名 默认root
	password:'971025',		//mYsql安装设置的密码
	database:'zgF4',	//数据库名称
	port:'3306'		//端口号
})

//支持跨域
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//登录
	//查询是否有这条信息
function getUserByName(uname,callback){
	pool.getConnection(function(err, conn){    
		var sql = "select * from user where username = ?";
		conn.query(sql,[uname],function(err,result){
			console.log('result:'+result);
		if(err){
			console.log('getAllUsers Error:'+err.message);
				return;
		}
			conn.release(); //释放连接
			callback(err,result)
			
		})
	})
}



//具体登录方法
router.post('/entry',function(req,res){
	console.log("into denglu...");
	var username = req.body.username;
	var password = req.body.password;
	console.log("username:"+username+"password:"+password)
	getUserByName(username,function(err,result){
		console.log("username:"+username+"password:"+password);
		if(result.length==0){
			res.send({flag:2})  //用户名不存在
		}else if(result.length>0){
			if(password==result[0].password){
				res.send({flag:1,result:result}) //登录成功
			}else if(password!=result[0].password){
				res.send({flag:3})  //密码错误
			}
		}else{
			res.send({flag:4});  //登录失败
		}
	})
	
})	
	

//注册
//查询信息
function getUserBy(uname,callback){
	pool.getConnection(function(err, conn){    
		console.log("into zhuce...")
		var sql = "select * from user where username = ?";
		conn.query(sql,[uname],function(err,result){
			console.log('result:'+result);
		if(err){
			console.log('getAllUsers Error:'+err.message);
				return;
		}
			conn.release(); //释放连接
			callback(err,result)
			
		})
	})
}

//注册按钮
router.post('/zhuce',function(req,res){
	console.log("into zhuce...");
	var username = req.body.username;
	var password = req.body.password;
	var tel = req.body.tel;
	var email = req.body.email;
	var nick = req.body.nick;
	
	var start = req.body.start;
	
	getUserBy(username,function(err,result){
		if(result==""||result==null){
			save(username,password,tel,email,nick,start,function(err,result){
				if(result.insertId>0){
					console.log("result:"+result);
					res.send({flag:1})	//注册成功
				}
			})
		}else if(result!="" || result!=null){
			res.send({flag:2})   //用户名被占用
		 }else{
			res.send({flag:3}) //失败
		}
	});
});

//插入数据
function save(username,password,tel,email,nick,start,callback){
	pool.getConnection(function(err,conn){
		var sql = "insert into user(username,password,tel,email,nick,start) value (?,?,?,?,?,?)";
		conn.query(sql,[username,password,tel,email,nick,start],function(err,result){
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