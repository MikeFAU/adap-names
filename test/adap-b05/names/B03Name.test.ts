import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b05/names/Name";
import { StringName } from "../../../src/adap-b05/names/StringName";
import { StringArrayName } from "../../../src/adap-b05/names/StringArrayName";

describe("Basic AbstractName function tests with StringName", () => {

    it("test equality and hashCode", () => {
        let n1: Name = new StringName("oss.fau.de");
        let n2: Name = new StringName("oss.fau.de");

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(true)
    });

    it("test inequality 1 and hashCode (Different delimiter)", () => {
        let n1: Name = new StringName("oss.fau.de", ".");
        let n2: Name = new StringName("oss#fau#de", "#");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test inequality 2 and hashCode (different component)", () => {
        let n1: Name = new StringName("oss.fau.de", ".");
        let n2: Name = new StringName("oss.fau.de1", ".");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test inequality 3 and hashCode (different number of componenents)", () => {
        let n1: Name = new StringName("oss.fau.de", ".");
        let n2: Name = new StringName("oss.fau", ".");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test clone", () => {
        let n1: StringName = new StringName("oss#fau#de", "#");
        let n2 = n1.clone();

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(true)
    });
});

describe("Basic AbstractName function tests with StringArrayName", () => {

    it("test equality and hashCode", () => {
        let n1: Name = new StringArrayName(["oss", "fau", "de"]);
        let n2: Name = new StringArrayName(["oss", "fau", "de"]);

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(true)
    });

    it("test inequality 1 and hashCode (Different delimiter)", () => {
        let n1: Name = new StringArrayName(["oss", "fau", "de"], ".");
        let n2: Name = new StringArrayName(["oss", "fau", "de"], "#");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test inequality 2 and hashCode (different component)", () => {
        let n1: Name = new StringArrayName(["oss", "fau", "de"], ".");
        let n2: Name = new StringArrayName(["oss", "fau", "de1"], ".");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test inequality 3 and hashCode (different number of componenents)", () => {
        let n1: Name = new StringArrayName(["oss", "fau", "de"], ".");
        let n2: Name = new StringArrayName(["oss", "fau"], ".");

        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(false)
    });

    it("test clone", () => {
        let n1: StringArrayName = new StringArrayName(["oss", "fau", "de"], "#");
        let n2 = n1.clone();

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() === n2.getHashCode()).toBe(true)
    });
});