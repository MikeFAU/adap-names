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
        this.isNotNone(other);
        
        // Check if deliminiter is equal
        if(this.getDelimiterCharacter() != other.getDelimiterCharacter())
            return false;

        // Check if number of components are equal
        if(this.getNoComponents() != other.getNoComponents())
            return false;

        // Check if all single components are equal
        for(let i = 0; i < this.getNoComponents(); i++){
            if(this.getComponent(i) != other.getComponent(i))
                return false;
        }

        // Everything is the same
        return true;
    }

    /** @methodtype get-method */
    public getHashCode(): number {
        // See ADAP B01 slide 19f - Used adapted hash code implementation
        
        let hashCode: number = 0;
        let c:number = 0;
        const s: string = this.getNoComponents()+this.getDelimiterCharacter()+this.getNameArray().join(this.getDelimiterCharacter());
        //console.info(s);

        for (let i = 0; i < s.length; i++){
            c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }

        return hashCode;
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