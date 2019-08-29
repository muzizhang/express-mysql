var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
	// 注册
	register: function (params, callback) {
		console.log('注册param====', params)
		pool.query(userSqlMap.register, [params.username, params.pwd], function (error, result) {
			if (error) throw error;
			callback(result.affectedRows > 0);
		})
	},
	// 登录
	login: function (user, callback) {
		pool.query(userSqlMap.add, [user.username, user.pwd], function (error, result) {
			if (error) throw error;
			if (result.length > 0 ) {
				callback(true, result)
			} else {
				callback(false, null);
			}
		});
	},
	// 获取用户信息
	userInfo: function (username, callback) {
		pool.query(userSqlMap.userInfo, [username], function (error, result) {
			if (error) throw error;
			callback(result);
		});
	},
	list: function (callback) {
		pool.query(userSqlMap.list, function (error, result) {
			if (error) throw error;
			callback(result);
		});
	},
	getById: function (id, callback) {
		pool.query(userSqlMap.getById, id, function (error, result) {
			if (error) throw error;
			console.log(result[0]);
			callback(result[0]);
		});
	},
	deleteById: function (id, callback) {
		pool.query(userSqlMap.deleteById, id, function (error, result) {
			if (error) throw error;
			callback(result.affectedRows > 0);
		});
	},
	update: function (user, callback) {
		pool.query(userSqlMap.update, [user.username, user.password, user.id], function (error, result) {
			if (error) throw error;
			callback(result.affectedRows > 0);
		});
	}
};