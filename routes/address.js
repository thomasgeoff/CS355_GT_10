var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    address_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('address/address_view_all',{address: result});
        }

    })
});
router.get('/add',function (req, res) {
    res.render('address/address_add');
});

router.get('/insert',function (req, res) {
    address_dal.insert(req.query, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/address/all');
        }
    });
});


module.exports = router;