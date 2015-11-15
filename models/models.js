var bookshelf = require('./bookshelf');

exports.Tag = bookshelf.Model.extend({
  tableName: 'tags',
  users: function() {
    return this.belongsToMany(exports.User);
  },
  organization: function() {
    return this.belongsTo(exports.Organization);
  }
});

exports.User = bookshelf.Model.extend({
  tableName: 'users',
  tags: function() {
    return this.belongsToMany(exports.Tag);
  },
  organization: function() {
    return this.belongsTo(exports.Organization);
  }
});

exports.Organization = bookshelf.Model.extend({
  tableName: 'organizations',
  users: function() {
    return this.hasMany(exports.User);
  },
  tags: function() {
    return this.hasMany(exports.Tag);
  }
});
