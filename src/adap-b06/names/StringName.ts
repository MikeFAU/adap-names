import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName, NameAssertType } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

        // Precondition
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, this.err_msg_invalid_input);

        // Execution
        this.name = other;
        this.noComponents = this.getNoComponents();
    }

    public getNoComponents(): number {
        return this.createArrayByDelimiter(this.name).length;
    }

    public getComponent(i: number): string {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);

        return this.createArrayByDelimiter(this.name)[i];
    }

    public setComponent(i: number, c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();

        // Execution
        let comps = this.createArrayByDelimiter(this.name);

        // Change
        comps[i] = c;

        // Create new Name
        let newName = this.doCreateName(comps);
        newName.assertClassInvariants();
        return newName;
        
    }

    public insert(i: number, c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 0, c);

        // Create new Name
        let newName = this.doCreateName(comps);
        newName.assertClassInvariants();
        
        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after insert");

        return newName;
    }

    public append(c: string): Name {
        // Precondition
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isCorrectlyEscaped(c);

        // Class invariants
        this.assertClassInvariants();
        
        // Save expected number of components for post condition
        let n:number = this.getNoComponents() + 1;

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(this.getNoComponents(), 0, c);

        // Create new Name
        let newName = this.doCreateName(comps);
        newName.assertClassInvariants();

        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after append");
        return newName;
    }

    public remove(i: number): Name {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, this.err_msg_invalid_input);
        this.isValidRange(i);

        // Class invariants
        this.assertClassInvariants();

        // Save expected number of components for post condition
        let n:number = this.getNoComponents() - 1;

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 1);

        // Create new Name
        let newName = this.doCreateName(comps);
        newName.assertClassInvariants();

        // Postcondition
        newName.isCond(n === newName.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after remove");  
        return newName;      
    }

    createEmptyNameWithEqualDelimiter(): Name {
        return new StringName("", this.getDelimiterCharacter());
    }

    //#############################################################//
    // Further methods added

    /** @methodtype helper-method */
    private createArrayByDelimiter(inputName: String): string[] {
        
        if(inputName.length < 1)
            return [""];

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
    private doCreateName(c: string[]): StringName {
        let newName = c.join(this.delimiter);
        return new StringName(newName, this.getDelimiterCharacter());
    }

}