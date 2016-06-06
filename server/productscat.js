var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('SELECT id, name, family, description, image__c AS image, productPage__c AS productPage, publishDate__c AS publishDate FROM salesforce.product2 WHERE family=name ORDER BY name ');
};

function findByFamily(family) {
    return db.query('SELECT id, name, family, description, image__c AS image, productPage__c AS productPage, publishDate__c AS publishDate FROM salesforce.product2 WHERE family=$1', [name], true);
};

function getAll(req, res, next) {
    findAll(20)
        .then(function (products) {
            return res.send(JSON.stringify(products));
        })
        .catch(next);
};

function getByFamily(req, res, next) {
    var name = req.params.name;
    findByFamily(name)
        .then(function (name) {
            return res.send(JSON.stringify(name));
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findByFamily = findByFamily;
exports.getAll = getAll;
exports.getByFamily = getByFamily;
