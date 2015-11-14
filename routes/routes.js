// 'use strict';

// var Organization = require('../models/organization');
// var Tag = require('../models/tag');

// var currentOrg = new Organization('princeton.edu', null, null);

// exports.config = function(app) {

//   app.post('/api/get_tag_users', function(req, res) {
//     const tag = new Tag(req.body.tagId, (err, result) => {
//       if (err) {
//         return res.sendStatus(500);
//
}

//       tag.getUsers((err, result) => {
//         res.json({
//           error: err,
//           users: result
//         });
//       });
//     });
//   });

//   // Returns all tags in the organization.
//   app.get('/api/tags/all', function(req, res) {
//     currentOrg.getAllTags((err, result) => {
//       if (err) {
//         return res.sendStatus(500);
//       }

//       res.json({ data: result });
//     });
//   });

//   app.post('/api/tags/new', function(req, res) {
//     Tag.create(req.body.name, req.body.description, (err, result) => {
//       if (err) {
//         return res.sendStatus(500);
//       }

//       currentOrg.addTag(result, (err, result) => {
//         if (err) {
//           return res.sendStatus(500);
//         }

//         res.json({ success: true });
//       });
//     });
//   });

// }
