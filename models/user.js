"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        'User',
        {
            email: {
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    notEmpty: true
                }
            }
        },{
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Version, {
                        foreignKey: {
                            name: 'userId'
                        },
                        as: 'author'
                    });
                    User.hasMany(models.Version, {
                        foreignKey: {
                            name: 'approvalId'
                        },
                        as: 'approver'
                    });
                }
            }
        }
    );
    return User;
};
