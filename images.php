<?php
header("Content-Type: image/jpeg");
$im     = imagecreatetruecolor(1920, 1080);
$white = imagecolorallocate($im, 220, 200, 100);
imagefill($im, 0, 0, $white);
imagejpeg($im);
imagedestroy($im);

?>