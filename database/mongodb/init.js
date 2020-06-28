db = db.getSiblingDB('codenamesDB');

db.rooms.createIndex({ updated_at: 1 }, { expireAfterSeconds: 3600 * 24 });
