import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Profile';
import MyProfilePage from '../pages/MyProfile';
import OrganizationPage from '../pages/Organization';
import SettingsPage from '../pages/Settings';
import CreatePost from '../pages/CreatePost';
import UserPage from '../pages/User';
import EventsPage from '../pages/Events';
import UsersPage from '../pages/Users';
import ProductsPage from '../pages/Products';
import OrganizationsPage from '../pages/Organizations';
import NotificationsPage from '../pages/Notifications';
import NotFoundPage from '../pages/NotFoundPage';
import OrganizationsCreatePage from '../pages/OrganizationsCreate';
import { setUser, hideAuthPopup } from '../actions';
import { initNotificationsListeners } from '../actions/siteNotifications';
import { getToken, removeToken } from '../utils/token';
import { fetchMyself } from '../actions/users';
import api from '../api';
import Loading from './Loading';
import Header from './Header';
import SignUp from '../pages/SignUp';
import Page from './Page';
import Post from '../pages/Post';
import Popup from './Popup';
import Auth from './Auth';
import Notifications from './Notifications';
// import socket from '../api/socket';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.restoreSession();
    this.props.initNotificationsListeners();
    // socket.connect();
  }

  restoreSession() {
    const token = getToken();

    this.setState({ loading: true });

    this.props.fetchMyself();

    api.getMyself(token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      })
      .catch(() => {
        removeToken();
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

        <div id="portal-root" />
        {!this.state.loading && (
          <Router history={this.props.history}>
            <Page>
              <Header />

              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/my-profile" component={MyProfilePage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/notifications" component={NotificationsPage} />
                <Route path="/user/:id" component={UserPage} />
                <Route path="/posts/new/:postTypeId" component={CreatePost} />
                <Route path="/posts/:id/edit" component={CreatePost} />
                <Route exact path="/posts/:id" component={Post} />
                <Route path="/events" component={EventsPage} />
                <Route path="/users" component={UsersPage} />
                <Route exact path="/products" component={ProductsPage} />
                <Route exact path="/organizations" component={OrganizationsPage} />
                <Route exact path="/organizations/new" component={OrganizationsCreatePage} />
                <Route exact path="/organizations/:id" component={OrganizationPage} />
                <Route exact path="/organizations/:id/edit" component={OrganizationsCreatePage} />
                <Route component={NotFoundPage} />
              </Switch>

              {this.props.auth.showPopup && (
                <Popup onClickClose={() => this.props.hideAuthPopup()}>
                  <Auth onClickClose={() => this.props.hideAuthPopup()} />
                </Popup>
              )}

              <Notifications />
            </Page>
          </Router>
        )}
      </Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func,
  auth: PropTypes.objectOf(PropTypes.any),
  hideAuthPopup: PropTypes.func,
  initNotificationsListeners: PropTypes.func,
};

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data)),
    fetchMyself: () => dispatch(fetchMyself()),
    hideAuthPopup: () => dispatch(hideAuthPopup()),
    initNotificationsListeners: () => dispatch(initNotificationsListeners()),
  }),
)(App);
