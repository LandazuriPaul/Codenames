db = db.getSiblingDB('codenames');

db.createUser({
  user: 'api',
  pwd: 'api-password',
  roles: ['readWrite'],
});
