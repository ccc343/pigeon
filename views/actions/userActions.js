import xr from 'xr';
import alt from '../alt';
import tagsActions from './tagsActions';

const actions = alt.createActions(class UserActions {

  constructor() {
    this.generateActions(
      'setCurrentUser'
    );
  }

  subscribe(id, callback) {
    xr.post('/api/subscribe', {
      id: id
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        tagsActions.updateTag({
          id: id,
          subscribed: true,
          users: res.users
        });
        callback(null, id);
      });
  }

  unsubscribe(id, callback) {
    xr.post('/api/unsubscribe', {
      id: id
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        tagsActions.updateTag({
          id: id,
          subscribed: false,
          users: res.users
        });
        callback();
      });
  }

  newTag(name, description, callback) {
    xr.post('/api/new_tag', {
      name: name,
      description: description
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        tagsActions.addTag(res.tag);
        actions.subscribe(res.tag.id, callback);
      });
  }

  createOrg(domain, name, description, callback) {
    xr.post('/api/new_organization', {
      domain: domain,
      name: name,
      description: description
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }
        callback();
      });
  }

  signup(email, callback) {
    xr.post('/api/sign_up', {
      email: email
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        actions.setCurrentUser(res.user);
        callback();
      });
  }

  login(email, callback) {
    xr.post('/api/log_in', {
      email: email
    })
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        actions.setCurrentUser(res.user);
        go('/tags');
        callback();
      });
  }

  logout() {
    xr.post('/api/log_out')
      .then(function(res) {
        actions.setCurrentUser(null);
      });
  }

});

export default actions;
