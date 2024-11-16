import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        return this.getNameArray().join(delimiter).replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }

    /** @methodtype conversion-method */
    public toString(): string {
        // Method uses the asDataString representation
        return this.asDataString();
    }

    /** @methodtype conversion-method */
    public asDataString(): string {
        return this.getNameArray().join(DEFAULT_DELIMITER);
    }

    /** @methodtype assertion-method */
    public isEqual(other: Name): boolean {
        throw new Error("needs implementation or deletion");
    }

    /** @methodtype get-method */
    public getHashCode(): number {
        throw new Error("needs implementation or deletion");
    }

    /** @methodtype helper-method */
    public clone(): Name {
        throw new Error("needs implementation");
    }

    /** @methodtype assertion-method */
    public isEmpty(): boolean {
        return this.getNoComponents() < 1;
    }

    /** @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** @methodtype get-method */
    abstract getNoComponents(): number;

    /** @methodtype get-method */
    abstract getComponent(i: number): string;
    /** @methodtype set-method */
    abstract setComponent(i: number, c: string): void;

    /** @methodtype command-method */
    abstract insert(i: number, c: string): void;
    /** @methodtype command-method */
    abstract append(c: string): void;
    /** @methodtype command-method */
    abstract remove(i: number): void;

    /** @methodtype command-method */
    public concat(other: Name): void {
        this.isNotNone(other);

        for(let i = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
    }

    //#############################################################//
    // Further methods added

    /** @methodtype assertion-method */
    protected isValidRange(i: number): void {
        if (i < 0 || i >= this.getNoComponents())
            throw new RangeError("Out of Range");
    }

    /** @methodtype assertion-method */
    protected isNotNone(other: Object): void {
        if (other === null || other === undefined )
            throw new TypeError("No Inputdata given");
    }

    private getNameArray(): string[] {
        let retArr:string[] = [];
        
        for(let i = 0; i < this.getNoComponents(); i++)
            retArr.push(this.getComponent(i));

        return retArr;
    }
}