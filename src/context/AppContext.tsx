import { DataConnection, Peer } from 'peerjs';
import { createContext, ReactNode, useEffect, useRef } from "react";
import Game from '../Game/Game';

export type TAppContext = {
    game: Game;
    connection: {
        peer: Peer;
        dataConnection: DataConnection | undefined;
    };
    createSelf: (username: string) => void;
    setIsHost: (isHost: boolean) => void;
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {


    const connectionRef = useRef({
        peer: new Peer('', {
            host: `${location.hostname}`,
            port: 9000,
        }),
        dataConnection: undefined,
    });

    const gameRef = useRef(new Game());
    const { current: game } = gameRef;
    const { current: { peer, dataConnection } } = connectionRef;

    useEffect(() => {
        peer.on('open', (id) => {
            console.log('You were assigned', id);
        });

        peer.on('connection', (client) => {
            console.log(client);
        });
    }, []);

    function createSelf(username: string) {
        if (!game.getSelf()) {
            game.addSelf(peer.id, username);
            sendSocket(peer.socket, { type: "SETUP", username: game.getSelf()!.getUsername() });
        }
    }

    function setIsHost(isHost: boolean) {
        if (game.getSelf()) {
            console.log(isHost);
            
            game.setIsHost(isHost);
            sendSocket(peer.socket, { type: "ISHOST", username: game.getSelf()!.getUsername(), isHost: isHost });
        }
    }

    return (
        <AppContext.Provider
            value={{
                game: gameRef.current,
                connection: connectionRef.current,
                createSelf,
                setIsHost,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


function sendSocket(socket: Socket, data: { type: string, [other: string]: boolean | any }) {
    socket.send(data);
}
