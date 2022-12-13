import { DataConnection, Peer } from 'peerjs';
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import Game, { Player } from '../Game/Game';

interface IConnection {
    peer: Peer;
    dataConnection: DataConnection | undefined;
};

export type TAppContext = {
    game: Game;
    connection: IConnection;
    refreshVal: boolean;
    createSelf: (username: string) => void;
    setIsHost: (isHost: boolean) => void;
    createConnection: (connect_id: string) => void;
    disconnectServer: () => void;
    hostGame: () => void;
    endGame: () => void;
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [refreshVal, refresh] = useState(false);

    const connectionRef = useRef<IConnection>({
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

            if (game.isHost) {
                console.log('New client has joined', client);


                client.on('open', () => {
                    if (!game.isHost) {

                        client.close();
                        return;
                    }
                    client.send({ type: "PLAYERS", players: game.getPlayers().map(player => { return { username: player.getUsername(), id: player.getId() } }) })
                })

                const newPlayer = new Player(client.metadata.username, client.connectionId, { x: 0, y: 0 }, client);
                addPlayer(newPlayer);


                client.on('close', () => {
                    console.log('User has left');
                    removePlayer(newPlayer);
                });
            } else {
                client.on('open', () => {
                    client.close();
                })
            }
        });
    }, []);

    function addPlayer(player: Player) {
        game.addPlayer(player);
        refresh(val => !val);
        game.getPlayers().forEach(player => {
            const connection = player.getConnection();
            if (connection) {
                connection.send({ type: "PLAYERS", players: game.getPlayers().map(player => { return { username: player.getUsername(), id: player.getId() } }) })
            }
        });
    }

    function removePlayer(player: Player) {
        game.removePlayer(player);
        refresh(val => !val);
        game.getPlayers().forEach(player => {
            const connection = player.getConnection();
            if (connection) {
                connection.send({ type: "PLAYERS", players: game.getPlayers().map(player => { return { username: player.getUsername(), id: player.getId() } }) })
            }
        });
    }

    function createSelf(username: string) {
        if (!game.getSelf()) {
            game.addSelf(peer.id, username);
            sendSocket(peer.socket, { type: "SETUP", username: game.getSelf()!.getUsername() });
        }
    }

    function setIsHost(isHost: boolean) {
        if (game.getSelf()) {
            game.setIsHost(isHost);
            sendSocket(peer.socket, { type: "ISHOST", username: game.getSelf()!.getUsername(), isHost: isHost });

            if (!isHost) {
                game.getPlayers().forEach(client => {
                    const connection = client.getConnection();
                    if (connection) {
                        connection.close();
                    }
                })
                game.endGame();
            }
        }
    }

    function createConnection(connect_id: string) {
        const dataConnection = peer.connect(connect_id, {
            metadata: {
                username: game.getSelf()!.getUsername()
            }
        });

        connectionRef.current.dataConnection = dataConnection;

        dataConnection.on('iceStateChanged', (state) => {
            console.log(state);
        })

        dataConnection.on('close', () => {
            connectionRef.current.dataConnection = undefined;
            console.log('closed');

            refresh(val => !val);
        });

        dataConnection.on('data', (data: any) => {
            const type = data.type;
            console.log(type);
            switch (type) {
                case "PLAYERS":
                    game.resetPlayers();
                    data.players.map((data: any) => {
                        const { id, username } = data;
                        // console.log(id, username);
                        const newPlayer = new Player(username, id, { x: 0, y: 0 });
                        game.addPlayer(newPlayer);
                    })
                    refresh(val => !val);
                    console.log('initial connection', data.players);
                    break;
                default:
                    break;
            }
        })
    }

    function disconnectServer() {
        if (connectionRef.current.dataConnection) {
            console.log('close connection');

            connectionRef.current.dataConnection.close();
        }
        connectionRef.current.dataConnection = undefined;

        endGame();
        // if (game.isHost) {
        //     endGame();
        // } else {
        //     game.resetPlayers();
        // }
    }

    function hostGame() {
        game.resetPlayers();
        game.addPlayer(game.getSelf()!);
        setIsHost(true);
    }

    function endGame() {
        game.endGame();
        setIsHost(false);
    }

    return (
        <AppContext.Provider
            value={{
                game: gameRef.current,
                connection: connectionRef.current,
                createSelf,
                refreshVal,
                setIsHost,
                createConnection,
                disconnectServer,
                hostGame,
                endGame,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


function sendSocket(socket: Socket, data: { type: string, [other: string]: boolean | any }) {
    socket.send(data);
}
