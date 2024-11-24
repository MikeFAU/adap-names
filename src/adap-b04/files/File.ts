import { Node } from "./Node";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;
    protected perms: number = 0;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // do something
        this.assertIsInState(FileState.CLOSED);
        this.doSetFileState(FileState.OPEN);
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        // do something
        this.assertIsInState(FileState.OPEN);
        this.doSetFileState(FileState.CLOSED);
    }

    public read(): Object[]{
        // Dummy data
        this.assertIsInState(FileState.OPEN);
        return [];
    }

    public write(o: Object[]): void {
        this.assertIsInState(FileState.OPEN);
        // do something 
    }

    public getPerms(): number {
        return this.doGetPerms();
    }

    public setPerms(p: number): void {
        // do something
    }

    public delete(): void{
        this.assertIsInState(FileState.CLOSED);
        this.doSetFileState(FileState.DELETED);
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected doSetFileState(state: FileState): void{
        this.state = state;
    }

    protected doGetPerms(): number {
        return this.perms;
    }

    protected assertIsInState(state: FileState){
        if (state != this.doGetFileState()){
            throw new InvalidStateException("invalid file state");
        }
    }

}