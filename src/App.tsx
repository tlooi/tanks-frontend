import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppContextProvider, { AppContext, TAppContext } from './context/AppContext';
import FindServer from './routes/FindServer';
import Home from './routes/Home';
import HostServer from './routes/HostServer';
import Lobby from './routes/Lobby';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Home />
        )
    },
    {
        path: '/find',
        element: <FindServer />
    },
    {
        path: '/host',
        element: <HostServer />
    },
    {
        path: '/game-lobby/:id',
        loader: (args) => {
            console.log(args);

            return args;
        },
        element: <Lobby />
    }
]);

function UserProfilePopup() {
    const { id, username } = useContext(AppContext) as TAppContext;

    if (username === '') {
        return null;
    }
    
    return (
        <div className="popup profile">
            <div>
                Welcome, {username}!
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="wrapper">
            <UserProfilePopup />
            <RouterProvider router={router} />
        </div>
    );
}

export default App
