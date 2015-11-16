import alt from '../alt';
import xr from 'xr';

const actions = alt.createActions(class UserActions {

  constructor() {
    this.generateActions(
      'setCurrentUser',
      'addTag',
      'updateTag'
    );
  }

  subscribe(id) {
    xr.post('/api/subscribe', {
      id: id
    })
      .then(res => {
        console.log(res);
        actions.updateTag({
          id: id,
          subscribed: true,
          users: res.users
        });
      });
  }

  unsubscribe(id) {
    xr.post('/api/unsubscribe', {
      id: id
    })
      .then(res => {
        console.log(res);
        actions.updateTag({
          id: id,
          subscribed: false,
          users: res.users
        });
      });
  }

  newTag(name, description) {
    xr.post('/api/new_tag', {
      name: name,
      description: description
    })
      .then(res => {
        console.log(res);
        actions.addTag(res.tag);
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
    xr.post('/api/sign_up', {
      email: email
    })
      .then(function(res) {
        console.log(res);
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
