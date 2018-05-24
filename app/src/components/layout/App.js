import React from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch} from "react-router-dom";
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './NavLink';
import Footer from './Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import FourOhFour from '../pages/FourOhFour';

const navItems = [{
  exact: true,
  label: 'Home',
  to: '/home',
  icon: 'home',
},
  {
    exact: true,
    label: 'About',
    to: '/about',
    icon: 'info',
  }];

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <NavigationDrawer
          drawerTitle="Main Menu"
          toolbarTitle="React-redux-material-PWA"
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
          navItems={navItems.map(props => <NavLink {...props} key={props.to}/>)}
        >
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/about" component={About}/>
            <Route component={FourOhFour}/>
          </Switch>
          <Footer/>
        </NavigationDrawer>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;