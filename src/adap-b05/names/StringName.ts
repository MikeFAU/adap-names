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

    public setComponent(i: number, c: string) {
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

        // Update
        this.updateName(comps);
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

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 0, c);

        // Update
        this.updateName(comps);

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

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(this.getNoComponents(), 0, c);

        // Update
        this.updateName(comps);

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

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 1);

        // Update
        this.updateName(comps);

        // Postcondition
        this.isCond(n === this.getNoComponents(), NameAssertType.POSTCOND, "Invalid Number of components after remove");        
    }

    createEmptyNameWithEqualDelimiter(): Name {
        return new StringName("", this.getDelimiterCharacter());
    }

    //#############################################################//
    // Further methods added

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
        this.noComponents = c.length;
    }

}