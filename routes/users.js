var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');
var result = require('../model/result');
var jwt =  require('jsonwebtoken');

// 注册
router.post('/register', function (req, res) {
	const params = req.body;
	userDAO.register(params, function (success) {
		const r = result.createResult(success, null, 2000);
		res.json(r)
	})
})
/* 登录 */
router.post('/login', function (req, res) {
	var user = req.body;
	userDAO.login(user, function (success, data) {
		data = JSON.parse(JSON.stringify(data))
		let secretOrPrivateKey = '15484631214vhgjfyt';
		let content = { name: data[0].userName }
		let token = jwt.sign(content, secretOrPrivateKey, {
			expiresIn: 60*15*1
		})
		var r = result.createResult(success, { token: token }, 2000);
		res.json(r);
	});
});
// userInfo
router.get('/info', function (req, res) {
	var token = jwt.decode(req.query.token)
	userDAO.userInfo(token.name, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	});
});
// 退出
router.post('/logout', function (req,res) {
	var r = result.createResult(true, null, 2000)
	res.json(r)
})
// 商品分类列表
router.get('/category', function(req, res) {
	userDAO.category(function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	});
})
// 创建商品
router.post('/createGood', function(req, res) {
	const params = req.body
	console.log('创建商品', params)
	userDAO.createGood(params, function (success) {
		const r = result.createResult(success, null, 2000);
		res.json(r)
	})
})
// 商品列表
router.get('/goodList', function(req, res) {
	userDAO.goodList(function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})
// 商品是否上架
router.post('/good/racking', function(req, res) {
	const params = req.body
	userDAO.racking(params, function(success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})
// 删除商品
router.delete('/good/:id', function (req, res) {
	var id = req.params.id;
	userDAO.deleteGood(id, function (success) {
		res.json(result.createResult(success, null, 2000));
	});
});
// 获取用户
router.get('/userList', function(req, res) {
	userDAO.getUserList(function (success, data) {
		var r = result.createResult(success, data, 2000);
		console.log('user====', r)
		res.json(r);
	})
})
// 是否禁用用户
router.get('/userIsDisable', function (req, res) {
	const params = req.query
	userDAO.userIsDisable(params, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})
// 修改用户信息
router.patch('/userDetail', function (req, res) {
	userDAO.userDetail(req.body, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	});
});
// 修改密码
router.post('/editPassword', function (req, res) {
	userDAO.editPassword(req.body, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	});
})
// 获取当前用户信息
router.get('/currentUser', function (req, res) {
	userDAO.currentUser(req.query.username, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})
// 创建商铺
router.post('/shop', function (req, res) {
	userDAO.shop(req.body, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})
// 商铺列表
router.get('/shopList', function (req, res) {
	userDAO.shopList(function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	})
})

/* list users */
// router.get('/', function (req, res) {
// 	console.log('list users called');
// 	userDAO.list(function (users) {
// 		res.json(result.createResult(true, users));
// 	});
// });

/* get user */
// router.get('/:id', function (req, res) {
// 	var id = req.params.id;
// 	console.log('get user called, id: ' + id);
// 	userDAO.getById(id, function (user) {
// 		res.json(result.createResult(true, user));
// 	});
// });

/* delete user */
// router.delete('/:id', function (req, res) {
// 	var id = req.params.id;
// 	console.log('delete user called, id=' + id);
// 	userDAO.deleteById(id, function (success) {
// 		res.json(result.createResult(success, null));
// 	});
// });


/* update users */
// router.put('/:id', function (req, res) {
// 	console.log('update users called');
// 	var user = req.body;
// 	user.id = req.params.id;
// 	console.log(user);
// 	userDAO.update(user, function (success) {
// 		var r = result.createResult(success, null);
// 		res.json(r);
// 	});
// });

/* patch users */
// router.patch('/:id', function (req, res) {
// 	console.log('patch users called');
// 	userDAO.getById(req.params.id, function (user) {
// 		var username = req.body.username;
// 		if (username) {
// 			user.username = username;
// 		}
// 		var password = req.body.password;
// 		if (password) {
// 			user.password = password;
// 		}
// 		console.log(user);
// 		userDAO.update(user, function (success) {
// 			var r = result.createResult(success, null);
// 			res.json(r);
// 		});
// 	});
// });

module.exports = router;
