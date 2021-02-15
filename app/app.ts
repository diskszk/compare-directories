import fs from "fs";
import { join as pathJoin, basename as pathBasename } from "path";

type Foo = string | Foo[];

// ディレクトリからファイル/ディレクトリを再帰的に取得する
export function exploreDirectoryRecursively(dirPath: string): string[] | [] {
  if (!fs.statSync(dirPath).isDirectory()) {
    return [];
  }

  // ディレクトリ名|ファイル名の配列
  const basenameList = fs.readdirSync(dirPath);

  return basenameList
    .map((basename) => {
      const path = pathJoin(dirPath, basename);
      const isDirectory = fs.statSync(path).isDirectory();
      if (!isDirectory) {
        return path;
      }

      return exploreDirectoryRecursively(path);
    })
    .flat();
}

//  pathの末尾のファイル名を取得
export function getFilename(fullPath: string): string {
  //  fileであることを担保
  if (!fs.statSync(fullPath).isFile()) {
    console.log(`${fullPath}はファイルではありません`);
    return "";
  }
  return pathBasename(fullPath);
}

// 先に入力した引数にだけ存在するファイルを取得する
export function getOnlyExistsInFormer(
  filePathListA: string[],
  filePathListB: string[]
): Set<string> {
  // dirA/ファイル までのパスを詰めたセットを作成
  const filePathListASet = new Set<string>(filePathListA);

  filePathListA.map((filePathA) => {
    const filenameA = getFilename(filePathA);

    // ListBに同名のファイルが存在する場合セットから除外する
    filePathListB.map((filePathB) => {
      const filenameB = getFilename(filePathB);

      if (filenameA === filenameB) {
        filePathListASet.delete(filePathA);
      }
    });
  });

  return filePathListASet;
}

export function checkExistsFileOrDirectory(path: string): boolean {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
    } else {
      console.error("予期せぬエラーが発生しました", err);
      throw new Error(err);
    }
    return false;
  }
}

async function main() {
  // 引数が２個付けてあるかの確認
  if (process.argv.length === 5) {
    throw new Error(
      "引数に探索対象ディレクトリのパスを２つ付けて実行してください"
    );
  }
  const baseDirA = process.argv[2];
  const baseDirB = process.argv[3];

  // ディレクトリのパスが正しいかチェック
  if (
    !checkExistsFileOrDirectory(baseDirA) ||
    !checkExistsFileOrDirectory(baseDirB)
  ) {
    throw new Error("引数に指定されたパスにディレクトリが存在しません");
  }
  // ディレクトリ名/ファイル名の配列
  const filePathListA = exploreDirectoryRecursively(baseDirA);
  const filePathListB = exploreDirectoryRecursively(baseDirB);

  // console.dir({ result: filePathListA }, { depth: null });
  // console.dir({ result: filePathListB }, { depth: null });

  // baseDirAに存在するファイルだけを抽出
  const onlyExistsBaseDirA = getOnlyExistsInFormer(
    filePathListA,
    filePathListB
  );

  console.dir({ result: onlyExistsBaseDirA }, { depth: null });
}

main().catch((err) => {
  console.error(err);
  // process.exit(1); // process.exit()があるとtestできない？
});
