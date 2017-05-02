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
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//详情
function getAllUsers2(id,alla,callback){
	pool.getConnection(function(err, conn){
		sql = "select * from list where id like '%' ? '%' and alla like '%' ? '%'";
		conn.query(sql,[id,alla],function(err,result){
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

router.get('/lists',function(res,sql){
	var id = res.query.id;
	var alla = res.query.alla;
	console.log(id);
	console.log("into list...");
	getAllUsers2(alla,id,function(err,results){
		console.log(results);
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});


//详情获取
function getAllU(id,callback){
	pool.getConnection(function(err, conn){
		var sql = "select * from list where id = ?";
		conn.query(sql,[id],function(err,result){
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

router.get('/lisd',function(res,sql){
	var id = res.query.id;
	console.log(id);
	console.log("into list..."); 
	getAllU(id,function(err,results){
		console.log(results);
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});

//个人页面修改
function getAllUs(id,callback){
	pool.getConnection(function(err, conn){
		var sql = "select * from user where id = ?";
		conn.query(sql,[id],function(err,result){
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

router.get('/liss',function(res,sql){
	var id = res.query.id;
	console.log(id);
	console.log("into list..."); 
	getAllUs(id,function(err,results){
		console.log(results);
		if(err){
			sql.send(err); 
		}else if(results){
			console.log('>>>'+results);
			sql.send(results);
		}
	});
});




//修改alla

function av(alla,id,callback){
	pool.getConnection(function(err, conn){
		var sql = "update list set alla= ? where id=?";
		conn.query(sql,[alla,id],function(err,result){
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
//

router.get('/xiulla',function(res,sql){
	var id = res.query.id;
	var alla = res.query.alla;
	console.log(alla);
	console.log("into list...");
	
		av(alla,id,function(err,result){
			console.log("result:"+result);
			if(err){
				sql.send({flag:2})
			}else if(result){
				console.log(result)
				sql.send({flag:1})
			}
				//修改成功
		})

});



//上传图片
router.post('/right',function(req,res){
	console.log("into shangc...");
	//创建IncomingForm对象；
	var form = new formidable.IncomingForm();
	//设置上传图片的文件夹， 可以使用fs.rename()来改变上传图片的路径
	form.uploadDir = "public/upload/temp/";
	form.parse(req,function(error,fields,files){
		for(var i in files){
			var file = files[i];
			var fName = (new Date()).getTime();
			switch(file.type){
				case "image/jpeg":
				fName = fName + ".jpeg";
				break;
				
				case "image/png":
				fName = fName + ".png";
				break;
			}
			
			var newPath = "public/upload/"+fName;
			fs.renameSync(file.path,newPath); //重命名
			res.send({fName});
		}
	})
});

//修改按钮
function getAllUgai(username,password,tel,email,nick,imageTou,id,callback){
	pool.getConnection(function(err, conn){
		var sql = "update user set username=?,password=?,tel=?,email=?,nick=?,imageTou=? where id=?";
		conn.query(sql,[username,password,tel,email,nick,imageTou,id],function(err,result){
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

router.post('/click',function(res,sql){
	var username = res.body.username;
	var password = res.body.password;
	var tel = res.body.tel;
	var email = res.body.email;
	var nick = res.body.nick;
	var imageTou = res.body.imageTou;
	var id=Number(res.body.id);
	console.log("into baocun");
	
	getAllUgai(username,password,tel,email,nick,imageTou,id,function(err,result){
		if(result.changedRows>0){
			console.log("result:"+result);
			sql.send({flag:1})	//注册成功
		}
	})
	
})





//点击修改爱情
function getAllUs(id,callback){
	pool.getConnection(function(err, conn){
		var sql = "select * from user where id = ?";
		conn.query(sql,[id],function(err,result){
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

function ave(id,love,callback){
	pool.getConnection(function(err, conn){
		var sql = "update list set id=?,love=? where id=?";
		conn.query(sql,[id,love],function(err,result){
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

//

router.get('/aiqing',function(res,sql){
	var id = res.query.id;
	var love = res.query.love;
	console.log(love);
	console.log("into list...");
	getAllUs(id,function(err,results){
		ave(id,love,function(err,result){
			console.log("result:"+result);
			res.send({flag:1})	//注册成功
		})
	});
});



module.exports = router;
