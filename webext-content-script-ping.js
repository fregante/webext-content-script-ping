// https://github.com/bfred-it/webext-content-script-ping

function pingContentScript(tab) {
	return new Promise((resolve, reject) => {
		console.log('webext-content-script-ping: will ping');
		console.log(tab);
		setTimeout(() => {
			console.log('webext-content-script-ping: timeout');
			console.log(tab);
			reject();
		}, 300);
		chrome.tabs.sendMessage(tab.id || tab, chrome.runtime.id, {
			// Only the main frame is necessary;
			// if that isn't loaded, no other iframe is
			frameId: 0
		}, response => {
			console.log('webext-content-script-ping: got ping back: ', response);
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
		console.log('webext-content-script-ping: got ping: ', request, chrome.runtime.id);
		if (request === chrome.runtime.id) {
			sendResponse(chrome.runtime.id);
		}
	});
}

if (typeof exports === 'object') {
	exports.pingContentScript = pingContentScript;
}
