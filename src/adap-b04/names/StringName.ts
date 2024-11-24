import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName , NameAssertType} from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

        // Precondition
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, "Invalid input data given");

        // Execution
        this.name = other;
    }

    public getNoComponents(): number {
        return this.createArrayByDelimiter(this.name).length;
    }

    public getComponent(i: number): string {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        return this.createArrayByDelimiter(this.name)[i];
    }

    public setComponent(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        // Execution
        let comps = this.createArrayByDelimiter(this.name);

        // Change
        comps[i] = c;

        // Update
        this.updateName(comps);

        // Class invariants
        this.assertClassInvariants();
    }

    public insert(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 0, c);

        // Update
        this.updateName(comps);
    }

    public append(c: string) {
        // Precondition
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(this.getNoComponents(), 0, c);

        // Update
        this.updateName(comps);
    }

    public remove(i: number) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        // Change
        let comps = this.createArrayByDelimiter(this.name);
        comps.splice(i, 1);

        // Update
        this.updateName(comps);
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
    }
}