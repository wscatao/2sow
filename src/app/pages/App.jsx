import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Listing from './Listing';
import Register from './Register';
import Update from './Update';

function App() {
  return (
    <Switch>
      <Route path="/update/:id" component={Update} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Listing} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
