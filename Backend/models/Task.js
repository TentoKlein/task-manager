module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define("Task", {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: DataTypes.TEXT,
		status: {
			type: DataTypes.ENUM("pending", "completed"),
			defaultValue: "pending"
		},
		dueDate: {
      type: DataTypes.DATE
         },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
         }
    });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: "userId"
     });
    };

  return Task;
};
