import * as mockFs from "mock-fs";
import { readFileSync } from "fs";
import LogService from "../../src/logger";

beforeEach(() => {
    //@ts-ignore
    mockFs();
});
afterEach(() => mockFs.restore());

test("Can create a a new LogService", () => {
    expect(new LogService("test")).toBeDefined();
});

test("Can create multiple LogServices", async () => {
    const first = new LogService("first");
    const second = new LogService("second");
    expect(second).toBeDefined();
    expect(first).toBeDefined();
});

test("Can use multiple loggers", async () => {
    const first = new LogService("first");
    const second = new LogService("second");
    first.logger.debug("first");
    second.logger.debug("second");

    await LogService.shutDown();

    const firstContents = readFileSync(first.logPath).toString();
    const secondContents = readFileSync(second.logPath).toString();

    expect(firstContents.length).toBeTruthy();
    expect(secondContents.length).toBeTruthy();
});
