type Vec2 = {
    x: number;
    y: number;
}

export class Player {
    private position: Vec2;
    private velocity: Vec2 = { x: 0, y: 0 };
    private username: string;
    private id: string;

    public getUsername = () => this.username;
    public getId = () => this.id;

    constructor(username: string, id: string, position: Vec2) {
        this.position = position;
        this.username = username;
        this.id = id;
    }

    public update() {

    }
}

export default class Game {
    private players: Player[];
    private self: Player;
    public update = () => this.players.forEach(player => player.update());
    public getPlayers = () => this.players;

    constructor(self: Player) {
        this.players = [self];
        this.self = self;
    }

    public addPlayer(id: string, username: string) {
        this.players.push(new Player(username, id, { x: 0, y: 0 }));
    }

    public removePlayer(id: string) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getId() === id) {
                this.players.splice(i, 1);
                return;
            }
        }
    }

}