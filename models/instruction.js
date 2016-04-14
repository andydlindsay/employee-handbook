"use strict";

module.exports = function(sequelize, DataTypes) {
    var Instruction = sequelize.define(
        'Instruction',
        {
            order: {
                type: DataTypes.INTEGER
            },
            instruction: {
                type: DataTypes.TEXT
            },
            image: {
                type: DataTypes.STRING
            },
            imageCaption: {
                type: DataTypes.STRING
            },
            video: {
                type: DataTypes.STRING
            }
        },{
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Instruction.belongsTo(models.Version, {
                       foreignKey: {
                           name: 'versionId'
                       } 
                    });
                }
            }
        }
    );
    return Instruction;
};