import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";

const App = observer(() => {

  return (
      <Router>
          <NavBar />
          <AppRouter />
      </Router>
  );
});

export default App;
