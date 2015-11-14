var bookshelf = require('./bookshelf');

exports.Tag = bookshelf.Model.extend({
  tableName: 'tags',
  users: function() {
    return this.belongsToMany(User);
  },
  organization: function() {
    return this.belongsTo(Organization);
  }
});

exports.User = bookshelf.Model.extend({
  tableName: 'users',
  tags: function() {
    return this.belongsToMany(Tag);
  },
  organization: function() {
    return this.belongsTo(Organization);
  }
});

exports.Organization = bookshelf.Model.extend({
  tableName: 'organizations',
  users: function() {
    return this.hasMany(User);
  },
  tags: function() {
    return this.hasMany(Tag);
  }
});
