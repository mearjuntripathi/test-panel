import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup';


const RootComponent = () => {
  const [questions, setQuestions] = useState([]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App questions={questions} />,
      errorElement: <Error />
    },
    {
      path: '/login',
      element: <Login setQuestions={setQuestions} />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
