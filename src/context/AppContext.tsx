import { Peer } from 'peerjs';
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export type TAppContext = {
    peer: Peer;
    id: string;
    username: string;
    isHost: boolean;
    game?: undefined;
    setUsername: (val: string) => void;
    setIsHost: (val: boolean) => void;
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string>('');
    const [isHost, setIsHost] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const { current: peer } = useRef(new Peer('', {
        host: location.hostname,
        port: 9000
    }));
    peer.on('open', (id) => {
        setId(id);
    });

    useEffect(() => {
        peer.socket.send({ type: 'ISHOST', username, isHost});
    }, [isHost]);

    function setUsernameIntercept(val: string) {
        peer.socket.send({ type: 'SETUP', username: val });
        setUsername(val);
    }

    function setIsHostIntercept(isHost: boolean) {
        setIsHost(isHost);
    }
    
    return (
        <AppContext.Provider value={{ peer, id, username, setUsername: setUsernameIntercept, setIsHost: setIsHostIntercept, isHost }}>
            {children}
        </AppContext.Provider>
    );
}