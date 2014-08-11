git-download
==================

Downloads a remote git repository into a directory or into a `tar` file. Provides a wrapper around the `git archive` command, executing a command like this from node:

```
git archive --format=tar --remote=ssh://hostname/user/reponame.git branch:folder | tar xf -
```

**NOTE:** Github does not support `git archive`, so this package does not work with Github repos. This package can be used to download git repositories from private git servers as well as Atlassian Stash and Bitbucket. It may be enhanced to add github support in the future using a different download method.

# Installation

```
npm install git-download --save
```

# Usage

```
var options = {
  // Remote source location (no github sources)
  source: 'ssh://git@bitbucket.org/dgkang/node-buffer.git',
  // Destination for exploded files from downloaded tar file
  dest: '/tmp/node-buffer',
  // Branch and folder path to include, such as 'master:lib'
  branch: 'master',
  // Location to save tarfile, defaults to /tmp if not specified
  tarfile: '/tmp/node-buffer.tar'
};

var download = require('git-download');

download(options, function(err, tarfile) {
  if (err) {
    console.error('Error occurred downloading '+options.source);
    return;
  }
  console.log('Successfully downloaded '+options.source);
  if (tarfile) {
    console.log('Output: '+tarfile);
  }
});
```

# Options

`source: 'remote_git_repo'`: Location of remote git repository (github not supported since they don't support git archive)

`dest: '/local/path/to/project'`: Destination to explode contents of `tar` file

`branch: 'master'`: Branch and folder path to include, such as `'master:lib'`

`tarfile: '/tmp/project.tar'`: Location to save tarfile, defaults to `/tmp/` with a uuidv4 filename if not specified

`savetar: true|false`: Removes tarfile if false, saves it if true

`prefix: 'project/'`: Optional prefix to add to all root filesname in tarfile

# Resources

Resources for future enhancement inspirations:

https://www.npmjs.org/package/github-download
https://github.com/component/remotes.js/blob/master/lib/remotes/bitbucket.js
http://stackoverflow.com/questions/9609835/git-export-from-github-remote-repository
https://www.npmjs.org/package/git-download-archive
https://www.npmjs.org/package/download-github-repo

