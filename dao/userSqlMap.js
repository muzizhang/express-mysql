var userSqlMap = {
  register: 'insert into user(userName, pwd) values(?, ?)',
  add: 'select * from user where userName = ? and pwd = ?',
  userInfo: 'select * from user where userName = ?',
  deleteById: 'delete from user where id = ?',
  update: 'update user set username=?, pwd=? where id=?',
  list: 'select * from user',
  getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;