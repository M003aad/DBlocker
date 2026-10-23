let BLOCKED_DOMAINS = [];

chrome.storage.local.get(["blocked"], data => {
  BLOCKED_DOMAINS = data.blocked || [];
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "ADD_DOMAIN") {
    const domain = msg.domain.toLowerCase();
    if (BLOCKED_DOMAINS.includes(domain)) {
      sendResponse({ ok: false });
      return;
    }
    BLOCKED_DOMAINS.push(domain);
    chrome.storage.local.set({ blocked: BLOCKED_DOMAINS });
    sendResponse({ ok: true });
    return true;
  }

  if (msg.type === "REMOVE_DOMAIN") {
    BLOCKED_DOMAINS = BLOCKED_DOMAINS.filter(d => d !== msg.domain);
    sendResponse({ ok: true });
    return true;
  }
});


function checkAndClose(tabId, url) {
  if (!url || !url.startsWith("http")) return;
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return;
  }
  if (!hostname.includes(".")) return;

  const isBlocked = BLOCKED_DOMAINS.some(
    d => hostname === d || hostname.endsWith("." + d)
  );

  if (isBlocked) {
    chrome.tabs.remove(tabId);
  }
}

chrome.tabs.onCreated.addListener(tab => {
  checkAndClose(tab.id, tab.pendingUrl || tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkAndClose(tabId, changeInfo.url);
  }
});
