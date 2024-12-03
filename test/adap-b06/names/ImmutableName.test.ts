import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    let n_new = n.insert(1, "cs");
    expect(n.asString()).toBe("oss.fau.de");
    expect(n_new.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    let n_new = n.append("de");
    expect(n.asString()).toBe("oss.cs.fau");
    expect(n_new.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let n_new = n.remove(0);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n_new.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    let n_new = n.insert(1, "cs");
    expect(n.asString()).toBe("oss.fau.de");
    expect(n_new.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    let n_new = n.append("de");
    expect(n.asString()).toBe("oss.cs.fau");
    expect(n_new.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let n_new = n.remove(0);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n_new.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    let n_new = n.insert(1, "cs");
    expect(n.asString()).toBe("oss#fau#de");
    expect(n_new.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    let n_new = n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n_new.asString()).toBe("oss.cs.fau.de#people");
  });
});