import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailureException } from "../../../src/adap-b04/common/MethodFailureException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { delimiter } from "path";


describe("StringName Design by Contract testing", () => {
    
    // Implementation is part of AbstractName
    it("test invalid input constructor", async () => {
        let err_msg = "Invalid input data given";
        let value: string | undefined | null = undefined;

        expect(() => new StringName(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input asString", async () => {
        let err_msg = "Invalid input data given";
        let value: string | undefined | null = null;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.asString(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input isEqual", async () => {
        let err_msg = "Invalid input data given";
        let value: Name | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.isEqual(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input concat", async () => {
        let err_msg = "Invalid input data given";
        let value: Name | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.concat(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    // Implementation is part of StringName
    it("test invalid input getComponent", async () => {
        let err_msg = "Invalid input data given";
        let value: number | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        value = 100;
        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input setComponent", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.setComponent(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.setComponent(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.setComponent(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.setComponent(idx, comp)).toThrow(new IllegalArgumentException(err_msg));

    });

    it("test invalid input insert", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.insert(idx, comp)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input append", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.insert(idx, comp)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input remove", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
    });
});

describe("StringArrayName Design by Contract testing", () => {
    
    // Implementation is part of AbstractName
    it("test invalid input constructor", async () => {
        let err_msg = "Invalid input data given";
        let value: string[] | undefined | null = undefined;

        expect(() => new StringArrayName(value)).toThrow(new IllegalArgumentException(err_msg)); 

        value = ["oss", "fau", undefined];
        expect(() => new StringArrayName(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input asString", async () => {
        let err_msg = "Invalid input data given";
        let value: string | undefined | null = null;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.asString(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input isEqual", async () => {
        let err_msg = "Invalid input data given";
        let value: Name | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.isEqual(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input concat", async () => {
        let err_msg = "Invalid input data given";
        let value: Name | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.concat(value)).toThrow(new IllegalArgumentException(err_msg)); 
    });

    // Implementation is part of StringName
    it("test invalid input getComponent", async () => {
        let err_msg = "Invalid input data given";
        let value: number | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        value = 100;
        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input setComponent", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.setComponent(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.setComponent(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.setComponent(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.setComponent(idx, comp)).toThrow(new IllegalArgumentException(err_msg));

    });

    it("test invalid input insert", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.insert(idx, comp)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input append", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let comp: string | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, comp)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.insert(idx, "")).toThrow(new IllegalArgumentException(err_msg));

        err_msg = "Component not correctly escaped";
        idx = 0;
        comp = "test.com";
        expect(() => n.insert(idx, comp)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input remove", async () => {
        let err_msg = "Invalid input data given";
        let idx: number | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
    });
});