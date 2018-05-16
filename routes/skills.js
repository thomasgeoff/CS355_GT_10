var express = require('express');
var router = express.Router();
var skills_dal = require('../dal/skills_dal');

/* GET USERS LISTING */
router.get('/all', function(req, res, next) {
    skills_dal.getAll(function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('skills/skills_view_all', {skills: result[0
                    ]});
        }
    })
});

router.get('/add/', function(req,res) {
    res.render('skills/skills_add');
});

router.get('/insert', function(req,res) {
    skills_dal.insert(req.query, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/skills/all');
        }
    });
});

router.get('/edit', function(req, res) {
    skills_dal.getinfo(req.query.skill_id, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.render('skills/skillsUpdate', {skills:
                    result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    skills_dal.update(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/skills/all');
        }
    });
});

module.exports = router;
