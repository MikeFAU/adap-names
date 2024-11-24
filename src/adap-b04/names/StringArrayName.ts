import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName, NameAssertType } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        // Precondition
        this.isNotNullOrUndefined(other, NameAssertType.PRECOND, "Invalid input data given");

        // Execution
        this.components = other;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        // Precondition
        this.isNotNullOrUndefined(c, NameAssertType.PRECOND, "Invalid input data given");

        this.components.splice(this.getNoComponents(), 0, c);
    }

    public remove(i: number) {
        // Precondition
        this.isNotNullOrUndefined(i, NameAssertType.PRECOND, "Invalid input data given");
        this.isValidRange(i);

        this.components.splice(i, 1);
    }

    createEmptyNameWithEqualDelimiter(): Name {
        return new StringArrayName([], this.getDelimiterCharacter());
    }
}