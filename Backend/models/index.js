const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User")(sequelize, DataTypes);
const Task = require("./Task")(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

sequelize.sync().then(() => console.log('Database is synced.'));

module.exports = {
	sequelize,
	User,
	Task
};
