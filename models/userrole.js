"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserRole = sequelize.define(
        'UserRole',
        {
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    UserRole.belongsTo(models.User, {
                        foreignKey: {
                            name: 'userId'
                        }
                    });
                    UserRole.belongsTo(models.Role, {
                        foreignKey: {
                            name: 'roleId'
                        }
                    });
                }
            }
        }
    );
    return UserRole;
};