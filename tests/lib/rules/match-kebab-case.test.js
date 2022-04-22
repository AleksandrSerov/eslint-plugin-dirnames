"use strict";

var matchKebabCaseRule = require("../../../lib/rules/match-kebab-case");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

ruleTester.run("match-kebab-case", matchKebabCaseRule, {
    valid: [
        {
            code: "",
            filename: "/foo/bar.js"
        },
        {
            code: "",
            filename: "/foo-bar1/bar.js"
        },
    ],
    invalid: [
        {
            code: "",
            filename: "/fooBar/bar.js",
            errors: [
                { message: 'Dirname "fooBar" does not match the naming convention "kebab-case". Rename it to "foo-bar"'}
            ]
        },
        {
            code: "",
            filename: "/fooBar/barBazz/bar.js",
            errors: [
                { message: 'Dirname "fooBar" does not match the naming convention "kebab-case". Rename it to "foo-bar"'},
                { message: 'Dirname "barBazz" does not match the naming convention "kebab-case". Rename it to "bar-bazz"'}
            ]
        },
    ]
});