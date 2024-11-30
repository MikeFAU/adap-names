import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

import {Directory} from "../../../src/adap-b04/files/Directory"
import {File} from "../../../src/adap-b04/files/File"
import {Link} from "../../../src/adap-b04/files/Link"
import {Node} from "../../../src/adap-b04/files/Node"
import {RootNode} from "../../../src/adap-b04/files/RootNode"

describe("Client-File Contract according to ADAP B04 Slide 10", () => {
    it("test don't open an open file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.open();
        expect(() => n.open()).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't open a deleted file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.delete();
        expect(() => n.open()).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't close a closed file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.open();
        n.close();
        expect(() => n.close()).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't close a deleted file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.delete();
        expect(() => n.close()).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't read from a closed file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.open();
        n.close();
        expect(() => n.read(10)).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't read from a deleted file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.delete();
        expect(() => n.read(10)).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't write to a closed file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.open();
        n.close();
        expect(() => n.write([])).toThrow(new InvalidStateException("invalid file state"));
    });

    it("test don't write to a deleted file", async () => {
        let rootNode:RootNode = new RootNode();
        let usr:Directory = new Directory("usr", rootNode);
        let bin:Directory = new Directory("bin", usr);
        let n:File = new File("ls", bin);

        n.delete();
        expect(() => n.write([])).toThrow(new InvalidStateException("invalid file state"));
    });
  });