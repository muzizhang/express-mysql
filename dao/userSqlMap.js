var userSqlMap = {
  register: 'insert into user(userName, pwd, status) values(?, ?, 1)',
  add: 'select * from user where userName = ? and pwd = ?',
  userInfo: 'select * from user where userName = ?',
  category: 'SELECT category FROM good',
  createGood: 'insert into good(`name`, category, price, inventory, shopName, address, shelves, `desc`, picture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
  goodList: 'select * from good',
  racking: 'update good set shelves = ? where id = ?',
  deleteGood: 'delete from good where id = ?',
  getUserList: 'select * from user',
  userIsDisable: 'update user set status = ? where userName = ?',
  userDetail: 'update user set sex = ?, avatar = ?, email = ?, phone = ?, birthday = ?, nickname = ? where userName = ?',
  editPassword: 'update user set pwd = ? where userName = ?',
  currentUser: 'select * from user where userName = ?',
  shop: 'insert into shop(shopName, address) values(?, ?)',
  shopList: 'select * from shop'
  // deleteById: 'delete from user where id = ?',
  // update: 'update user set username=?, pwd=? where id=?',
  // list: 'select * from user',
  // getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;