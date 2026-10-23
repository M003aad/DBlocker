# DBlocker

> Block unwanted domains instantly from a lightweight Chrome extension popup.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](manifest.json)
[![Manifest](https://img.shields.io/badge/manifest-v3-orange)](manifest.json)
[![CI](https://github.com/M003aad/DBlocker/actions/workflows/ci.yml/badge.svg)](https://github.com/M003aad/DBlocker/actions/workflows/ci.yml)

## Table of Contents

- [Overview / Architecture](#overview--architecture)
- [Features](#features)
- [Screenshots](#screenshots)
- [Codebase Breakdown](#codebase-breakdown)
- [Permissions](#permissions)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Messaging & API Reference](#messaging--api-reference)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview / Architecture

DBlocker is a Manifest V3 browser extension built to block specific domains and close matching tabs as soon as a user navigates to them. The project uses plain JavaScript and browser extension APIs only; there is no bundler, framework, or build pipeline configured in the workspace.

The extension is composed of:

- `manifest.json`: defines the extension metadata, permissions, popup, and service worker entry.
- `background.js`: runs as a service worker, holds the blocked-domain list in memory, saves it to `chrome.storage.local`, and closes blocked tabs on navigation.
- `popup.html` / `popup.css`: provide the popup UI for entering domains, viewing the blocked list, and removing entries.
- `popup.js`: handles user interaction, sends messages to the service worker, and refreshes the popup list.
- `rules.json`: contains a declarative network rule for blocking a sample domain.

This extension targets Chrome and Chromium-based browsers that support Manifest V3 extension APIs.

## Features

- Add a domain manually from the popup.
- Block the current tab's hostname in one click.
- Automatically close tabs that navigate to a blocked domain.
- Remove sites from the blocked list from within the popup UI.
- Use a scrollable list to manage multiple blocked domains.
- Show temporary status messages (Blocked, Already blocked, Removed, Empty input) for user feedback.
- Store the blocked list locally in `chrome.storage.local`.

## Screenshots

> Placeholder: add screenshots of the popup UI and blocked-domain flow here.

## Codebase Breakdown

```text
DBlocker/
├── .editorconfig
├── .gitattributes
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── .gitignore
├── CHANGELOG.md
├── CITATION.cff
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── SUPPORT.md
├── background.js
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   └── icon128.png
├── manifest.json
├── popup.css
├── popup.html
├── popup.js
├── rules.json
└── SUMMARY.md
```

| File / directory | Purpose |
|---|---|
| `background.js` | Keeps the blocked-domain list in memory, persists it, and closes matching tabs. |
| `popup.html` | The extension popup markup including add/remove controls and status area. |
| `popup.js` | Handles form interactions, message passing to the background worker, and list rendering. |
| `popup.css` | Styles the popup layout and buttons. |
| `manifest.json` | Declares the extension name, version, popup, icons, service worker, and required permissions. |
| `rules.json` | Contains a sample declarative network block rule. |
| `icons/` | Extension icon assets for different sizes. |
| `.github/` | Issue templates, PR template, and release/CI automation. |
| `README.md` | Project overview and usage documentation. |
| `SECURITY.md` | Security policy and disclosure process. |
| `SUPPORT.md` | User support guidance. |

## Permissions

`manifest.json` declares the following permissions:

| Permission | Required for | Reason |
|---|---|---|
| `storage` | Persistent block list | Stores blocked domains locally with `chrome.storage.local`. |
| `tabs` | Active-tab querying and tab closure | Lets the popup read the current tab and the background worker close blocked tabs. |
| `webNavigation` | Navigation-based blocking | Declared for navigation-state inspections and tab checks during page changes. |
| `declarativeNetRequest` | Network-level blocking | Intended to block matching domains at the request layer (`rules.json`). |

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/M003aad/DBlocker.git
cd DBlocker
```

2. Open the browser and navigate to the extension page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

3. Enable Developer mode.

4. Click Load unpacked and select the repository root folder.

5. Confirm the extension is active and the popup loads without errors.

No environment variables are used by this project, so no `.env.example` file is required.

## Usage

1. Open the DBlocker popup.
2. Enter a domain such as `example.com` in the input field and click Add Domain.
3. The domain is saved to local storage and will be checked against future tab navigations.
4. Use Block This Site to capture the current tab hostname automatically.
5. Remove any saved entry from the blocked list with the Remove button.
6. When the browser navigates to a blocked domain, the tab is closed automatically.

## Messaging & API Reference

The extension uses Chrome runtime messaging between the popup and the background service worker.

| Message name | Direction | Payload | Response |
|---|---|---|---|
| `ADD_DOMAIN` | `popup.js` -> `background.js` | `{ type: "ADD_DOMAIN", domain: "example.com" }` | `{ ok: true }` or `{ ok: false }` when already blocked |
| `REMOVE_DOMAIN` | `popup.js` -> `background.js` (implemented in worker, not currently used by the UI) | `{ type: "REMOVE_DOMAIN", domain: "example.com" }` | `{ ok: true }` |

Example request:

```json
{
  "type": "ADD_DOMAIN",
  "domain": "example.com"
}
```

Example response:

```json
{
  "ok": true
}
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for local setup steps, issue guidance, and pull request expectations.

## Security

Please review [SECURITY.md](SECURITY.md) before reporting vulnerabilities. The project prefers responsible disclosure through GitHub Private Vulnerability Reporting or the project security email.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). See [LICENSE](LICENSE) for details.

Maintainer: M003aad
