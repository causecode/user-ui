const tsc = require('typescript');

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const env = require('babel-preset-env');
const stage3 = require('babel-preset-stage-3');

module.exports = {
    process: function (src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            var es6Code = tsc.transpile(
                src,
                {
                    target: tsc.ScriptTarget.ES6,
                    module: tsc.ModuleKind.CommonJS,
                    jsx: tsc.JsxEmit.React
                },
                path,
                []
            );
            return babel.transform(es6Code, {
                auxiliaryCommentBefore: ' istanbul ignore next ',
                presets: [jestPreset, env, stage3],
                retainLines: true
            }).code;
        }
        return src;
    }
};