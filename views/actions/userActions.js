import alt from '../alt';
import xr from 'xr';

const actions = alt.createActions(class UserActions {

  constructor() {
    this.generateActions(
      'setTags',
      'handleSubscribe',
      'handleUnsubscribe'
    );

    this.updateTags();
  }

  updateTags() {
    xr.get('/api/tags/all')
      .then(res => {
        let tags = {};
        res.data.forEach(tag => {
          tags[tag.tag_id] = { name: tag.name, description: tag.description };
        });

        xr.get('/api/tags/subscribed')
        .then(res => {
          res.data.forEach(tagId => {
            tags[tagId].subscribed = true;
          });

          actions.setTags(tags);
        });
    });
  }

  subscribe(tagId) {
    xr.post('/api/subscribe', { tagId: parseInt(tagId) })
      .then(res => { actions.handleSubscribe(tagId) });
  }

  unsubscribe(tagId) {
    xr.post('/api/unsubscribe', { tagId: parseInt(tagId) })
      .then(res => { actions.handleUnsubscribe(tagId) });
  }

  createTag(name, description) {
    xr.post('/api/tags/new', { name: name, description: description })
      .then(res => { actions.updateTags() });
  }

});

export default actions;
