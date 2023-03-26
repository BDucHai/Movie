import './App.css';
import { publicRoutes } from './routes/routes';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route,index) =>{
          const Page = route.component;
          return(
            <Route key={index} path={route.path} element={<Page/>}/>
          )
        })}
      </Routes>
    </div>
  );
}

export default App;
