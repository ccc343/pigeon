import React from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import uiStore from '../stores/uiStore';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      learnMore: false
    };

    this.onClickLearnMore = this.onClickLearnMore.bind(this);
  }

  onClickLearnMore() {
    this.setState({ learnMore: true });
  }

  render() {
    return (
      <div id="login">
        <div className="row">
          <div className="span4 offset4 text-center">
            <img className="space-2" src="/posh.png" alt=""/>
          </div>
        </div>

        <div className="row">
          <div className="span6 offset3 text-center">
            <h1 className="text-grey">no more listservs.</h1>
            <p className="space-2 text-normal"><b>
              Pigeon is a <span className="text-red">tag-based mailing list for your organization</span>. Subscribe to the tags that interest you, and Pigeon will do the rest, ensuring that only emails you care about reach your inbox.
            </b></p>

          <VelocityTransitionGroup
            enter={{
              animation: 'slideDown',
              duration: 500
            }}
          >
            { this.state.learnMore ? (
              <div>
                <p className="space-2 text-normal">
                  <b>
                    Listservs are beyond outdated. Pigeon is a dynamic, streamlined mailing list solution: with Pigeon, you can receive less spam and manage your lists with ease. Best of all, it’s completely free to use, and we don’t store any of your personal data!
                  </b>
                </p>
                <p className="space-2 text-normal"><b>
                  To advertise an event or opportunity to a targeted audience &mdash; send emails with Pigeon! Download our Chrome extension (COMING SOON)!
                </b></p>
              </div>
              ) : null }
          </VelocityTransitionGroup>
          </div>
        </div>

        <div className="row">
          <div className="span4 offset4 text-center">
            <p className="text-red">{uiStore.getState().loginError}</p>
          </div>
        </div>

        <div className="row">
          <div className="span6 offset3 text-center">

            { !this.state.learnMore ? (
              <div className="btn" onClick={this.onClickLearnMore}>
                <b>Learn more</b>
              </div>
            ) : null }

            <a className="btn btn-primary" href="/auth/google">
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
