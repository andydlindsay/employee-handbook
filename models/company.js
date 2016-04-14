"use strict";

module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.define(
        'Company',
        {
            name: {
                type: DataTypes.STRING
            },
            shortName: {
                type: DataTypes.STRING
            },
            slogan: {
                type: DataTypes.STRING
            },
            about: {
                type: DataTypes.TEXT
            },
            logo: {
                type: DataTypes.STRING
            },
            vision: {
                type: DataTypes.TEXT
            },
            mission: {
                type: DataTypes.TEXT
            },
            value: {
                type: DataTypes.TEXT
            },
            letter: {
                type: DataTypes.TEXT
            }
        },{
            freezeTableName: true
        }
    );
    return Company;
};