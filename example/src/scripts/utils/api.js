import Aux from '../aux';
import path from 'path';
import { spawn } from 'child_process';
import getGulpTasks from 'get-gulp-tasks';
import fixPath from 'fix-path';
import SVNMonitor from 'svnmonitor';
import os from 'os';
import fs from 'fs';
import process from 'process';

const open = require('nodegit').Repository.open;

let gulpPath = '';

// fix the $PATH on OS X
fixPath();

const API = {
  initApp: () => {
    API.getTasks();
    API.getConfig();
  },
  getTasks: () => {
    return getGulpTasks().then(data => {
      gulpPath = data.gulpPath;
      return Aux.actions.retrieve().setTasksPrimary(data, false, false);
    });
  },
  getConfig: () => {
    fs.readFile( path.resolve(process.cwd(), 'src', 'scripts', 'utils', 'config.json'), 'utf8', (err, data) => {
      if (err) throw err;
      return Aux.actions.retrieve().setConfigPrimary(JSON.parse(data), false, false);
    });

  },
  runGulpTask(taskName) {
    const cp = spawn(gulpPath, [taskName, '--no-color']);
    cp.stdout.setEncoding('utf8');
    cp.stdout.on('data', (data) => {
      Aux.actions.setConsolePrimary(data);
    });
    cp.stderr.setEncoding('utf8');
    cp.stderr.on('data', (data) => {
      Aux.actions.setConsolePrimary(data);
    });
    cp.on('exit', (code) => {
      if (code === 0) {
        Aux.actions.setConsolePrimary('Finished Task');
      } else {
        Aux.actions.setConsolePrimary('Exited with error code ' + code);
      }
    });
  },
  getSVNCommits: () => {
    const svnMon = new SVNMonitor(
        'https://svn.cadre5.com/c/utbattelle-g2/branches/Glacier-Sprint3',
        'CORP/joe.bruno',
        'Revelation2'
    );
    return svnMon.getLatestCommits('30', (err, log) => {
      if (err) { throw new Error('svn error'); }
      Aux.actions.setSvncommitsPrimary(log);
    });
  },
  getGitCommits: () => {
    open(process.cwd()).then((repo) => {
      return repo.getMasterCommit();
    }).then( (firstCommitOnMaster) => {
      const history = firstCommitOnMaster.history();
      let count = 0;
      history.on('commit', (commit) => {
        if (++count >= 9) {
          return;
        }
        Aux.actions.setGitcommitsPrimary({
          sha: commit.sha(),
          author: commit.author().name,
          email: commit.author().email,
          date: commit.date(),
          message: commit.message()
        });
      });
      history.start();
    });
  },
  getAppStats: () => {
    Aux.actions.setStatsPrimary({
      tmpDir: os.tmpdir(),
      homeDir: os.homedir(),
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cps: os.cpus(),
      network: os.networkInterfaces(),
      cwd: process.cwd(),
      title: process.title,
      version: process.version,
      versions: process.versions,
      process_platform: process.platform,
      env: process.env
    });
  }
};

export default API;

