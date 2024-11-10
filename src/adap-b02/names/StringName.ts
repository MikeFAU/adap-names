import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        this.isNotNone(other);
        this.name = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {

        let returnName = this.name;
        // User would like to use own delimter
        if (this.delimiter != delimiter){
            returnName = returnName.replaceAll(this.delimiter, delimiter);
        }

        // Remove all escaped characters. Human readable only!
        return returnName.replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
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
        return this.createArrayByDelimiter(this.name).length;
    }

    /** @methodtype get-method */
    public getComponent(x: number): string {
        this.isValidRange(x);
        return this.createArrayByDelimiter(this.name)[x];
    }

    /** @methodtype set-method */
    public setComponent(n: number, c: string): void {
        this.isValidRange(n);
        this.isNotNone(c);
        let comps = this.createArrayByDelimiter(this.name);

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
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(n, 0, c);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public append(c: string): void {
        this.isNotNone(c);

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(this.getNoComponents(), 0, c);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public remove(n: number): void {
        this.isValidRange(n);

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(n, 1);

        // Update
        this.updateName(comps);
    }

    /** @methodtype command-method */
    public concat(other: Name): void {
        this.isNotNone(other);

        let otherComps = this.createArrayByDelimiter(other.asDataString());
        for (var comp of otherComps){
            this.append(comp);
        }
    }

    /** @methodtype helper-method */
    private createArrayByDelimiter(inputName: String): string[] {
        
        let retArr:string[] = [];
        let tempStr:string = "";
        let lastChar:string = "";
        for (let i = 0; i < inputName.length; i++){
            let add = true;
            // Check if current char is a control character that is not escaped
            if (inputName[i] === this.delimiter && lastChar != ESCAPE_CHARACTER){
                retArr.push(tempStr);
                tempStr = "";

                // Do not add control characters to temp string
                add = false;
            }

            // Append to tempStr
            if (add){
                tempStr = tempStr + inputName[i];
            }

            // Always remember last char to check for escape char
            lastChar = inputName[i];

            // Edge Case: Last char
            if (i === inputName.length -1 ){
                retArr.push(tempStr);
            }
        }

        return retArr;
    }

    /** @methodtype helper-method */
    private updateName(c: string[]): void {
        let newName = c.join(this.delimiter);
        this.name = newName;
    }

    /** @methodtype assertion-method */
    protected isValidRange(i: number): void {
        if (i < 0 || i >= this.createArrayByDelimiter(this.name).length)
            throw new RangeError("Out of Range");
    }

    /** @methodtype assertion-method */
    protected isNotNone(other: Object): void {
        if (other === null || other === undefined )
            throw new TypeError("No Inputdata given");
    }
}