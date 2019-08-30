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
			callback(result.affectedRows > 0, result[0]);
		});
	},
	// 商品分类
	category: function (callback) {
		pool.query(userSqlMap.category, function(error, result) {
			if (error) throw error;
			callback(true, result);
		})
	},
	// 创建商品
	createGood: function (params, callback) {
		pool.query(userSqlMap.createGood, [
			params.name, params.category, params.price, params.inventory, params.shopName,
			params.address, params.shelves, params.desc, params.picture.length === 0 ? '' : params.picture
		], function(error, result) {
			if (error) throw error;
			callback(true, result);
		})
	},
	// 商品列表
	goodList: function (callback) {
		pool.query(userSqlMap.goodList, function(error, result) {
			if (error) throw error;
			console.log('result======goodList', result)
			callback(true, result);
		})
	},
	// 商品是否上架
	racking: function (params, callback) {
		pool.query(userSqlMap.racking, [params.shelves, params.id], function(error, result) {
			if (error) throw error;
			console.log('result======deleteGood', result)
			callback(result.affectedRows > 0);
		})
	},
	// 删除商品
	deleteGood: function (id, callback) {
		pool.query(userSqlMap.deleteGood, id, function(error, result) {
			if (error) throw error;
			console.log('result======deleteGood', result)
			callback(result.affectedRows > 0);
		})
	},
	// 获取用户
	getUserList: function (callback) {
		pool.query(userSqlMap.getUserList, function(error, result) {
			if (error) throw error;
			console.log('result======getUserList', result)
			callback(true, result);
		})
	},
	// 是否禁用用户
	userIsDisable: function (params, callback) {
		pool.query(userSqlMap.userIsDisable, [params.status, params.username], function (error, result) {
			if (error) throw error;
			console.log('result======userIsDisable', result)
			callback(true, result);
		})
	},
	// 修改用户信息
	userDetail: function (params, callback) {
		pool.query(userSqlMap.userDetail, [
			params.sex, params.avatar, params.email,
			params.phone, params.birth, params.nickname, params.userName
		], function (error, result) {
			if (error) throw error;
			console.log('result======userDetail', result)
			callback(true, result);
		})
	},
	// 修改密码
	editPassword: function (params, callback) {
		pool.query(userSqlMap.editPassword, [params.pwd, params.username], function (error, result) {
			if (error) throw error;
			console.log('result======editPassword', result)
			callback(true, result);
		})
	},
	// 获取当前用户信息
	currentUser: function (username, callback) {
		pool.query(userSqlMap.currentUser, username, function (error, result) {
			if (error) throw error;
			console.log('result======editPassword', result)
			callback(true, result);
		})
	},
	// 创建商铺
	shop: function (params, callback) {
		pool.query(userSqlMap.shop, [params.shopName, params.address], function (error, result) {
			if (error) throw error;
			console.log('result======editPassword', result)
			callback(true, result);
		})
	},
	// 商铺列表
	shopList: function (callback) {
		pool.query(userSqlMap.shopList, function (error, result) {
			if (error) throw error;
			console.log('result======editPassword', result)
			callback(true, result);
		})
	}
	// list: function (callback) {
	// 	pool.query(userSqlMap.list, function (error, result) {
	// 		if (error) throw error;
	// 		callback(result);
	// 	});
	// },
	// getById: function (id, callback) {
	// 	pool.query(userSqlMap.getById, id, function (error, result) {
	// 		if (error) throw error;
	// 		console.log(result[0]);
	// 		callback(result[0]);
	// 	});
	// },
	// deleteById: function (id, callback) {
	// 	pool.query(userSqlMap.deleteById, id, function (error, result) {
	// 		if (error) throw error;
	// 		callback(result.affectedRows > 0);
	// 	});
	// },
	// update: function (user, callback) {
	// 	pool.query(userSqlMap.update, [user.username, user.password, user.id], function (error, result) {
	// 		if (error) throw error;
	// 		callback(result.affectedRows > 0);
	// 	});
	// }
};