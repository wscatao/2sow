import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';

function App() {
  return (
    <Switch>
      <Route path="/register" component={() => <div>tela de registro</div>} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
