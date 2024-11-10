import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        this.isNotNone(other);
        this.components = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    /** Returns human-readable representation of Name instance */
    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter).replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }

    /** @methodtype conversion-method */
    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    /** @methodtype assertion-method */
    public isEmpty(): boolean {
        return this.components.length < 1;
    }

    /** @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** Returns number of components in Name instance */
    /** @methodtype get-method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype get-method */
    public getComponent(i: number): string {
        this.isValidRange(i);
        return this.components[i];
    }

    /** @methodtype set-method */
    public setComponent(i: number, c: string): void {
        this.isValidRange(i);
        this.components[i] = c;
    }

    /** @methodtype command-method */
    public insert(i: number, c: string): void {
        this.isValidRange(i);
        this.components.splice(i, 0, c);
    }

    /** @methodtype command-method */
    public append(c: string): void {
        this.components.splice(this.getNoComponents(), 0, c);
    }

    /** @methodtype command-method */
    public remove(i: number): void {
        this.isValidRange(i);
        this.components.splice(i, 1);
    }

    /** @methodtype command-method */
    public concat(other: Name): void {
        this.isNotNone(other);

        for(let i = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
    }

    /** @methodtype assertion-method */
    protected isValidRange(i: number): void {
        if (i < 0 || i >= this.components.length)
            throw new RangeError("Out of Range");
    }

    /** @methodtype assertion-method */
    protected isNotNone(other: Object): void {
        if (other === null || other === undefined )
            throw new TypeError("No Inputdata given");
    }
}