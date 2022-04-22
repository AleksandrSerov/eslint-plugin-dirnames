'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const path = require('path');
const kebabCase = require('kebab-case');

const numberRegex = /\d+/;
const placeholder = '\uFFFF';
const placeholderRegEx = new RegExp(placeholder, 'i');

const ignoreNumbers = fn => string => {
    const stack = [];
    let execResult = numberRegex.exec(string);

    while (execResult) {
        stack.push(execResult[0]);
        string = string.replace(execResult[0], placeholder);
        execResult = numberRegex.exec(string);
    }

    let withCase = fn(string);
    while (stack.length > 0) {
        withCase = withCase.replace(placeholderRegEx, stack.shift());
    };

    return withCase;
}

const parseDirnames = (cwd, pathToFile) => {
    const parsed = pathToFile.replace(cwd, '').split(path.sep);
    parsed.shift();

    return parsed;
}

module.exports = {
    create: (context) => {
        const cwd = context.getCwd();
        const filename = context.getFilename();
        const pathToFile = path.resolve(filename);
        const dirnames = parseDirnames(cwd, path.dirname(pathToFile));
        const ignoreNumbersKebabCase = ignoreNumbers(kebabCase);

        return {
            Program: (node) => {
                dirnames.forEach((dirname) => {
                    const renamedDirname = ignoreNumbersKebabCase(dirname)
                    const isValidDirname = renamedDirname === dirname;
                    if (isValidDirname) {
                        return;
                    }
                    context.report({
                        node: node,
                        message:
                            'Dirname "{{dirname}}" does not match the naming convention "kebab-case". Rename it to "{{renamedDirname}}"',
                        data: {
                            dirname: dirname,
                            renamedDirname: renamedDirname
                        },
                    });
                });
            },
        };
    },
};