<?php 

function generate_post_thumbnail(string $text, GdImage $background, int $text_color, $font = null) : GdImage {
  
  $thumbnail_width = 1920;
  $thumbnail_height = 1080;

  $thumbnail_base = imagecreatetruecolor(
    1920, 1080
  );

  if($font == null) {
    $font = 1;
  }

  imagestring($thumbnail_base, $font, $thumbnail_width / 2, $thumbnail_height / 2, $text, $text_color);

  return $thumbnail_base;
}

?>