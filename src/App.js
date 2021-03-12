import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import { AuthProvider } from './context/auth';
import ErrorPage from './ErrorPage'


const App = () => {

  return (
    <Router basename="/">
      <AuthProvider>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/error' exact component={ErrorPage} />
          <Redirect from= '*' to='/error' />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
