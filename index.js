const path = require("path");
const { execSync } = require("child_process");
const { workSpace, repoUrl, repoName } = require("./const");

execSync(`rm -rf ${workSpace}`);
execSync(`mkdir ${workSpace}`);
execSync(`git clone ${repoUrl}`, {
    stdio: [0, 1, 2], // we need this so node will print the command output
    cwd: path.resolve(__dirname, workSpace), // path to where you want to save the file
});
execSync(`npm install`, {
    stdio: [0, 1, 2],
    cwd: path.resolve(__dirname, `${workSpace}/${repoName}`),
});
execSync(`npm run build-vendor`, {
    stdio: [0, 1, 2],
    cwd: path.resolve(__dirname, `${workSpace}/${repoName}`),
});
