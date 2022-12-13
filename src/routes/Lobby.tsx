import { Link, useNavigate } from 'react-router-dom';

const players: {[key: string]: any}[] = [];

export default function Lobby() {
    const navigate = useNavigate();

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Lobby</h1>
                <Link to={'/find'} onClick={() => {

                }}>Leave Server</Link>
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