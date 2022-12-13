import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, TAppContext } from '../context/AppContext';

const players: {[key: string]: any}[] = [];

export default function Lobby() {
    const navigate = useNavigate();

    const { game, setIsHost } = useContext(AppContext) as TAppContext;
    
    useEffect(() => {
        if (!game.getSelf()) {
            navigate('/');
            return;
        }
    }, []);

    function onClickLeaveServer() {
        setIsHost(false);
    }

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Lobby</h1>
                <Link to={'/find'} onClick={onClickLeaveServer}>Leave Server</Link>
            </span>
            <div className="server-view-wrapper">
                <div className="server-view-row">
                    <span>Users</span>
                    <span>Kick</span>
                </div>
                <div className="server-view">
                    {players.map(player => {
                        return (
                            <div key={player.getId()} className={"server-view-item server-view-row"}>
                                <span>{player.getUsername()}</span>
                                <span className="disabled">Disabled</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* {isHost && <button className="btn">Start</button>} */}
        </div>
    );
}