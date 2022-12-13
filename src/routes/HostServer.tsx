import { Link, useNavigate } from "react-router-dom";

export default function HostServer() {
    const navigate = useNavigate();

    return (
        <div className="popup find-server-popup">
            <span className="inline">
                <h1 className="title">Host Server</h1>
                <Link onClick={() => {
                }} to={'/find'}>Find Server</Link>
            </span>
            <button
                onClick={() => {
                    // navigate(`/game-lobby/${id}`);
                }}
                className="btn"
            >Host</button>
        </div>
    );
}