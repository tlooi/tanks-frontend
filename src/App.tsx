import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
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
            return args.params;
        },
        element: <Lobby />
    }
]);

function App() {
    return (
        <div className="wrapper">
            <RouterProvider router={router} />
        </div>
    );
}

export default App
