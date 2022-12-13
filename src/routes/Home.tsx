import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

export default function Home() {
    const navigate = useNavigate();

    const { createSelf } = useContext(AppContext) as TAppContext;

    const usernameRef = useRef<HTMLInputElement>(null);

    function onClickFindServer() {
        navigate('/find');
        const username = usernameRef.current?.value || `Guest_${Math.random().toString(36).slice(4, 10)}`;
        createSelf(username);
        console.log(username);
    }

    function onClickHostServer() {
        navigate('/host');
        const username = usernameRef.current?.value || `Guest_${Math.random().toString(36).slice(4, 10)}`;
        createSelf(username);
        console.log(username);
    }

    return (
        <div className="popup">
            <span className="title inline">
                <h1 className="title">Tanks</h1>
                {/* <span>{id === '' && 'Generating ID'}</span> */}
            </span>
            <div>
                <span>Username <br /></span>
                <input
                    type="text"
                    id="username-input"
                    placeholder=" "
                    // disabled={id === '' || username !== ''}
                    // defaultValue={username}
                    ref={usernameRef}
                />
            </div>
            <div className="home-buttons">
                <button className="btn" onClick={onClickFindServer}>Find Server</button>
                <button className="btn" onClick={onClickHostServer}>Host Server</button>
            </div>
        </div>
    );
}