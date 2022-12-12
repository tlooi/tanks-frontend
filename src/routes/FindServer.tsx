import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

const tempData: { username: string; peerId: string; }[] = [
    // {
    //     username: 'Hello World',
    //     peerId: 'gjuirsgyoheuighugjilkdhujiehuw'
    // },
]

export default function FindServer() {
    const [servers, setServers] = useState<{ id: string, username: string }[]>([]);
    const navigate = useNavigate();
    const { id } = useContext(AppContext) as TAppContext;
    useEffect(() => {
        if (id === '') {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
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

            });
        return () => controller.abort();
    }, [])

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
                            <div onClick={() => navigate(`/game-lobby/${val.id}`)} key={val.id} className="server-view-row server-view-item">
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