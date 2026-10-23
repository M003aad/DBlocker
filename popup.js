const input = document.getElementById("domain");
const status = document.getElementById("status");
const blockedList = document.getElementById("blockedList");

// Show status messages temporarily
function showStatus(message) {
  status.textContent = message;
  status.style.opacity = 1;
  setTimeout(() => {
    status.style.opacity = 0;
  }, 3000); // 3 seconds
}

// Render blocked domains list
function renderBlocked() {
  blockedList.innerHTML = "";
  chrome.storage.local.get(["blocked"], (data) => {
    const list = data.blocked || [];
    list.forEach((domain) => {
      const li = document.createElement("li");
      li.textContent = domain + " ";

      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.style.marginLeft = "5px";
      btn.onclick = () => removeDomain(domain);

      li.appendChild(btn);
      blockedList.appendChild(li);
    });
  });
}

// Add a domain
function addDomain(domain) {


  chrome.runtime.sendMessage({ type: "ADD_DOMAIN", domain }, (res) => {
    if (res?.ok) {
      //   showStatus(`Blocked: ${domain}`);
      input.value = "";
      renderBlocked();
    } else {
      showStatus("Already blocked");
    }
  });
}

// Remove a domain
function removeDomain(domain) {
  chrome.storage.local.get(["blocked"], (data) => {
    let list = data.blocked || [];
    list = list.filter((d) => d !== domain);
    chrome.storage.local.set({ blocked: list }, () => {
      //   showStatus(`Removed: ${domain}`);
      renderBlocked();

      // Notify background to update memory
      //   chrome.runtime.sendMessage({ type: "REMOVE_DOMAIN", domain });
    });
  });
}

// Add domain manually
document.getElementById("add").onclick = () => {
  const domain = input.value.trim();
    if (!domain) {
    showStatus("Please enter a domain"); // Empty input check
    return;
  }
  addDomain(domain);
};

// Block current site and close tab
document.getElementById("blockCurrent").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url?.startsWith("http")) return;

  const domain = new URL(tab.url).hostname;

  chrome.runtime.sendMessage({ type: "ADD_DOMAIN", domain }, (res) => {
    if (res?.ok) {
      showStatus(`Blocked: ${domain}`);
      renderBlocked();

      // Close current tab immediately
      chrome.tabs.remove(tab.id);
    } else {
      showStatus("Already blocked");
    }
  });
};

// Render list on popup open
renderBlocked();
