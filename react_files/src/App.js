import './App.css';
// import StartPage from './register';
// import ErrorPage from './errorpage';
import LoginPage from './login';
import RegisterPage from './register';
// import TodoPage from './todopage';
// import HistoryPage from './historypage';
// import AdminPage from './adminpage';
import { BrowserRouter as Router, Link ,Routes,Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState } from 'react';
import LogoutPage from './logout';
import TodoDisplay from './mygames';
import PendingTodos from './pendingtodos';
import CreateGame from './create_game';
import DisplayCreated from './mygames';
import JoinGame from './join_game';
import GamePage from './gamepage';
// import QuestionsPage from './questions';
// import AdminEditbyid from './editquesion';
function App() {

  var cook = new Cookies();
  var email_id = cook.get("email_id");
  var loggedin = cook.get("logged_in");
  return (
    <div className="App">
<Router>

<Routes>        

   {loggedin === true ? 
   <>
   <Route path='/login' element={<LoginPage /> }/>
   <Route path='/register' element={<RegisterPage />} />
   <Route path='/logout' element={<LogoutPage />} />
   <Route path='/game' element={<CreateGame />} />
   <Route path='/created' element={<DisplayCreated />} />
   <Route path='/join' element={<JoinGame />} />
   <Route path='/game_page/:game_id' element={<GamePage/>} />
   <Route path='*' element={<LoginPage />} />

      </>
      : <><Route path='/login' element={<LoginPage /> }/>
         <Route path='/register' element={<RegisterPage />} />

      <Route path='*' element={<LoginPage />} />

      </>
  }
    

    </Routes>
    
    </Router>



    </div>
  );
}

export default App;
