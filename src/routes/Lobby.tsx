import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, TAppContext } from '../context/AppContext';

export default function Lobby() {
    const navigate = useNavigate();
    const { id, setIsHost } = useContext(AppContext) as TAppContext;
    useEffect(() => {
        if (id === '') {
            navigate('/');
        }
    }, []);

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Lobby</h1>
                <Link to={'/find'} onClick={() => setIsHost(false)}>Leave Server</Link>
            </span>
            <div className="server-view-wrapper">
                <div className="server-view-row">
                    <span>Users</span>
                    <span>Kick</span>
                </div>
                <div className="server-view">
                    <div className="server-view-item server-view-row">
                        <span>Hello World</span>
                        <span className="disabled">Disabled</span>
                    </div>
                </div>
            </div>
        </div>
    );
}