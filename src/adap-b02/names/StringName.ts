import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
        this.name = this.name.replaceAll(this.delimiter, ESCAPE_CHARACTER+DEFAULT_DELIMITER);
    }

    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(ESCAPE_CHARACTER+DEFAULT_DELIMITER, delimiter);
    }

    /** @methodtype conversion-method */
    public asDataString(): string {
        return this.name;
    }

    /** @methodtype assertion-method */
    public isEmpty(): boolean {
        return this.name.length < 1;
    }

    /** @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** @methodtype get-method */
    public getNoComponents(): number {
        return this.getComponents().length;
    }

    /** @methodtype get-method */
    public getComponent(x: number): string {
        this.isValidRange(x);
        return this.getComponents()[x];
    }

    /** @methodtype set-method */
    public setComponent(n: number, c: string): void {
        this.isValidRange(n);
        this.isNotNone(c);
        let comps = this.getComponents();

        // Change
        comps[n] = c;

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public insert(n: number, c: string): void {
        this.isValidRange(n);
        this.isNotNone(c);

        // Change
        let comps = this.getComponents();
        comps.splice(n, 0, c);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public append(c: string): void {
        this.isNotNone(c);

        // Change
        let comps = this.getComponents();
        comps.splice(this.getNoComponents(), 0, c);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public remove(n: number): void {
        this.isValidRange(n);

        // Change
        let comps = this.getComponents();
        comps.splice(n, 1);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public concat(other: Name): void {
        this.isNotNone(other);

        let otherComps = other.asDataString().split(ESCAPE_CHARACTER+DEFAULT_DELIMITER);
        for (var comp of otherComps){
            this.append(comp);
        }
    }

    /** @methodtype get-method */
    private getComponents(): string[] {
        return this.name.split(ESCAPE_CHARACTER+DEFAULT_DELIMITER);
    }

    /** @methodtype helper-method */
    private updateName(c: string[]): void {
        let newName = c.join(ESCAPE_CHARACTER+DEFAULT_DELIMITER);
        this.name = newName;
    }

    /** @methodtype assertion-method */
    protected isValidRange(i: number): void {
        if (i < 0 || i >= this.getComponents().length)
            throw new RangeError("Out of Range");
    }

    /** @methodtype assertion-method */
    protected isNotNone(other: Object): void {
        if (other === null || other === undefined )
            throw new TypeError("No Inputdata given");
    }
}