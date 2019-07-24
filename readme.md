# webext-content-script-ping [![Travis build status](https://api.travis-ci.org/fregante/webext-content-script-ping.svg?branch=master)](https://travis-ci.org/fregante/webext-content-script-ping) [![npm version](https://img.shields.io/npm/v/webext-content-script-ping.svg)](https://www.npmjs.com/package/webext-content-script-ping)

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

* [webext-options-sync](https://github.com/fregante/webext-options-sync) - Helps you manage and autosave your extension's options.
* [webext-storage-cache](https://github.com/fregante/webext-storage-cache) - Map-like promised cache storage with expiration.
* [webext-domain-permission-toggle](https://github.com/fregante/webext-domain-permission-toggle) - Browser-action context menu to request permission for the current tab.
* [webext-dynamic-content-scripts](https://github.com/fregante/webext-dynamic-content-scripts) - Automatically inject your `content_scripts` on custom domains.
* [webext-detect-page](https://github.com/fregante/webext-detect-page) - Detects where the current browser extension code is being run.
* [`Awesome WebExtensions`](https://github.com/fregante/Awesome-WebExtensions): A curated list of awesome resources for Web Extensions development.

## License

MIT © [Federico Brigante](https://bfred.it)
