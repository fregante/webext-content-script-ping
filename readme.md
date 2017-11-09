# webext-content-script-ping [![Travis build status](https://api.travis-ci.org/bfred-it/webext-content-script-ping.svg?branch=master)](https://travis-ci.org/bfred-it/webext-content-script-ping) [![npm version](https://img.shields.io/npm/v/webext-content-script-ping.svg)](https://www.npmjs.com/package/webext-content-script-ping)

> One-file interface to detect whether your content script have loaded.

## Install

```sh
npm install --save webext-content-script-ping
```

```js
import {pingContentScript} from 'webext-content-script-ping';
```

## Usage

From `background.js`, ping a tab id:

```js
/* globals pingContentScript */
pingContentScript(tabId).then(() => {
	// the content script was loaded!
}, () => {
	// the content script was NOT loaded!
});
```

### Plain files

1. In your `manifest.json`, include the file as background and as content script:

	```js
	{
		"background": {
			"scripts": [
				"webext-content-script-ping.js"
			]
		},
		"content_scripts": [
			{
				"js": [
					"webext-content-script-ping.js",
					"content.js"
				]
			}
		]
	}
	```

2. In your background script **only**, run `pingContentScript(tabId)` as needed

### With a bundler

```js
// background.js
import pingContentScript from 'webext-content-script-ping';
pingContentScript(tabId);
```

```js
// content.js
import 'webext-content-script-ping'; // this only responds to the ping
```

## API

#### pingContentScript(tab)

Returns a Promise that succeeds if the content was loaded, fails if it wasn't.

It has an internal timeout of 300ms.

##### tab

Type: `Tab` or `number`

A `Tab` object or just its `id` as defined here: https://developer.chrome.com/extensions/tabs#type-Tab

## Related

* [`webext-options-sync`](https://github.com/bfred-it/webext-options-sync): Helps you manage and autosave your extension's options.
* [`webext-inject-on-install`](https://github.com/bfred-it/webext-inject-on-install): Automatically add content scripts to existing tabs when your extension is installed.
* [`Awesome WebExtensions`](https://github.com/bfred-it/Awesome-WebExtensions): A curated list of awesome resources for Web Extensions development.

## License

MIT © Federico Brigante — [Twitter](http://twitter.com/bfred_it)
