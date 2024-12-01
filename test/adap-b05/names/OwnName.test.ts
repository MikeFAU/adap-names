import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b05/names/Name";
import { StringName } from "../../../src/adap-b05/names/StringName";
import { StringArrayName } from "../../../src/adap-b05/names/StringArrayName";

describe("Own Basic StringArrayName function tests", () => {
  it("test data string representation", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    expect(n.asDataString()).toBe("oss.fau.de");
  });

  it("test string representation basic", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    expect(n.asString()).toBe("oss.fau.de");
  });

  it("test string representation advance", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"], "#");
    expect(n.asString("#")).toBe("oss#fau#de");
  });

  it("test number of comps", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    expect(n.getNoComponents()).toBe(3);
  });

  it("test is empty", () => {
    let n: Name = new StringArrayName([]);
    expect(n.isEmpty()).toBe(true);
  });

  it("test get Component", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    expect(n.getComponent(1)).toBe("fau");
  });

  it("test set Component", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.setComponent(1, "new")
    expect(n.asString()).toBe("oss.new.de");
  });

  it("test concat", () => {
    let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);
    let other: StringArrayName = new StringArrayName(["own", "test"]);
    n.concat(other);
    expect(n.asString()).toBe("oss.fau.de.own.test");
  });
});

describe("Own Basic StringName function tests", () => {
  it("test data string representation", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(n.asDataString()).toBe("oss.fau.de");
  });

  it("test string representation basic", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(n.asString()).toBe("oss.fau.de");
  });

  it("test string representation advance", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(n.asString("#")).toBe("oss#fau#de");
  });

  it("test number of comps", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(n.getNoComponents()).toBe(3);
  });

  it("test number of comps advance 1", () => {
    let n: Name = new StringName("///", "/");
    expect(n.getNoComponents()).toBe(4);
  });

  it("test number of comps advance 2", () => {
    let n: Name = new StringName("Oh\\.\\.\\.", ".");
    expect(n.getNoComponents()).toBe(1);
  });

  it("test is empty", () => {
    let n: Name = new StringName("");
    expect(n.isEmpty()).toBe(true);
  });

  it("test get Component", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(n.getComponent(1)).toBe("fau");
  });

  it("test set Component", () => {
    let n: Name = new StringName("oss.fau.de");
    n.setComponent(1, "new")
    expect(n.asString()).toBe("oss.new.de");
  });

  it("test concat Component", () => {
    let n: StringName = new StringName("oss.fau.de");
    let other: StringName = new StringName("own.test");
    n.concat(other);
    expect(n.asString()).toBe("oss.fau.de.own.test");
  });
});

