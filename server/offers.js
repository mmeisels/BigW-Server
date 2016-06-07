var db = require('./pghelper'),
    winston = require('winston');

function findAll(limit) {
  console.log ('Orders = ' + req.userId);
    return db.query("SELECT id, sfId, name, startDate, endDate, description, image__c AS image, campaignPage__c AS campaignPage, publishDate__c AS publishDate FROM salesforce.campaign WHERE type='Offer' AND (Target_Preferences__c=(SELECT size__c FROM salesforce.contact WHERE id=(select max(id) from salesforce.contact)) OR Target_Preferences__c=(SELECT preference__c FROM salesforce.contact WHERE id=(select max(id) from salesforce.contact))) AND status='In Progress' ORDER BY publishDate DESC LIMIT $1", [limit]);
};

function findById(id) {
    // Retrieve offer either by Salesforce id or Postgress id
    return db.query('SELECT id, sfId, name, startDate, endDate, description, image__c AS image, campaignPage__c AS campaignPage, publishDate__c AS publishDate FROM salesforce.campaign WHERE ' + (isNaN(id) ? 'sfId' : 'id') + '=$1', [id], true);
};

function getAll(req, res, next) {
    findAll(20)
        .then(function (offers) {
            console.log(JSON.stringify(offers));
            return res.send(JSON.stringify(offers));
        })
        .catch(next);
};

function getById(req, res, next) {
    var id = req.params.id;
    findById(id)
        .then(function (offer) {
            console.log(JSON.stringify(offer));
            return res.send(JSON.stringify(offer));
        })
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.getAll = getAll;
exports.getById = getById;
