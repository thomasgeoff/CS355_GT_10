var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    // stored procedure to call
    var query = 'CALL address_getall();';

    // call the stored procedure
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO address (street, zip_code) VALUES (?,?)';

    var queryData = [params.street, params.zip_code];

    connection.query(query, queryData, function(err,result) {
        callback(err, result);
    });
};

exports.getinfo = function(address_id, callback) {
    var query = 'CALL address_getinfo(?)';
    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE address SET zip_code = ?, street = ? WHERE address_id = ?';

    var queryData = [params.zip_code, params.street, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};

