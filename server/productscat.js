var db = require('./pghelper'),
    config = require('./config'),
    winston = require('winston');

function findAll(limit) {
    return db.query('SELECT id, name, family, description, image__c AS image, productPage__c AS productPage, publishDate__c AS publishDate FROM salesforce.product2 WHERE family=name ORDER BY name ');
};

function findByFamily(name) {
    return db.query('SELECT id, name, family, description, image__c AS image, productPage__c AS productPage, publishDate__c AS publishDate FROM salesforce.product2 WHERE family=$1', [name], true);
};

function findById(id) {
    return db.query('SELECT id, name, description, image__c AS image, productPage__c AS productPage, publishDate__c AS publishDate FROM salesforce.product2 WHERE id=$1', [id], true);
};

function getAll(req, res, next) {
    findAll(20)
        .then(function (products) {
            return res.send(JSON.stringify(products));
        })
        .catch(next);
};
function getById(req, res, next) {
    var id = req.params.id;
    findById(id)
        .then(function (product) {
            return res.send(JSON.stringify(product));
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
exports.findById = findById;
exports.getById = getById;
exports.findByFamily = findByFamily;
exports.getAll = getAll;
exports.getByFamily = getByFamily;
