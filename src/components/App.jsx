import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import MyProfilePage from '../pages/MyProfile';
import SettingsPage from '../pages/Settings';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import Posts from '../pages/Posts';
import UserPage from '../pages/User';
import NotFoundPage from '../pages/NotFoundPage';
import { setUser } from '../actions';
import { getToken } from '../utils/token';
import { getMyself } from '../api';
import Loading from './Loading';
import Header from './Header';
import SignUp from '../pages/SignUp';
import Page from './Page';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.restoreSession();
  }

  restoreSession() {
    const token = getToken();

    this.setState({ loading: true });

    if (token) {
      getMyself(token)
        .then((data) => {
          this.props.setUser(data);
          this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

        {!this.state.loading && (
          <Router history={this.props.history}>
            {this.props.history.location.pathname === '/404' ? (
              <Route path="/404" component={NotFoundPage} />
            ) : (
              <Page>
                <Header />

                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/my-profile" component={MyProfilePage} />
                  <Route path="/settings" component={SettingsPage} />
                  <Route path="/user/:id" component={UserPage} />
                  <Route path="/posts/new" component={CreatePost} />
                  <Route path="/posts/edit" component={EditPost} />
                  <Route path="/posts" component={Posts} />
                  <Route component={() => <Redirect to="/404" />} />
                </Switch>
              </Page>
            )}

          </Router>
        )}
      </Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func,
};

export default connect(null, dispatch => ({
  setUser: data => dispatch(setUser(data)),
}))(App);
