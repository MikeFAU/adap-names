import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export enum NameAssertType {
    PRECOND,
    POSTCOND,
    CLASSINVAR
};

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected err_msg_invalid_input = "Invalid input data given";
    

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // Precondition
        this.isNotNullOrUndefined(delimiter, NameAssertType.PRECOND, this.err_msg_invalid_input);

        // Execution
        this.doSetDelimiter(delimiter);
        
        // Postcondition
        this.isNotNullOrUndefined(this.getDelimiterCharacter(), NameAssertType.POSTCOND, "Could not set delimiter");      
    }

    /** @methodtype cloning-method */
    public clone(): Name {
        let n: Name = this.createEmptyNameWithEqualDelimiter();
        
        for(let i = 0; i < this.getNoComponents(); i++){
            n = n.append(this.getComponent(i));
        }

        // Minor bugfix for handling of empty StringNames
        if(n.getNoComponents() > 0 && n.getComponent(0) === "" && this.getComponent(0) != "")
            n = n.remove(0);

        // Postcondition
        this.isCond(this.isEqual(n), NameAssertType.POSTCOND, "Could not clone object");

        return n;
    }

    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        // Precondition
        this.isNotNullOrUndefined(delimiter, NameAssertType.PRECOND, this.err_msg_invalid_input);

        // Class Invariants
        this.assertClassInvariants();

        return this.doGetNameArray().join(delimiter).replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }

    public toString(): string {
        // Method uses the asDataString representation
        return this.asDataString();
    }

    /** @methodtype conversion-method */
    public asDataString(): string {

        // Class Invariants
        this.assertClassInvariants();

        return this.doGetNameArray().join(DEFAULT_DELIMITER);
    }

    /** @methodtype assertion-method */
    public isEqual(other: Name): boolean {
        // Preconditions
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, this.err_msg_invalid_input);

        // Class Invariants
        this.assertClassInvariants();
        
        // Execution
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
        
        // Class Invariants
        this.assertClassInvariants();

        // See ADAP B01 slide 19f - Used adapted hash code implementation
        
        let hashCode: number = 0;
        let c:number = 0;
        const s: string = this.getNoComponents()+this.getDelimiterCharacter()+this.doGetNameArray().join(this.getDelimiterCharacter());
        //console.info(s);

        for (let i = 0; i < s.length; i++){
            c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }

        return hashCode;
    }

    /** @methodtype assertion-method */
    public isEmpty(): boolean {
        // Class Invariants
        this.assertClassInvariants();

        return this.getNoComponents() < 1 || (this.getNoComponents() == 1 && this.getComponent(0) === "");
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
    abstract setComponent(i: number, c: string): Name;

    /** @methodtype command-method */
    abstract insert(i: number, c: string): Name;
    /** @methodtype command-method */
    abstract append(c: string): Name;
    /** @methodtype command-method */
    abstract remove(i: number): Name;

    /** @methodtype factory-method */
    abstract createEmptyNameWithEqualDelimiter(): Name;

     /** @methodtype command-method */
    public concat(other: Name): Name {
        // Precondition
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, this.err_msg_invalid_input);

        // Class Invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + other.getNoComponents();

        let newName = this.clone();
        for(let i = 0; i < other.getNoComponents(); i++){
            newName = newName.append(other.getComponent(i));
        }
        
        // Postcondition
        this.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after concat");
        return newName;
    }

        //#############################################################//
    // Further methods added

    protected doGetNameArray(): string[] {
        let retArr:string[] = [];
        
        for(let i = 0; i < this.getNoComponents(); i++)
            retArr.push(this.getComponent(i));

        return retArr;
    }

    private doGetDelimiter(): string {
        return this.delimiter;
    }

    private doSetDelimiter(c: string): void{
        this.delimiter = c;
    }

    //#############################################################//
    // Design by Contract helper methods

    /** @methodtype assertion-method */
    protected isValidRange(i: number): void {
        this.isCond((i >= 0 && i < this.getNoComponents()), NameAssertType.PRECOND, "Out of Range");
    }

    /** @methodtype assertion-method */
    protected isCorrectlyEscaped(c: string): void {

        let lastChar:string = "";
        for (let i = 0; i < c.length; i++){
            // Check if current char is a control character that is not escaped
            if(c[i] === this.doGetDelimiter()){
                this.isCond(lastChar === ESCAPE_CHARACTER, NameAssertType.PRECOND, "Component not correctly escaped");
            }
            lastChar = c[i];
        }
    }

    /** @methodtype assertion-method */
    protected assertClassInvariants(): void {
        this.isNotNullOrUndefined(this.doGetDelimiter(), NameAssertType.CLASSINVAR, "Delimiter String invalid");
        this.isNotNullOrUndefined(this.doGetNameArray(), NameAssertType.CLASSINVAR, "Name variable is invalid");
        this.isCond(this.getNoComponents() >= 0, NameAssertType.CLASSINVAR, "Number of components invalid");
    }

    /** @methodtype assertion-method */
    protected isNotNullOrUndefined(other: Object, assertType:NameAssertType, msg:string): void {
        if(assertType == NameAssertType.PRECOND){ // Precondition
            IllegalArgumentException.assert((other != null && other != undefined), msg);
        } else if(assertType == NameAssertType.POSTCOND){ // Postcondition
            MethodFailedException.assert((other != null && other != undefined), msg);
        } else { // Class Invariant
            InvalidStateException.assert((other != null && other != undefined), msg);
        }
    }

    /** @methodtype assertion-method */
    protected isCond(cond: boolean, assertType:NameAssertType, msg:string): void {
        if(assertType == NameAssertType.PRECOND){ // Precondition
            IllegalArgumentException.assert(cond, msg);
        } else if(assertType == NameAssertType.POSTCOND){ // Postcondition
            MethodFailedException.assert(cond, msg);
        } else { // Class Invariant
            InvalidStateException.assert(cond, msg);
        } 
    }
}