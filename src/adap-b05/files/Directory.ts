import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    protected doFindNodes(bn: string): Set<Node> {
        const retSet = super.doFindNodes(bn);

        for(var node of this.getChildNodes().values()){
            for(var foundNode of node.findNodes(bn)){
                retSet.add(foundNode);
            }
        }
        return new Set<Node>(retSet);
    }

    private getChildNodes(): Set<Node> {
        return new Set(this.childNodes);
    }
}