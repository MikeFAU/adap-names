import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        
        this.isNotNone(other);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.isValidRange(i);
        return this.components[i];
    }

    setComponent(i: number, c: string) {
        this.isValidRange(i);
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        this.isValidRange(i);
        this.components.splice(i, 0, c);
    }

    append(c: string) {
        this.components.splice(this.getNoComponents(), 0, c);
    }

    remove(i: number) {
        this.isValidRange(i);
        this.components.splice(i, 1);
    }

    createEmptyNameWithEqualDelimiter(): Name {
        return new StringArrayName([], this.getDelimiterCharacter());
    }
}