var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');
var company_dal = require('../dal/company_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    company_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('company/company_view_all',{companies: result});
        }

    })
});
/*router.get('/add',function (req, res) {
   res.render('company/company_add');
});*/

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('company/company_add', {address_result: result[0]});
        }
    });
});
/*router.get('/edit', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('company/companyUpdate', {address_result: result[0]});
        }
    });
});*/
router.get('/edit', function(req, res){
    company_dal.getinfo(req.query.company_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('company/companyUpdate',
                {company: result[0][0], address_result: result[1]}
            );
        }
    });
});

router.get('/insert',function (req, res) {
    company_dal.insert(req.query, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/company/all');
        }
    });
});



router.get('/update', function(req, res) {
    company_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/company/all');
        }
    });
});

module.exports = router;