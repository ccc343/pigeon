import alt from '../alt';
import xr from 'xr';

const actions = alt.createActions(class AuthActions {

  constructor() {
    this.generateActions(
      'setCurrentUser',
      'setCurrentOrganization'
    );
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
