import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Listing from './Listing';
import Register from './Register';

function App() {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/home" component={Listing} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
