**This project is no longer maintained and will not function with newer versions of Sendy.**

This repo is for archival purposes only. Newer forks of this project may function on newer versions of Sendy.

# Sendy BEE free Uploader

Create your emails in BEE free, upload them directly into your Sendy editor.

![Sendy BEE free Uploader dialog](https://cloud.githubusercontent.com/assets/5970137/19133092/37764154-8b1c-11e6-8b3d-23a258b7ea61.png)

This project is a ckeditor plugin specifically for Sendy servers. It provides a button/dialog for BEE free .zip uploads that can be placed into your ckeditor instance. Uploaded .zips are validated, placed into your Sendy application's uploads folder, and extracted. Paths to images in your BEE free email are automatically updated to reflect their new locations.

### Dependencies

Your server will need the [PHP ZipArchive class](http://php.net/manual/en/book.zip.php). Installation will differ depending on your OS and PHP version (e.g. on Ubuntu 16.04 Server you'd install php7.0-zip and restart Apache, but your process may be different).

### Installation

- Create a folder named "stbeefree" in your [sendy root]/js/ckeditor/plugins folder
- Add all files from this project to the folder
- Open plugin_endpoint.php and type your server's upload folder paths into the configuration section at the top (comments will guide you!)
- Add `,stbeefree` to the extraPlugins: line in [sendy root]/js/create/editor.js (e.g. `extraplugins: 'codemirror,stbeefree'`)
- Perform the same change in [sendy root]/js/ckeditor/config.js
- Add `'stbeefree'` somewhere into the config.toolbar array in [sendy root]/js/ckeditor/config.js -- wherever you want the button to appear. If you're not sure, just look for `items: [ 'Source',` and change it to `items: [ 'stbeefree', 'Source',`
