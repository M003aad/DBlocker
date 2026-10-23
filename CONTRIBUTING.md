# Contributing to DBlocker

Thank you for helping improve DBlocker.

## Ways to contribute

- Report bugs and usability issues.
- Suggest features or workflow improvements.
- Improve documentation.
- Submit a pull request with a clear fix or enhancement.

## Local development

1. Clone the repository:

```bash
git clone https://github.com/M003aad/DBlocker.git
cd DBlocker
```

2. Open the project folder in VS Code or another browser extension development environment.

3. Load the extension in a Chromium-based browser with Developer mode enabled:
   - open `chrome://extensions/` or `edge://extensions/`
   - click `Load unpacked`
   - select the repository root folder

4. Make your changes and reload the extension to test the behavior.

No environment variables are used by this project; no `.env.example` file is required.

## Bug reports

When reporting a bug, include:

- browser and version;
- the extension version;
- steps to reproduce;
- expected behavior;
- actual behavior;
- screenshots or console logs when relevant.

## Feature proposals

Feature requests should describe:

- the problem being solved;
- the user value or productivity benefit;
- possible UX considerations;
- any compatibility constraints.

## Pull request standards

- Keep changes focused and minimal.
- Update documentation when behavior changes.
- Validate the extension manually in a browser before submission.
- Write a clear commit message and PR description.
- Mention whether the change affects user-facing behavior, permissions, or block rules.

## Code of conduct

This project follows the Contributor Covenant. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standard.
