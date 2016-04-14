"use strict";

// table name: Section
// desc: these are the sections of each chapter
// title: the title of the Section; should be proper caps (Table of Contents)
// order: the order in which the Section will be displayed
// image: an image associated with the Section
// active: is the Section active?
module.exports = function(sequelize, DataTypes) {
    var Section = sequelize.define(
        'Section',
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
            image: {
                type: DataTypes.STRING
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Section.belongsTo(models.Category, {
                        foreignKey: {
                            name: 'categoryId'
                        }
                    });
                    Section.hasMany(models.Procedure, {
                        foreignKey: {
                            name: 'sectionId'
                        }
                    });
                }
            }
        }
    );
    return Section;
};

