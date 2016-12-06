import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App';
import LogInPage from './containers/LogInPage';
import MainPage from './containers/MainPage';
import TextChatPage from './containers/TextChatPage';
import UsersListPage from './containers/UsersListPage'
import CallPage from './containers/CallPage'
import IncomingCallPage from './containers/IncomingCallPage'

import configureStore from './store/configureStore'

const store = configureStore();
const routerHistory = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={routerHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={LogInPage}></IndexRoute>
          <Route path="incoming_call" component={IncomingCallPage}></Route>
          <Route path="call" component={CallPage}></Route>
          <Route path="login" component={LogInPage}></Route>
          <Route path="main" component={MainPage}>
            <Route path="users_list" component={UsersListPage}></Route>
            <Route path="text_chat" component={TextChatPage}></Route>
            <Route path="call" component={CallPage}></Route>
            <Route path="incoming_call" component={IncomingCallPage}></Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const App = require('./containers/App').default;
    render(
      <AppContainer>
	      <Provider store={store}>
          <Router history={routerHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={LogInPage}></IndexRoute>
              <Route path="login" component={LogInPage}></Route>
              <Route path="main" component={MainPage}>
                <Route path="users_list" component={UsersListPage}></Route>
                <Route path="text_chat" component={TextChatPage}></Route>
                <Route path="call" component={CallPage}></Route>
                <Route path="incoming_call" component={IncomingCallPage}></Route>
              </Route>
            </Route>
          </Router>
	       </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
