<?php

require("vendor/autoload.php");

$text = $_GET["text"];

if($text == "") {
  $text = "This image is generate by picasso.";
}

$fontfile = "./assets/fonts/Roboto/Roboto-Black.ttf";

$font =  FontLib\Font::load($fontfile);
$font->parse();

$bbox = imagettfbbox(80, 0, $fontfile, $text . "\n" . $font->getFontName());
$bbox_width = $bbox[4] - $bbox[6];
$bbox_height = $bbox[5] - $bbox[7];

header("Content-Type: image/jpeg");
$im  = imagecreatetruecolor(1920, 1080);
$white = imagecolorallocate($im, 255, 255, 255);
$black = imagecolorallocate($im, 0, 0, 0);
imagefill($im, 0, 0, $white);
imagettftext($im, 80, 0, (1920 - $bbox_width) / 2 , (1080 - $bbox_height) / 2, $black, $fontfile, $text . "\n" . $font->getFontName());
imagejpeg($im);
imagedestroy($im);

?>