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
            procedureId: req.params.id
            // active: true
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
**  VERSION
*/
router.put('/activeversion/:id', function(req, res, next) {
    // variable declarations
    var number = req.body.number;
    var title = req.body.title;
    var effectiveDate = req.body.effectiveDate;
    var reviewDate = req.body.reviewDate;
    var approved = req.body.approved;
    var procedureId = req.body.procedureId;
    
    // update the specified record and set active to true
    models.Version.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(version) {
        if(version) {
            version.updateAttributes({
                number: number,
                title: title,
                effectiveDate: effectiveDate,
                reviewDate: reviewDate,
                approved: approved,
                active: true
            }).then(function(version) {
                // set active to false for all other records related to this procedure (if any) where it is currently true
                // try removing 'return' and using res.send to return the response; might fix page reload problem
                models.Version.update(
                    {
                        active: false
                    }, {
                        where: {
                            procedureId: procedureId,
                            id: {
                                ne: req.params.id
                            },
                            active: true
                        }
                    }
                );
                res.send(version);
            });   
        }
    });
});

router.post('/version', function(req, res, next) {
    var procedureId = req.body.procedureId;
    var title = req.body.title;
    var number = req.body.number;
    var effectiveDate = req.body.effectiveDate;
    var reviewDate = req.body.reviewDate;
    models.Version.create({
        procedureId: procedureId,
        title: title,
        number: number,
        effectiveDate: effectiveDate,
        reviewDate: reviewDate
    })
    .then(function(data) {
        res.send(data);
    });
});

router.put('/version/:id', function(req, res, next) {
    var number = req.body.number;
    var title = req.body.title;
    var effectiveDate = req.body.effectiveDate;
    var reviewDate = req.body.reviewDate;
    var approved = req.body.approved;
    var active = req.body.active;
    models.Version.findById(req.params.id)
    .then(function(version) {
        if(version) {
            version.updateAttributes({
                number: number,
                title: title,
                effectiveDate: effectiveDate,
                reviewDate: reviewDate,
                approved: approved,
                active: active
            }).then(function(version) {
                res.send(version);         
            });   
        }
    });
});

router.get('/versions/:id', function(req, res, next) {
    // query database for version information related to the id in the parameter string
    models.Procedure.findOne({
        attributes: ['id', 'title'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.Version,
                attributes: ['id', 'number', 'title', 'effectiveDate', 'active'],
            }
        ]
    }).then(function(data) {
        res.send(data);
    });
});

router.get('/version/:id/edit', function(req, res, next) {
    // query the database for the details of the version related to the id in the parameter string
    models.Version.findOne({
        attributes: ['id', 'number', 'title', 'effectiveDate', 'reviewDate', 'approved', 'active', 'procedureId', 'userId', 'approvalId'],
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.send(data);
    });
});

/*
*   INSTRUCTION
*/
router.get('/instructioncount/:id', function(req, res, next) {
    // count the number of instructions associated with the specified version
    models.Instruction.count({
        where: {
            versionId: req.params.id
        }
    }).then(function(data) {
        res.send(data.toString());
    });
});

router.post('/instruction', function(req, res, next) {
    var order = req.body.order;
    var instruction = req.body.instruction;
    var image = req.body.image;
    var imageCaption = req.body.imageCaption;
    var versionId = req.body.versionId;
    models.Instruction.create({
        order: order,
        instruction: instruction,
        image: image,
        imageCaption: imageCaption,
        versionId: versionId
    }).then(function(data) {
        res.send(data);
    }); 
});

router.get('/instructions/:id', function(req, res, next) {
    // query the database and return version info, procedure title, and all associated instructions
    models.Version.findOne({
        attributes: ['id', 'number'],
        where: {
            id: req.params.id
        },
        order: [
            [models.Instruction, 'order', 'ASC']
        ],
        include: [
            {
                model: models.Procedure,
                attributes: ['id', 'title']
            },
            {
                model: models.Instruction,
                attributes: ['id', 'order', 'instruction', 'image', 'imageCaption'],
                required: false
            }    
        ]
    }).then(function(version) {
        res.send(version); 
    });
});

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