import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Products from './containers/Products';
import Orders from './containers/Orders';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn,  getInitialData } from './actions';
import {useDispatch, useSelector} from 'react-redux'
import Category from './containers/Category';
import NewPage from './containers/NewPage';




function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
     dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    } 
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" exact component={NewPage} />
          <PrivateRoute path="/products"  component={Products} />
          <PrivateRoute path="/orders"  component={Orders} />
          <PrivateRoute path="/category"  component={Category} />
          <Route path="/Signin" component={Signin} />
          <Route path="/Signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
