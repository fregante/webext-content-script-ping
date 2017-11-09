// https://github.com/bfred-it/webext-content-script-ping

/**
 * Ping responder
 */
document.__webextContentScriptLoaded = true;

/**
 * Pinger
 */
function pingContentScript(tab) {
	return new Promise((resolve, reject) => {
		chrome.tabs.executeScript(tab.id || tab, {
			code: 'document.__webextContentScriptLoaded',
			runAt: 'document_start'
		}, ([hasScriptAlready]) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else if (hasScriptAlready) {
				resolve();
			} else {
				reject();
			}
		});
	});
}

if (typeof module === 'object') {
	module.exports = pingContentScript;
}
