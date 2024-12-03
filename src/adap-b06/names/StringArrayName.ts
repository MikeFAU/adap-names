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

    public setComponent(i: number, c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Check for own class invariants
        this.assertClassInvariants();        

        // Changing: 
        let comps: string[] = this.doGetNameArray();
        comps[i] = c;
        let newName = new StringArrayName(comps, this.getDelimiterCharacter());

        // Class invariants
        newName.assertClassInvariants();

        return newName;
    }

    public insert(i: number, c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Check for own class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;  
        
        // Changing: 
        let comps: string[] = this.doGetNameArray();
        comps.splice(i, 0, c);
        let newName = new StringArrayName(comps, this.getDelimiterCharacter());

        // Class invariants
        newName.assertClassInvariants();

        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after insert");
        
        return newName;
    }

    public append(c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isCorrectlyEscaped(c);

        // Check for own class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;      
        
        // Changing: 
        let comps: string[] = this.doGetNameArray();
        comps.splice(this.getNoComponents(), 0, c);
        let newName = new StringArrayName(comps, this.getDelimiterCharacter());

        // Class invariants
        newName.assertClassInvariants();

        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after append");    
        return newName;    
    }

    public remove(i: number): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);

        // Check for own class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() - 1;

        // Changing: 
        let comps: string[] = this.doGetNameArray();
        comps.splice(i, 1);
        let newName = new StringArrayName(comps, this.getDelimiterCharacter());

        // Class invariants
        newName.assertClassInvariants();


        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after remove");  
        return newName;      
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