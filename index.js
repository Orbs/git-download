'use strict';

// Used to execute git archive commands such as this:
// git archive --format=tar --remote=ssh://hostname/~username/reponame.git branch:folder | tar xf -

// Get archive from bitbucket -- doesn't work with https
// git archive --format=tar --prefix=alembic/ --remote=ssh://git@bitbucket.org/zzzeek/alembic.git master | tar -xf -

// Ideas on how to do similar with github:
// http://stackoverflow.com/questions/9609835/git-export-from-github-remote-repository

// Maybe should do git clone, git checkout, git archive (local). This should support both ssh and https
// and work on bitbucket, stash, github, and any git repo.

var tar = require('tar');
var fs = require('fs');
var uuid = require('uuid');
var Git = require('git-wrapper');
var git = new Git({});
var path = require('path');

module.exports = function(options, callback) {

  var gitOptions = {
    format: 'tar',
    remote: options.source,
    output: options.tarfile || path.join(options.tmpDir || '/tmp', uuid.v4()+'.tar'),
    prefix: options.prefix || ''
  };

  // Remove tarfile if savetar option is false, otherwise
  // return path to tarfile
  function cleanup() {
    if (!options.savetar) {
      fs.unlinkSync(gitOptions.output);
      return;
    }
    return gitOptions.output;
  }

  // Download git repository as a tar file
  git.exec('archive', gitOptions, [options.branch], function (err, msg) {
    if (err) {
      // Error occurred downloading from the source
      callback && callback(err);
      return;
    }
    if (options.dest) {
      // Read in the downloaded tarfile
      fs.createReadStream(gitOptions.output)
        // Explode the downloaded tarfile
        .pipe(tar.Extract({ path: options.dest }))
        // Handle extraction errors
        .on('error', function (er) {
          callback && callback(er);
        })
        // Handle successful extraction completion
        .on('end', function () {
          // Return string containing path to downloaded tarfile.
          callback && callback(null, cleanup());
        });
    }
    else {
      // Return string containing path to downloaded tarfile.
      callback && callback(null, cleanup());
    }
  });

};

  