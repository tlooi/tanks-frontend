import { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, TAppContext } from "../context/AppContext";

export default function Home() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<string>('');

    const { id, username, setUsername } = useContext(AppContext) as TAppContext;

    const transitionRoute = useCallback((path: string) => {
        if (usernameRef.current && usernameRef.current.value) {
            setUsername(username || usernameRef.current.value);
            navigate(path);
        } else {
            setErrors('Username must be greater than 3 characters');
        }
    }, []);

    return (
        <div className="popup">
            <span className="title inline">
                <h1 className="title">Tanks</h1>
                <span>{id === '' && 'Generating ID'}</span>
            </span>
            <div>
                <span>Username <br /></span>
                <input
                    type="text"
                    id="username-input"
                    placeholder=" "
                    disabled={id === '' || username !== ''}
                    defaultValue={username}
                    ref={usernameRef}
                />
            </div>
            <div className="home-buttons">
                <button onClick={() => transitionRoute('/find')} className="btn" disabled={id === ''}>Find Server</button>
                <button onClick={() => transitionRoute('/host')} className="btn" disabled={id === ''}>Host Server</button>
            </div>
        </div>
    );
}