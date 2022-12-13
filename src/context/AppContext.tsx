import { DataConnection, Peer } from 'peerjs';
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import Game, { Player } from '../Game/Game';

export type TAppContext = {
};

export const AppContext = createContext<TAppContext | null>(null);

export default function AppContextProvider({ children }: { children: ReactNode }) {

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}