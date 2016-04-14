"use strict";

// table name: Category
// desc: these are the main categories of the handbook and will be displayed in the Table of Contents
// columns 
// title: the title of the Category; should be proper caps (Table of Contents)
// order: the order in which the Category will be displayed in the Table of Contents
// image: an image associated with the Category
// active: is the Category active?
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define(
        'Category',
        {
            title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
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
        },{
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    Category.hasMany(models.Section, {
                        foreignKey: {
                            name: 'categoryId'
                        }
                    });
                }
            }
        }
    );
    return Category;
};
