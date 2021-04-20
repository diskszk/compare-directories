import { checkExistsFileOrDirectory, getPathsExistOnlyInFormer } from "./app";

const listA = [
  "/Users/suzukidaisuke/work/dirs/dirA/pokemon/pichu.txt",
  "/Users/suzukidaisuke/work/dirs/dirA/pokemon/pikachu.txt",
  "/Users/suzukidaisuke/work/dirs/dirA/pokemon/raichu.txt",
];
const listB = [
  "/Users/suzukidaisuke/work/dirs/dirA/pokemon/pikachu.txt",
  "/Users/suzukidaisuke/work/dirs/dirA/pokemon/raichu.txt",
];
const existsPath = "/Users/suzukidaisuke/work/dirs/dirB/mario/luige.txt";
const notExistsPath = "/Foo/bar/example/test.txt";

describe("checkExistsFileOrDirectory", () => {
  test("存在するファイルパスを引数に受け取った場合にtrueを返す", () => {
    const isExists = checkExistsFileOrDirectory(existsPath);
    expect(isExists).toBe(true);
  });
  test("存在しないディレクトリパスを受け立った場合にfalseを返す", () => {
    const isExists = checkExistsFileOrDirectory(notExistsPath);
    expect(isExists).toBe(false);
  });
});

describe("getOnlyExistsInFormer", () => {
  test("ListAにのみ存在するパスを取得できる", () => {
    const onlyExistsListA = getPathsExistOnlyInFormer(listA, listB);
    expect(onlyExistsListA).toContain(
      "/Users/suzukidaisuke/work/dirs/dirA/pokemon/pichu.txt"
    );
  });
});
