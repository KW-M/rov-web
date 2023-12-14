SYMLINK ALERT!
The shared folder contains files that are used by both the frontend and the internal website. The rov-internal-website/shared folder and the frontend/src/js/shared folder are SYMLINKED together so any changes will appear in the other folder and visa versa.
Nothing in this folder should import files from higher level folders as the paths will be diferent!
```
