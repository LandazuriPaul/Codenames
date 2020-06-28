db = db.getSiblingDB('codenamesDB');

db.createUser({
  user: 'api',
  pwd: 'api-password',
  roles: ['readWrite'],
});
