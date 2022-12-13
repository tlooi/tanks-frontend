import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

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
                    // ref={usernameRef}
                />
            </div>
            <div className="home-buttons">
                <button className="btn" onClick={() => navigate('/find')}>Find Server</button>
                <button className="btn" onClick={() => navigate('/host')}>Host Server</button>
            </div>
        </div>
    );
}