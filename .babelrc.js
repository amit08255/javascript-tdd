const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  "presets": [
    "next/babel", 
    ["@babel/preset-env", {"modules": isTest ? 'commonjs' : false}]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "asyncGenerators": false,
      "generators": false,
      "async": false
    }],
    ["module-resolver", {
    "root": ["./dist"],
    "alias": {
        "utilities": "./utilities"
    }
    }],
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
]
}
