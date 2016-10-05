# Sendy BEE free Uploader

Create your emails in BEE free, upload them directly into your Sendy editor.

![Sendy BEE free Uploader dialog](https://cloud.githubusercontent.com/assets/5970137/19133092/37764154-8b1c-11e6-8b3d-23a258b7ea61.png)

This project is a ckeditor plugin specifically for Sendy servers. It provides a button/dialog for BEE free .zip uploads that can be placed into your ckeditor instance. Uploaded .zips are validated, placed into your Sendy application's uploads folder, and extracted. Paths to images in your BEE free email are automatically updated to reflect their new locations.

### Installation

- Create a folder named "stbeefree" in your <sendy root>/js/ckeditor/plugins folder
- Add all files from this project to the folder
- Open plugin_endpoint.php and type your server's upload folder paths into the configuration section at the top (comments will guide you!)
- Add `,stbeefree` to the extraPlugins: line in <sendy root>/js/create/editor.js (e.g. `extraplugins: 'codemirror,stbeefree'`)
- Perform the same change in <sendy root>/js/ckeditor/config.js
- Add `'stbeefree'` somewhere into the config.toolbar array in <sendy root>/js/ckeditor/config.js -- wherever you want the button to appear. If you're not sure, just look for `items: [ 'Source',` and change it to `items: [ 'stbeefree', 'Source',`
