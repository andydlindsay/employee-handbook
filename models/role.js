"use strict";

module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define(
        'Role',
        {
            name: {
                type: DataTypes.STRING
            },
            desc: {
                type: DataTypes.STRING
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            freezeTableName: true,
            associate: function(models) {
                Role.hasMany(models.UserRole, {
                    foreignKey: {
                        name: 'roleId'       
                    }
                });
            }
        }
    );
    return Role;
};