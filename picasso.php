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


function pics_register_menus()
{
  pics_plugin_menu();
}

function pics_plugin_menu()
{
  add_menu_page("Picasso 基本設定", "Picasso", "manage_options", "picasso-menu", "pics_general_page");
}

function pics_general_page()
{
?>
  <div id="picasso-general-page"></div>
<?php
}

function current_pagehook()
{
    global $hook_suffix;
    if( !current_user_can( 'manage_options') ) return;
    echo '<div class="updated"><p>hook_suffix : ' . $hook_suffix . '</p></div>';
}
add_action( 'admin_notices', 'current_pagehook' );

function pics_admin_scripts($hook_suffix)
{
  if ($hook_suffix == "toplevel_page_picasso-menu") {
    $asset_file = include_once(plugin_dir_path(__FILE__) . "build/admin/settings/basic.asset.php");
    wp_enqueue_style("pics-admin-plugin-style", plugin_dir_url(__FILE__) . "/build/admin/settings/basic.css", array("wp-components"));
    wp_enqueue_script("pics-admin-plugin-script", plugin_dir_url(__FILE__) . "build/admin/settings/basic.js", $asset_file["dependencies"], $asset_file["version"], true);
  }

  
  if ($hook_suffix == "post.php" || $hook_suffix == "post-new.php") {
    $asset_file = include_once(plugin_dir_path(__FILE__) . "build/index.asset.php");
    wp_enqueue_style("pics-admin-plugin-style", plugin_dir_url(__FILE__) . "/build/index.css", array("wp-components"));
    wp_enqueue_script("pics-admin-plugin-script", plugin_dir_url(__FILE__) . "build/index.js", $asset_file["dependencies"], $asset_file["version"], true);
  }
}

add_theme_support('post-thumbnails');

function manage_picasso_query_vars($query_vars)
{
  $query_vars[] = "picasso_image_id";
  return $query_vars;
}

add_action("admin_enqueue_scripts", "pics_admin_scripts");
add_action("admin_menu", "pics_register_menus");
