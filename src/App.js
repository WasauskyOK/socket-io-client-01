import React from 'react';

import  {BrowserRouter,Switch,Route} from  'react-router-dom';
import  Principal from  './components/principal';
import  Signup from  './components/signup';
import  Signin from  './components/signin';
import  LayoutPrimaryNavigation from  './components/layoutsign';
import  Profile from './components/profile';
import GlobalChat from './components/globalchat';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        
        <Route exact path="/profile" component={GlobalChat}/>
        <LayoutPrimaryNavigation>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/principal" component={Principal}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
        </LayoutPrimaryNavigation>
        
      </Switch>
    </BrowserRouter>
  );
};
export default App;
