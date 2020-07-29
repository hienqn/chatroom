const users = [];

function userJoin(id, username, room) {
  const user = {id, username, room};
  users.push(user);
  console.log('all users', users);
  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}


module.exports = {
  userJoin, getCurrentUser
}