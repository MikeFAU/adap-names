import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName, NameAssertType } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        // Precondition
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefinedArray(other);

        // Execution
        this.components = other;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);

        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();

        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;        

        this.components.splice(i, 0, c);

        // Postcondition
        this.isCond(n === this.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after insert");        
    }

    public append(c: string) {
        // Precondition
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;        

        this.components.splice(this.getNoComponents(), 0, c);

        // Postcondition
        this.isCond(n === this.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after append");        
    }

    public remove(i: number) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);

        // Class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() - 1;

        this.components.splice(i, 1);

        // Postcondition
        this.isCond(n === this.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after remove");        
    }

    createEmptyNameWithEqualDelimiter(): Name {
        return new StringArrayName([], this.getDelimiterCharacter());
    }

    //#############################################################//
    // Further methods added

    /** @methodtype assertion-method */
    private isNotNullOrUndefinedArray(comps: string[]): void {
        for(let i=0; i < comps.length; i++)
            this.isNotNullOrUndefined(comps[i], NameAssertType.PRECOND, this.err_msg_invalid_input);
    }
}