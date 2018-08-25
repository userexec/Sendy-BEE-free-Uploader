<?php

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

// CONFIGURABLE PATHS
// This plugin needs to know the filesystem location of your uploads folder,
// and how that folder can be accessed from the web. Please specify these values
// below.

// The file system location of your Sendy uploads folder (please include trailing slash)
// (e.g. /var/www/html/sendy/uploads/, or /local/sendy/htdocs/uploads/)
$uploadPath = '/local/sendy/htdocs/sendyuploadfolder/';

// The web-accessible path to your uploads folder (please include trailing slash)
// (e.g. http://sendy.mst.edu/uploads/, or https://email-p1.srv.sample.com/sendy/uploads/)
$visiblePath = 'http://yoursendyserver.com/uploads/';

// The maximum allowable upload size (increase if you routinely send emails with
// huge graphics)
$maxUploadSizeMB = 2.5;

// That's it! User configuration done. Stop editing.

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

header('Content-Type: text/plain; charset=utf-8');

try {

	if ($uploadPath === '/local/sendy/htdocs/sendyuploadfolder/' ||
		$visiblePath === 'http://yoursendyserver.com/uploads/') {
		throw new RuntimeException('Error: Please specify paths in /js/ckeditor/plugins/stbeefree, see README.');
	}

	// Undefined | Multiple Files | $_FILES Corruption Attack
	// If this request falls under any of them, treat it invalid.
	if (
		!isset($_FILES['upfile']['error']) ||
		is_array($_FILES['upfile']['error'])
		) {
		throw new RuntimeException('Error: Invalid parameters.');
	}

	// Check $_FILES['upfile']['error'] value.
	switch ($_FILES['upfile']['error']) {
		case UPLOAD_ERR_OK:
		break;
		case UPLOAD_ERR_NO_FILE:
		throw new RuntimeException('Error: No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
		throw new RuntimeException('Error: Exceeded filesize limit.');
		default:
		throw new RuntimeException('Error: Unknown errors.');
	}

	// Verify filesize isn't gigantic
	if ($_FILES['upfile']['size'] > $maxUploadSizeMB * 1000000) {
		throw new RuntimeException('Error: Exceeded filesize limit (' . $maxUploadSizeMB . 'MB).');
	}

	// DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
	// Check MIME type manually
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	if (false === $ext = array_search(
		$finfo->file($_FILES['upfile']['tmp_name']),
		array(
			'zip' => 'application/zip'
			),
		true
		)) {
		throw new RuntimeException('Error: Invalid file format.');
	}

	// Get a unique name for this .zip in case it's uploaded multiple times
	$fileName = sha1_file($_FILES['upfile']['tmp_name']) . '_' . rand(0, 99999999);
	$filePath = $uploadPath . $fileName . '.' . $ext;

	// Move the file into the uploads folder
	if (!move_uploaded_file($_FILES['upfile']['tmp_name'], $filePath)) {
		throw new RuntimeException('Error: Failed to handle uploaded file.');
	}

	// Extract the uploaded zip archive
	$zip = new ZipArchive();
	if ($zip->open($filePath) === TRUE) {
		// ONLY allow .html, .jpg, .png, .doc, .pdf, .csv, and .xls files in the zip. Attachments aren't handled anyway, but don't reject a .zip for having a common attachment.
		for( $i = 0; $i < $zip->numFiles; $i++ ) {
			$stat = $zip->statIndex( $i );
			$name = basename( $stat['name'] );
			
			// If this isn't a folder...
			if ($stat['crc'] !== 0) {
				if (!preg_match('/(\.jpg$|\.jpeg$|\.png$|\.gif$|\.html$|\.doc$|\.docx$|\.pdf$|\.xls$|\.xlsx$|\.csv$|\.DS_Store$|\._fileName$|\._images$)/i', $name)) {
					throw new RuntimeException('Error: Not a valid BEE free email archive.');
				}
				// If this is the main .html file, grab its name for later
				if (preg_match('/^[^_.].*\.html$/', $name)) {
					$htmlDoc = $name;
				}
			}
		}

		// Create a directory to unzip to, then unzip
		mkdir($uploadPath . $fileName);
		$zip->extractTo($uploadPath . $fileName . '/');
		$zip->close();
	} else {
		throw new RuntimeException('Error: Failed to unzip file.');
	}

	if ($htmlDoc) {
		// Get the contents of the .html file
		$htmlDocString = file_get_contents($uploadPath . $fileName . '/' . $htmlDoc);

		// Update the image paths to point to the right place
		echo str_replace('src="images', 'src="' . $visiblePath . $fileName . '/images', $htmlDocString);

		// Background images are currently hosted on AWS by BEE free. Would be a good modification to detect those and download them to the images folder, then replace those as well.
	} else {
		throw new RuntimeException('Error: Failed to retrieve HTML.');
	}

} catch (RuntimeException $e) {

	echo $e->getMessage();

}

?>
