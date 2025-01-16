import './styles/App.css';
import React from 'react'
import Dashboard from './components/Dashboard';
import { createContext } from 'react'
import { Provider, lightTheme } from '@adobe/react-spectrum'

export const DashboardContext = createContext();

function App() {
  return (
    <Provider theme={lightTheme} colorScheme="light">
    <div className="App">
      <div className="App-container">
        <Dashboard />
      </div> 
    </div> 
    </Provider>
  );
}

export default App;
