#!/bin/bash
JOBID=$1
APPS=$2
vendorBuildOutputZip=$3
fileServer=http://host.docker.internal:25478
fileServerToken=f9403fc5f537b4ab332d
echo Your container args are: "$@"

echo "=== Starting build job ==="
echo "1. Download prebuild output from http://host.docker.internal"
curl "${fileServer}/files/${vendorBuildOutputZip}?token=${fileServerToken}" --output $vendorBuildOutputZip
ls -al
unzip $vendorBuildOutputZip
ls -al
cd webpack-code-split
echo "2. npm rebuild node-sass "
npm rebuild node-sass 
echo "3. Start Build Apps"
npm run build-apps -- --env apps=$APPS
cd build/ && ls -al
echo "4. ZIP Output"
zip -r "${JOBID}-runner-output.zip" * -x \*vendor\*
echo "5. Upload"
curl -Ffile=@${JOBID}-runner-output.zip ${fileServer}/upload?token=${fileServerToken}
