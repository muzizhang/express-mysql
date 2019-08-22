var userSqlMap = {
  register: 'insert into user(userName, pwd) values(?, ?)',
  add: 'insert into user(userName, pwd) values(?, ?)',
  deleteById: 'delete from users where id = ?',
  update: 'update users set username=?, password=? where id=?',
  list: 'select * from users',
  getById: 'select * from users where id = ?'
};

module.exports = userSqlMap;