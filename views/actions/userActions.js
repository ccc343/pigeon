import xr from 'xr';
import alt from '../alt';
import {go} from '../router/router';

const actions = alt.createActions(class UserActions {

  constructor() {
    this.generateActions(
      'setCurrentUser',
      'addTag',
      'updateTag'
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

        actions.updateTag({
          id: id,
          subscribed: true,
          users: res.users
        });
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

        actions.updateTag({
          id: id,
          subscribed: false,
          users: res.users
        });
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

        actions.addTag(res.tag);
        actions.subscribe(res.tag.id);
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
      });
  }

  logout(callback) {
    xr.post('/api/log_out')
      .then(function(res) {
        if (res.error) {
          return callback(res.error);
        }

        go('/login', function() {
          actions.setCurrentUser(null);
        })
      });
  }

});

export default actions;
