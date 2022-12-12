import { Peer } from 'peerjs';
import { createContext, ReactNode, useRef, useState } from "react";

export type TAppContext = {
    peer: Peer;
    id: string;
    username: string;
    setUsername: (val: string) => void;
    setIsHost: (val: boolean) => void;
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { current: peer } = useRef(new Peer('', {
        host: location.hostname,
        port: 9000
    }));
    peer.on('open', (id) => {
        setId(id);
    });

    function setUsernameIntercept(val: string) {
        peer.socket.send({ type: 'SETUP', username: val });
        setUsername(val);
    }

    function setIsHost(isHost: boolean) {
        peer.socket.send({ type: 'ISHOST', username, isHost})
    }
    
    return (
        <AppContext.Provider value={{ peer, id, username, setUsername: setUsernameIntercept, setIsHost }}>
            {children}
        </AppContext.Provider>
    );
}