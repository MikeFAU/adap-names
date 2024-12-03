import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b06/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b06/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b06/common/InvalidStateException";

import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";


/**  IMPORTANT: 
* Compiler complains about "error TS2345: Argument of type 'number | null | undefined' is not assignable to parameter of type 'number'."
* Therefore a lot of tests regarding Null or Undefined argument do not work with GitHub Actions
*/

describe("StringName Design by Contract testing", () => {
    
    // Implementation is part of AbstractName
    it("test invalid input constructor", async () => {
        let err_msg = "Invalid input data given";
        //let value: string | undefined | null = undefined;

        expect(() => new StringName((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input asString", async () => {
        let err_msg = "Invalid input data given";
        //let value: string | undefined | null = null;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.asString((null as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input isEqual", async () => {
        let err_msg = "Invalid input data given";
        //let value: Name | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.isEqual((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input concat", async () => {
        let err_msg = "Invalid input data given";
        //let value: Name | undefined | null = undefined;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.concat((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    // Implementation is part of StringName
    it("test invalid input getComponent", async () => {
        let err_msg = "Invalid input data given";
        //let value: number | undefined | null = undefined;
        let value: number;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.getComponent((undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        value = 100;
        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input setComponent", async () => {
        let err_msg = "Invalid input data given";
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.setComponent((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.setComponent(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.insert((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.insert((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        let idx: number;
        let n: StringName = new StringName("oss.fau.de");

        expect(() => n.remove((undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
    });
});

describe("StringArrayName Design by Contract testing", () => {
    
    // Implementation is part of AbstractName
    it("test invalid input constructor", async () => {
        let err_msg = "Invalid input data given";
        //let value: string[] | undefined | null = undefined;
        let value: string[];

        expect(() => new StringArrayName((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 

        value = ["oss", "fau", (undefined as any)];
        expect(() => new StringArrayName(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input asString", async () => {
        let err_msg = "Invalid input data given";
        //let value: string | undefined | null = null;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.asString((null as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input isEqual", async () => {
        let err_msg = "Invalid input data given";
        //let value: Name | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.isEqual((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    it("test invalid input concat", async () => {
        let err_msg = "Invalid input data given";
        //let value: Name | undefined | null = undefined;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.concat((undefined as any))).toThrow(new IllegalArgumentException(err_msg)); 
    });

    // Implementation is part of StringName
    it("test invalid input getComponent", async () => {
        let err_msg = "Invalid input data given";
        //let value: number | undefined | null = undefined;
        let value: number;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.getComponent((undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        value = 100;
        expect(() => n.getComponent(value)).toThrow(new IllegalArgumentException(err_msg));
    });

    it("test invalid input setComponent", async () => {
        let err_msg = "Invalid input data given";
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.setComponent((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.setComponent(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.insert((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        //let comp: string | undefined | null = undefined;
        let idx: number;
        let comp: string;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.insert((undefined as any), "")).toThrow(new IllegalArgumentException(err_msg));
        expect(() => n.insert(0, (undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
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
        //let idx: number | undefined | null = undefined;
        let idx: number;
        let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);

        expect(() => n.remove((undefined as any))).toThrow(new IllegalArgumentException(err_msg));
        
        err_msg = "Out of Range";
        idx = 100;
        expect(() => n.remove(idx)).toThrow(new IllegalArgumentException(err_msg));
    });
});

describe("Equality test", () => {
    it("test isEqual", () => {
      let sn1: Name = new StringName("oss#fau#de", "#");
      let san1: Name = new StringArrayName(["oss", "fau", "de"], "#");
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);
  
      sn1 = sn1.insert(1, "test");
      san1 = san1.insert(1, "test");
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      sn1 = sn1.setComponent(2, "new");
      san1 = san1.setComponent(2, "new");
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      let csn1:Name = new StringName("new#string", "#");
      sn1 = sn1.concat(csn1);
      san1 = san1.concat(csn1);
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      let csan1:Name = new StringArrayName(["another", "new", "name"], "#");
      sn1 = sn1.concat(csan1);
      san1 = san1.concat(csan1);
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      sn1 = sn1.remove(4);
      san1 = san1.remove(4);
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      sn1 = sn1.append("funny");
      san1 = san1.append("funny");
      expect(sn1.isEqual(san1)).toBe(true);
      expect(sn1.getHashCode() == san1.getHashCode()).toBe(true);

      // Final compare
      expect(sn1.asDataString()).toBe(san1.asDataString());
    });
  });