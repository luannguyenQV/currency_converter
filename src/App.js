import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'

import Home from './modules/home/containers/Home'
import About from './modules/about/containers/About'

import homeReducer from './modules/home/reducers'

injectTapEventPlugin()

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    home: homeReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { open: false };
  }

  _toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  _closeDrawer = () => {
    this.setState({ open: false })
  }

  render () {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <ConnectedRouter history={history}>
            <div className="main">
              <IconButton
                iconStyle={{ width: 30, height: 30 }}
                style={{ width: 60, height: 60, padding: 10 }}
                onTouchTap={this._toggleDrawer}
              >
                <ActionHome />
              </IconButton>
              <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
              >
                <MenuItem onTouchTap={this._closeDrawer}>
                  <NavLink to="/">HOME</NavLink>
                </MenuItem>
                <MenuItem onTouchTap={this._closeDrawer}>
                  <NavLink to="/about">ABOUT US</NavLink>
                </MenuItem>
              </Drawer>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}