"use strict";

module.exports = function(sequelize, DataTypes) {
    var Version = sequelize.define(
        'Version',
        {
            number: {
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.STRING
            },
            effectiveDate: {
                type: DataTypes.DATE
            },
            reviewDate: {
                type: DataTypes.DATE
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },{
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Version.belongsTo(models.Procedure, {
                        foreignKey: {
                            name: 'procedureId'
                        }
                    });
                    Version.belongsTo(models.User, {
                        foreignKey: {
                            name: 'userId'
                        },
                        as: 'author'
                    });
                    Version.belongsTo(models.User, {
                        foreignKey: {
                            name: 'approvalId'
                        },
                        as: 'approver'
                    });
                    Version.hasMany(models.Instruction, {
                        foreignKey: {
                            name: 'versionId'
                        }
                    });
                }
            }
        }
    );
    return Version;
};