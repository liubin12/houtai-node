var express = require('express');
var mysql = require('mysql');
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
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//
////获取纯列表
//function getAllUser(callback){
//	pool.getConnection(function(err, conn){
//		var sql = "select * from user";
//		conn.query(sql,function(err,result){
//			console.log('result:'+result);
//			if(err){
//				console.log('getAllUsers Error:'+err.message);
//				return;
//			}
//			
//			conn.release(); //释放连接
//			callback(err,result)
//			
//		})
//	})
//}
//
//router.get('/lists',function(res,sql){
//	console.log("into lisefghrgfdsg...");
//	getAllUser(function(err,results){
//		if(err){
//			sql.send(err); 
//		}else if(results){
//			console.log('>>>'+results);
//			sql.send(results);
//		}
//	});
//});



//获取纯列表
function getAllUser(alla,callback){
	pool.getConnection(function(err, conn){
		var sql = "select * from list where alla = ?";
		conn.query(sql,[alla],function(err,result){
			console.log('result:'+result);
			if(err){
				console.log('getAllUsers Error:'+err.message);
				return;
			}
			
			conn.release(); //释放连接
			callback(err,result);
		})
	})
}

router.get('/listall',function(res,sql){
	
	var alla = res.query.allaa;
	console.log("into lisefghrgfdsg...");
	getAllUser(alla,function(err,results){
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});

//获取列表
function getAllUsers(start,alla,callback){
	pool.getConnection(function(err, conn){
		//var sql = "select * from user where username like '%' ? '%'";
		sql = "select * from list where start like '%' ? '%' and alla like '%' ? '%'";
		//var sql = "select * from list where start = ? and where alla = ?";
		conn.query(sql,[start,alla],function(err,result){
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

router.get('/list',function(res,sql){
	console.log("into list...");
	var start = res.query.start;
	var alla = res.query.alla;
	getAllUsers(start,alla,function(err,results){
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});



//审核页面
function getAllU(alla,callback){
	pool.getConnection(function(err, conn){
		var sql = "select * from list where alla = ?";
		conn.query(sql,[alla],function(err,result){
			console.log('result:'+result);
			if(err){
				console.log('getAllUsers Error:'+err.message);
				return;
			}
			
			conn.release(); //释放连接
			callback(err,result);			
		})
	})
}

router.get('/Auditing',function(res,sql){
	console.log("into Auditing...");
	var alla = res.query.alla;
	
	getAllU(alla,function(err,results){
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});



//搜索列表
function getAll(title,callback){
	pool.getConnection(function(err,conn){
		var sql = "select * from list where title like '%' ? '%'";
		conn.query(sql,[title],function(err,result){
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

router.get('/search',function(res,sql){
	var title = res.query.title;
	console.log("asdjasdi>>>>>");
	console.log(title);
	getAll(title,function(err,result){
		if(err){
			console.log('getAllUsers Error:'+err.message);
			return;
		}else if(result){
			console.log("result:"+result);
			sql.send(result)	//获取成功
		}
	})
})



module.exports = router;
