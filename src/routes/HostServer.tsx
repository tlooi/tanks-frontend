import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

export default function HostServer() {
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
                <h1 className="title">Host Server</h1>
                <Link to={'/find'}>Find Server</Link>
            </span>
            <button 
                onClick={() => {
                    navigate(`/game-lobby/${id}`);
                    setIsHost(true);
                }} 
                className="btn"
            >Host</button>
        </div>
    );
}