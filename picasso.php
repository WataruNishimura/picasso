<?php

/**
 * Plugin Name:     Picasso
 * Plugin URI:      https://github.com/crafts-digitally/picasso
 * Description:     Generate post thumbnail based on specific templates.
 * Author:          WATARU NISHIMURA
 * Author URI:      https://twitter.com/wataru_nishi731
 * Text Domain:     picasso
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Picasso
 */

function pics_plugin_menu()
{
  add_menu_page("Picasso", "Picasso", "manage_options", "picasso-menu", "pics_general_page");
}

function pics_general_page()
{
?>
  <div id="picasso-general-page"></div>
<?php
}
