const path = require("path");
const { execSync } = require("child_process");
const { v4: uuidv4 } = require('uuid');
const { workSpace, repoUrl, repoName, fileServer, vendorBuildOutputZip } = require("./const");
const jobId = new Date().valueOf();
const shards = [{apps: 'todo,todo2', workerId: uuidv4()},{apps: 'todo3', workerId: uuidv4()}]

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

execSync(`zip -r ${vendorBuildOutputZip} webpack-code-split`, {
    stdio: [0, 1, 2],
    cwd: path.resolve(__dirname, `${workSpace}`),
});

//upload to file server
execSync(`curl -Ffile=@${vendorBuildOutputZip} ${fileServer.uploadUrl}?token=${fileServer.token}`, {
    stdio: [0, 1, 2],
    cwd: path.resolve(__dirname, `${workSpace}`),
});

const concurrently = require('concurrently');

concurrently(shards.map(({apps, workerId})=>`docker run webpackrunner ${jobId}-${workerId} ${apps} ${vendorBuildOutputZip}`)).then(()=>{
    console.log("webpack worker Success");
}, ()=>{
    console.log("webpack worker fail")
});

//TODO define status

//check success 

//aggregate job artifact into 


