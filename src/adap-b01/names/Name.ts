export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '#';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;
    private appended: string = "";

    constructor(other: string[], delimiter?: string) {
        //throw new Error("needs implementation");
        this.components = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    public asNameString(delimiter: string = this.delimiter): string {
        //throw new Error("needs implementation");
        let arrStr = this.components.join(delimiter);
        
        if (this.appended != ""){
            arrStr = arrStr.concat(this.ESCAPE_CHARACTER, this.appended)
        }

        return arrStr;
    }

    public getComponent(i: number): string {
        //throw new Error("needs implementation");
        this.isValidRange(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        //throw new Error("needs implementation");
        this.isValidRange(i);
        this.components[i] = c;
    }

    public getNoComponents(): number {
        //throw new Error("needs implementation");
        return this.components.length;
    }

    public insert(i: number, c: string): void {
        //throw new Error("needs implementation");
        this.isValidRange(i);
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        //throw new Error("needs implementation");
        this.appended = c;
    }

    public remove(i: number): void {
        //throw new Error("needs implementation");
        this.isValidRange(i);
        this.components.splice(i, 1);
    }

    protected isValidRange(i: number): void {
        if (i < 0 || i >= this.components.length)
            throw new RangeError("Out of Range");
    }
}