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
		let content = { name: data.userName };
		let secretOrPrivateKey = '15484631214vhgjfyt';
		let token = jwt.sign(content, secretOrPrivateKey, {
			expiresIn: 60*15*1
		})
		var r = result.createResult(success, { token: token }, 2000);
		res.json(r);
	});
});
// userInfo
router.get('/info', function (req, res) {
	var userName = req.query.username;
	console.log('users===', req.query.username)
	userDAO.userInfo(userName, function (success, data) {
		var r = result.createResult(success, data, 2000);
		res.json(r);
	});
});
// 退出
router.post('/logout', function (req,res) {
	var r = result.createResult(true, null, 2000)
	res.json(r)
})

/* list users */
router.get('/', function (req, res) {
	console.log('list users called');
	userDAO.list(function (users) {
		res.json(result.createResult(true, users));
	});
});

/* get user */
router.get('/:id', function (req, res) {
	var id = req.params.id;
	console.log('get user called, id: ' + id);
	userDAO.getById(id, function (user) {
		res.json(result.createResult(true, user));
	});
});

/* delete user */
router.delete('/:id', function (req, res) {
	var id = req.params.id;
	console.log('delete user called, id=' + id);
	userDAO.deleteById(id, function (success) {
		res.json(result.createResult(success, null));
	});
});


/* update users */
router.put('/:id', function (req, res) {
	console.log('update users called');
	var user = req.body;
	user.id = req.params.id;
	console.log(user);
	userDAO.update(user, function (success) {
		var r = result.createResult(success, null);
		res.json(r);
	});
});

/* patch users */
router.patch('/:id', function (req, res) {
	console.log('patch users called');
	userDAO.getById(req.params.id, function (user) {
		var username = req.body.username;
		if (username) {
			user.username = username;
		}
		var password = req.body.password;
		if (password) {
			user.password = password;
		}
		console.log(user);
		userDAO.update(user, function (success) {
			var r = result.createResult(success, null);
			res.json(r);
		});
	});
});

module.exports = router;
