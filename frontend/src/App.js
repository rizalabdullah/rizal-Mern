import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';

 import Login from './app/pages/Login';
 import Register from './app/pages/Register';
 import { useSelector } from 'react-redux';
 import Account from './app/pages/Account';



const App = () => {
   const auth = useSelector(state => state.auth);


  return (
    <div>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Switch>
          <Route exact path="/">
              <Login />
          </Route>   
          <Route path="/home">
              { !auth.user ? <Redirect to="/" /> : <Home /> } 
         </Route>
         <Route path="/tambah">
              { !auth.user ? <Redirect to="/" /> : <Tambah /> } 
         </Route>

          <Route path="/detail/:id" children={() => <Detail />} />
          <Route path="/edit/:id" > <Edit /></Route>
        

           <Route path="/account" component={Account}/>
      
        <Route path="/register" component={Register}/>
         <Route path="/login">
          { auth.user ? <Redirect to="/home" /> : <Login /> } 
         </Route>

          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;