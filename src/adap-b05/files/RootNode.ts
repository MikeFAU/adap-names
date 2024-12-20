import { Exception } from "../common/Exception";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { InvalidStateException } from "../common/InvalidStateException";

import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { Node } from "./Node";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    protected doFindNodes(bn: string): Set<Node> {
        try {
            return super.doFindNodes(bn);
        }
        catch(er) {
            let ex = er as Exception;
            ServiceFailureException.assert(false, "service failed", ex); // Make sure that exception is thrown
            return new Set<Node>(); // Necessary since compiler is complaining??
        }
    }

    protected assertIsValidBaseName(bn: string): void {
        const condition: boolean = (bn == ""); // Root must have "" as base name
        InvalidStateException.assert(condition, "invalid base name");
    }
}