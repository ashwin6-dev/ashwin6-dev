const fs = require('fs-extra');

fs.copy('content', '.next/standalone/content', (err) => {
  if (err) {
    console.error('Error copying content folder:', err);
  } else {
    console.log('Content folder copied successfully!');
  }
});