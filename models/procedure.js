'use strict';

// Procedure model
// fields: id, sectionId, title, desc, order, active, timestamps

module.exports = function(sequelize, DataTypes) {
    var Procedure = sequelize.define(
        'Procedure',
        {
            title: {
                type: DataTypes.STRING
            },
            desc: {
                type: DataTypes.TEXT
            },
            order: {
                type: DataTypes.INTEGER
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Procedure.belongsTo(models.Section, {
                        foreignKey: {
                            name: 'sectionId'
                        }
                    });
                    Procedure.hasMany(models.Version, {
                        foreignKey: {
                            name: 'procedureId'
                        }
                    });
                }
            }
        }
    );
    return Procedure;
};