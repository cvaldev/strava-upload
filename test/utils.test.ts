import { isFileSupported, deleteTempFile } from "../src/utils";
import * as mock from "mock-fs";
import { existsSync } from "fs";

describe("isFileSupported()", () => {
    const extensions = [".FIT", ".TCX", ".GPX"];
    for (const extension of extensions) {
        test(`Allows ${extension}`, () => {
            expect(isFileSupported(`tmp${extension}`)).toBe(true);
        });
    }
});

describe("deleteTempFile()", () => {
    const file = "foo/bar.fit";
    beforeEach(() => {
        mock({
            [file]: "contents"
        });
    });
    afterEach(mock.restore);

    test("Can delete a file", () => {
        expect(existsSync(file)).toBe(true);
        deleteTempFile(file);
        expect(existsSync(file)).toBe(false);
    });
});
