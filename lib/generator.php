<?php 

function generate_post_thumbnail(string $text, GdImage $background, int $text_color, $font = null) {

  if($font == null) {
    $font = 1;
  }

  imagestring($background, $font, 1920 / 2, 1080 / 2, $text, $text_color);
}

?>