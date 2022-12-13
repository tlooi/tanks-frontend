/// <reference types="vite/client" />


// Type definitions from node_modules
declare class Socket {
    constructor(secure: any, host: string, port: number, path: string, key: string, pingInterval?: number);
    start(id: string, token: string): void;
    /** Exposed send for DC & Peer. */
    send(data: any): void;
    close(): void;
}