import * as os from 'os';
import * as pty from 'node-pty';

export { pty };
export class PtyService {
  create(rows: number, cols: number, cwd: string): pty.IPty {
    const bin = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'] || '/bin/sh';
    return pty.spawn(bin, [], {
      encoding: 'utf-8',
      name: 'xterm-color',
      cols: cols || 100,
      rows: rows || 30,
      cwd,
      env: process.env as { [key: string]: string },
    });
  }
  resize(termninal: pty.IPty, rows: number, cols: number) {
    try {
      termninal.resize(cols, rows);
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }
}
