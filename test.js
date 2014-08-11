var options = {
  // Remote source location (note that github doesn't support git archive requests)
  // source: 'ssh://stash.nikedev.com/~tmil11/idicons.git',
  source: 'ssh://git@bitbucket.org/dgkang/node-buffer.git',
  // Destination for exploded files from downloaded tar file
  dest: '/tmp/node-buffer',
  // Branch and folder path to include
  branch: 'master',  // 'master:lib'
  // Location to save tarfile, defaults to /tmp if not specified
  tarfile: '/tmp/node-buffer.tar',
  // Optional prefix to add to all root filenames in tarfile 
  // prefix: 'node-buffer/',
  // Does not remove downloaded tarfile if true, otherwise tarfile is removed
  savetar: true
};

var download = require('./index');

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

