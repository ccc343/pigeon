import alt from '../alt';
import xr from 'xr';

const actions = alt.createActions(class UserActions {

  constructor() {
    this.generateActions(
      'handleSubscribe',
      'handleUnsubscribe',
      'handleNewTag',
      'setCurrentUser'
    );
  }

  subscribe(tagId) {
    xr.post('/api/subscribe', {
      tagId: parseInt(tagId)
    })
      .then(res => {
        console.log(res);
        console.log('subscribe to ' + tagId);
        actions.handleSubscribe(tagId);
      });
  }

  unsubscribe(tagId) {
    xr.post('/api/unsubscribe', {
      tagId: parseInt(tagId)
    })
      .then(res => {
        console.log(res);
        actions.handleUnsubscribe(tagId);
      });
  }

  newTag(name, description) {
    xr.post('/api/new_tag', {
      name: name,
      description: description
    })
      .then(res => {
        console.log(res);
        actions.handleNewTag(res.tag);
      });
  }

  createOrg(domain, name, description, callback) {
    xr.post('/api/new_organization', {
      domain: domain,
      name: name,
      description: description
    })
      .then(function(res) {
        console.log(res);
        if (res.error) {
          return callback(res.error);
        }
      });
  }

  signup(email, callback) {
    xr.post('/api/sign_up', { email: email })
      .then(function(res) {
        console.log(res);
        if (res.error) {
          return callback(res.error);
        }

        actions.setCurrentUser(res.user);
      });
  }

  login(email, callback) {
    xr.post('/api/log_in', { email: email })
      .then(function(res) {
        console.log(res);
        if (res.error) {
          return callback(res.error);
        }

        actions.setCurrentUser(res.user);
      });
  }

  logout(callback) {
    xr.post('/api/log_out')
      .then(function(res) {
        console.log(res);
        if (res.error) {
          return callback(res.error);
        }

        actions.setCurrentUser(null);
      });
  }

});

export default actions;
