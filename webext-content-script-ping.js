// https://github.com/bfred-it/webext-content-script-ping

function pingContentScript(tab) {
	return new Promise((resolve, reject) => {
		setTimeout(reject, 300);
		chrome.tabs.sendMessage(tab.id || tab, chrome.runtime.id, {
			// Only the main frame is necessary;
			// if that isn't loaded, no other iframe is
			frameId: 0
		}, response => {
			if (response === chrome.runtime.id) {
				resolve();
			} else {
				reject();
			}
		});
	});
}

if (!chrome.runtime.getBackground) {
	// Respond to pings
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request === chrome.runtime.id) {
			sendResponse(chrome.runtime.id);
		}
	});
}

if (typeof exports === 'object') {
	exports.pingContentScript = pingContentScript;
}
