import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

interface IServerListing { id: string, username: string };

function loadServers(controller: AbortController, setServers: (val: IServerListing[]) => void) {
    fetch(`${location.protocol}//${location.hostname}:4000/servers`, {
        signal: controller.signal,
        credentials: 'same-origin',
        "headers": {
            "Content-Type": "application/json"
        }
    })
        .then(data => data.json())
        .then(data => {
            setServers(data);
            setTimeout(() => {
                loadServers(controller, setServers);
            }, 100);
        });

}

export default function FindServer() {
    const navigate = useNavigate();

    const { game, createConnection } = useContext(AppContext) as TAppContext;

    const [servers, setServers] = useState<{ id: string, username: string }[]>([]);

    useEffect(() => {
        if (!game.getSelf()) {
            navigate('/');
            return;
        }
        const controller = new AbortController();
        loadServers(controller, setServers);
        return () => controller.abort();
    }, []);

    function onClickServer(id: string) {
        navigate(`/game-lobby/${id}`);
        createConnection(id);
    }

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Find Server</h1>
                <Link to={'/host'}>Host Server</Link>
            </span>
            <div className="server-view-wrapper">
                <div className="server-view-row">
                    <span>Host Name</span>
                    <span>Number of Players</span>
                </div>
                <div className="server-view">
                    {servers.map((val) => {
                        return (
                            <div onClick={() => onClickServer(val.id)} key={val.id} className="server-view-row server-view-item">
                                <span>{val.username}</span>
                                <span>0</span>
                            </div>
                        );
                    })}
                    {servers.length === 0 && <div className="server-view-row">No listings found {':\'('}</div>}
                </div>
            </div>
        </div>
    );
}