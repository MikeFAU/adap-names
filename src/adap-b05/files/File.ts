import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
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
        this.assertIsInState(FileState.OPEN);

        let result: Int8Array = new Int8Array(noBytes);
        // do something

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    // Oh no! What @todo?!
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        this.assertIsInState(FileState.OPEN);
        return 0; // @todo
    }

    public close(): void {
        // do something
        this.assertIsInState(FileState.OPEN);
        this.doSetFileState(FileState.CLOSED);
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