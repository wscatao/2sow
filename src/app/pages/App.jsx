import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Listing from './Listing';

function App() {
  return (
    <Switch>
      <Route path="/register" component={() => <div>tela de registro</div>} />
      <Route path="/edit" component={() => <div>tela de edição</div>} />
      <Route path="/home" component={Listing} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
