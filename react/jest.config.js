module.exports = {
    // テストファイルは tests ディレクトリに指定
    // テストファイルには `spec` か `test` を付けるように指定
    testMatch: [
        "**/tests/**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    // src ディレクトリ内の .js ファイルは babel-jest で変換する
    // babel-jest での変換だけならもしかしたら指定しなくても良いかも知れない
    transform: {
        "^.+\\.js$": '<rootDir>/node_modules/babel-jest',
    },
    // カバレッジの対象ファイルを `**/src/**/*.js` にして `node_modules` を除外
    collectCoverageFrom: [
        "**/src/**/*.js",
        "!**/node_modules/**",
    ],
};
