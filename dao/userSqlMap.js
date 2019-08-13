var userSqlMap = {
    add: 'insert into users(username, password) values(?, ?)',
    deleteById: 'delete from users where id = ?',
    update: 'update users set username=?, password=? where id=?',
    list: 'select * from users',
    getById: 'select * from users where id = ?'
};

module.exports = userSqlMap;