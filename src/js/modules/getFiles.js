let path = require("path");
let fs = require("fs");
let async = require("async");

let getFiles = function (dir, regex, files_) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + "/" + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, regex, files_);
        } else {
            if (regex.test(files[i])) {
                files_.push(files[i].split(".")[0]);
            }
        }
    }
    return files_;
};

export default getFiles;
