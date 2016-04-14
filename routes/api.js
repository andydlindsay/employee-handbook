var express = require('express');
var router = express.Router();
var models = require('../models');

/* 
*   CATEGORY
*/
router.post('/category', function(req, res, next) {
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var image = req.body.image || '';
    var active = req.body.active;
    models.Category.create({
        title: title,
        desc: desc,
        order: order,
        image: image,
        active: active
    })
    .then(function(category) {
        res.send(category);
    });
});

router.get('/categorycount', function(req, res, next) {
    models.Category.count({
        where: {
            active: true
        }
    })
    .then(function(catcount) {
        res.send(catcount.toString());
    }); 
});

router.get('/category', function(req, res, next) {
// get all active categories from database
    models.Category.findAll(
    {
        attributes: ['id', 'title', 'desc', 'order'],
        where: {
            active: true
        },
        order: [
            ['order', 'ASC']
        ]
    }
    )
    .then(function(categories) {
        res.send(categories);
    });
});

router.get('/category/:id/edit', function(req, res, next) {
    models.Category.findOne(
    {
        attributes: ['id', 'title', 'desc', 'order', 'image', 'active'],
        where: {
            id: req.params.id
        }
    }    
    )
    .then(function(category) {
        res.send(category);
    }); 
});

router.put('/category/:id', function(req, res, next) {
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var image = req.body.image || '';
    var active = req.body.active;
    models.Category.find({
        where: {
            id: req.params.id
        }
    }).then(function(category) {
        if(category) {
            category.updateAttributes({
                title: title,
                desc: desc,
                order: order,
                image: image,
                active: active
            }).then(function(category) {
                res.send(category);
            });
        }
    });
});

router.delete('/category/:id', function(req, res, next) {
    models.Category.destroy({
        where: {
            id: req.params.id
        }   
    }).then(function(category) {
        res.send(category.toString());
    });
});

/* 
*   SECTION
*/
router.get('/category/:id', function(req, res, next) {
// query database for category information related to the id in the parameter string
    models.Category.findOne(
    {
        attributes: ['id', 'title', 'desc'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.Section,
                attributes: ['id', 'title', 'desc']
            }
        ],
        order: [
            [models.Section, 'order', 'ASC']    
        ]
    }
    )
    .then(function(categories) {
        res.send(categories);
    });
});

router.delete('/section/:id', function(req, res, next) {
    models.Section.destroy({
        where: {
            id: req.params.id
        }   
    }).then(function(data) {
        res.send(data.toString());
    });
});

router.get('/sectioncount/:id', function(req, res, next) {
    models.Section.count({
        where: {
            categoryId: req.params.id,
            active: true
        }
    })
    .then(function(seccount) {
        res.send(seccount.toString());
    }); 
});

router.post('/section', function(req, res, next) {
    var categoryId = req.body.categoryId;
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var image = req.body.image || '';
    var active = req.body.active;
    models.Section.create({
        categoryId: categoryId,
        title: title,
        desc: desc,
        order: order,
        image: image,
        active: active
    })
    .then(function(data) {
        res.send(data);
    });
});

router.put('/section/:id', function(req, res, next) {
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var image = req.body.image || '';
    var active = req.body.active;
    models.Section.find({
        where: {
            id: req.params.id
        }
    }).then(function(section) {
        if(section) {
            section.updateAttributes({
                title: title,
                desc: desc,
                order: order,
                image: image,
                active: active
            }).then(function(section) {
                res.send(section);
            });
        }
    });
});

router.get('/section/:id/edit', function(req, res, next) {
    models.Section.findOne(
    {
        attributes: ['id', 'title', 'desc', 'order', 'image', 'active'],
        where: {
            id: req.params.id
        }
    }    
    )
    .then(function(section) {
        res.send(section);
    }); 
});

/*
*   PROCEDURE
*/
router.get('/section/:id', function(req, res, next) {
    // query database for section information related to the id in the parameter string
    models.Section.findOne(
    {
        attributes: ['id', 'title', 'desc'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.Procedure,
                attributes: ['id', 'title', 'desc']
            }    
        ]
    }
    ).then(function(data) {
            res.send(data);
        }
    );
});

router.get('/procedure/:id/edit', function(req, res, next) {
    models.Procedure.findOne(
    {
        attributes: ['id', 'title', 'desc', 'order', 'active'],
        where: {
            id: req.params.id
        }
    }    
    )
    .then(function(data) {
        res.send(data);
    }); 
});

router.put('/procedure/:id', function(req, res, next) {
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var active = req.body.active;
    models.Procedure.find({
        where: {
            id: req.params.id
        }
    }).then(function(procedure) {
        if(procedure) {
            procedure.updateAttributes({
                title: title,
                desc: desc,
                order: order,
                active: active
            }).then(function(data) {
                res.send(data);
            });
        }
    });
});

router.post('/procedure', function(req, res, next) {
    var sectionId = req.body.sectionId;
    var title = req.body.title;
    var desc = req.body.desc;
    var order = req.body.order;
    var active = req.body.active;
    models.Procedure.create({
        sectionId: sectionId,
        title: title,
        desc: desc,
        order: order,
        active: active
    })
    .then(function(data) {
        res.send(data);
    });
});

router.get('/versioncount/:id', function(req, res, next) {
    models.Version.count({
        where: {
            procedureId: req.params.id,
            active: true
        }
    })
    .then(function(data) {
        res.send(data.toString());    
    }); 
});

router.get('/procedurecount/:id', function(req, res, next) {
    models.Procedure.count({
        where: {
            sectionId: req.params.id,
            active: true
        }
    })
    .then(function(data) {
        res.send(data.toString());
    }); 
});

router.delete('/procedure/:id', function(req, res, next) {
    models.Procedure.destroy({
        where: {
            id: req.params.id
        }   
    }).then(function(data) {
        res.send(data.toString());
    });
});

/*
*   INSTRUCTION
*/
router.get('/procedure/:id', function(req, res, next) {
    // query database for instruction information related to the id in the parameter string
    models.Procedure.findOne(
        {
            attributes: ['id', 'title', 'desc'],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models.Version,
                    attributes: ['id', 'number', 'effectiveDate', 'reviewDate', 'approved'],
                    where: {
                        active: true
                    },
                    required: false,
                    include: [
                        {
                            model: models.Instruction,
                            attributes: ['id', 'order', 'instruction', 'image', 'imageCaption', 'video'],
                            required: false
                        },
                        {
                            model: models.User,
                            as: 'author',
                            attributes: ['id', 'firstName', 'lastName'],
                            required: false
                        },
                        {
                            model: models.User,
                            as: 'approver',
                            attributes: ['id', 'firstName', 'lastName'],
                            required: false
                        }
                    ],
                    order: [
                        [models.Instruction, 'order', 'ASC']    
                    ]
                }
            ]
        }
    ).then(function(procedure) {
            res.send(procedure);
        }
    );
});

module.exports = router;