const workSpace = "./ws";
const repoName = "webpack-code-split";
const repoUrl = "https://github.com/hhow09/webpack-code-split.git";
const dockerDir = "./docker";
const fileServer = {
    uploadUrl: "http://localhost:25478/upload",
    token: "f9403fc5f537b4ab332d",
    downloadUrl: "http://localhost:25478/files/",
};
const vendorBuildOutputZip = 'repo.zip'

module.exports = {
    workSpace,
    repoName,
    repoUrl,
    dockerDir,
    fileServer,
    vendorBuildOutputZip
};
