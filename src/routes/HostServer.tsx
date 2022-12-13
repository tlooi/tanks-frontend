import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

export default function HostServer() {
    const navigate = useNavigate();

    const { game, hostGame } = useContext(AppContext) as TAppContext;
    
    useEffect(() => {
        if (!game.getSelf()) {
            navigate('/');
            return;
        }
    }, []);

    function onClickHost() {
        if (game.getSelf()) {
            navigate(`/game-lobby/${game.getSelf()!.getId()}`);
            hostGame();
            console.log('HOST');
            
        }
    }

    function onClickFindServers() {
        // setIsHost(false);
    }

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Host Server</h1>
                <Link onClick={onClickFindServers} to={'/find'}>Find Server</Link>
            </span>
            <button
                onClick={onClickHost}
                className="btn"
            >Host</button>
        </div>
    );
}