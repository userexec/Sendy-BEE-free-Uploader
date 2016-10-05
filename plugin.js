'use strict';
/*global CKEDITOR, $*/

CKEDITOR.plugins.add( 'stbeefree', {
	icons: 'stbeefree',
	init: function( editor ) {
		editor.addCommand( 'stbeefree', new CKEDITOR.dialogCommand( 'stbeefreeDialog' ) );
		CKEDITOR.dialog.add( 'stbeefreeDialog', this.path + 'dialogs/stbeefree.js' );

		editor.addCommand('receivezip', {
			exec: function(editor) {
				var ps = editor.document.find('body>*, body>center>*').$;
				for (var i = 0; i < ps.length; i += 1) {
					if ($(ps[i]).html() === '&nbsp;' || $(ps[i]).html() === '<br>') {
						$(ps[i]).remove();
					}
				}
			}
		});

		editor.ui.addButton('stbeefree', {
			label: 'Upload BEE free email',
			command: 'stbeefree',
			toolbar: 'document'
		});
	}
});
