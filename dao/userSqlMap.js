var userSqlMap = {
  register: 'insert into user(userName, pwd) values(?, ?)',
  add: 'select * from user where username = ? and password = ?',
  deleteById: 'delete from users where id = ?',
  update: 'update users set username=?, password=? where id=?',
  list: 'select * from users',
  getById: 'select * from users where id = ?'
};

module.exports = userSqlMap;