import { Peer } from 'peerjs';
import { createContext, ReactNode, useRef, useState } from "react";

export type TAppContext = {
    peer: Peer;
    id: string;
    username: string;
    setUsername: (val: string) => void;
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { current: peer } = useRef(new Peer(''));
    peer.on('open', (id) => {
        setId(id);
    });

    return (
        <AppContext.Provider value={{ peer, id, username, setUsername }}>
            {children}
        </AppContext.Provider>
    );
}