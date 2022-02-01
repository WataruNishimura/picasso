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



class PicassoMenu
{

  static $instance = false;

  private function __construct()
  {
    if (function_exists("add_action")) {
      add_action("admin_menu", array($this, "register_menu"));
    }
  }

  public static function get_instance()
  {
    if (!self::$instance) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  function register_menu()
  {
    $this->plugin_menu();
  }

  function plugin_menu()
  {
    add_menu_page("Picasso 基本設定", "Picasso", "manage_options", "picasso-menu", array($this, "general_page"));
  }

  function general_page()
  {

?>
    <div id="picasso-general-page"></div>
<?php
  }
}
class PicassoPlugin
{

  static $instance = false;
  static $menu;

  public static function get_instance()
  {
    if (!self::$instance) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  private function __construct()
  {
    if (function_exists("add_theme_support")) {
      add_theme_support('post-thumbnails');
    }
    if (function_exists("add_action")) {
      add_action("admin_enqueue_scripts", array($this, "register_admin_scripts"));
      add_action('admin_notices', array($this, "current_pagebook"));
      add_action("init", array($this, "plugin_init"));
    }


    self::$menu = PicassoMenu::get_instance();
  }

  function plugin_init()
  {

    $this->register_settings();
  }

  function current_pagebook()
  {
    if (defined("WP_DEBUG") && WP_DEBUG === true) {
      global $hook_suffix;
      if (!current_user_can('manage_options')) return;
      echo '<div class="updated"><p>hook_suffix : ' . $hook_suffix . '</p></div>';
    }
  }

  function register_settings()
  {
    register_setting("picasso_admin_settings", "picasso_text_color", array("show_in_rest" => true));
    register_setting("picasso_admin_settings", "picasso_background_color", array("show_in_rest" => true));
  }

  function register_admin_scripts($hook_suffix)
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
}


$PiccasoPlugin = PicassoPlugin::get_instance();
