// eslist配置
module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"parser": "babel-eslint",
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		// "linebreak-style": [
		//     "error",
		//     "windows"
		// ],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		// "no-extra-semi" : 2,
		//控制台警告
		"no-console": [
			"warn"
		],

		"new-cap": [
			"off"
		],
		//关闭声明的变量未使用，与React组件冲突；
		"no-unused-vars": [
			"off"
		]
	}
};
