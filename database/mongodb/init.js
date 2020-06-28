db = db.getSiblingDB('codenamesDB');

db.rooms.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 3600 * 24 });
