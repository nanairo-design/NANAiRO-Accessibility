<?php
/**
 * Plugin Name:       NANAiRO Accessibility
 * Plugin URI:        https://github.com/nanairo-design/NANAiRO-Accessibility-wordpress-plugin
 * Description:       Adds the NANAiRO display support widget for text, contrast, reading assistance, speech, and media controls.
 * Version:           0.1.0
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Author:            一般社団法人ナナイロ
 * Author URI:        https://nanairo.design/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       nanairo-accessibility
 *
 * @package NANAiRO_Accessibility
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NANAIRO_ACCESSIBILITY_VERSION', '0.1.0' );
define( 'NANAIRO_ACCESSIBILITY_OPTION', 'nanairo_accessibility_options' );

/**
 * Return the default plugin options.
 *
 * @return array<string, mixed>
 */
function nanairo_accessibility_default_options() {
	return array(
		'enabled'       => true,
		'locale'        => 'ja',
		'position'      => 'right',
		'show_branding' => false,
	);
}

/**
 * Sanitize settings before saving them.
 *
 * @param mixed $input Submitted option value.
 * @return array<string, mixed>
 */
function nanairo_accessibility_sanitize_options( $input ) {
	$input = is_array( $input ) ? $input : array();

	return array(
		'enabled'       => ! empty( $input['enabled'] ),
		'locale'        => isset( $input['locale'] ) && 'en' === $input['locale'] ? 'en' : 'ja',
		'position'      => isset( $input['position'] ) && 'left' === $input['position'] ? 'left' : 'right',
		'show_branding' => ! empty( $input['show_branding'] ),
	);
}

/**
 * Register the plugin settings.
 */
function nanairo_accessibility_register_settings() {
	register_setting(
		'nanairo_accessibility',
		NANAIRO_ACCESSIBILITY_OPTION,
		array(
			'type'              => 'array',
			'sanitize_callback' => 'nanairo_accessibility_sanitize_options',
			'default'           => nanairo_accessibility_default_options(),
		)
	);

	add_settings_section(
		'nanairo_accessibility_display',
		esc_html__( 'Display support settings', 'nanairo-accessibility' ),
		'nanairo_accessibility_render_section',
		'nanairo-accessibility'
	);

	add_settings_field(
		'nanairo_accessibility_enabled',
		esc_html__( 'Enable widget', 'nanairo-accessibility' ),
		'nanairo_accessibility_render_enabled_field',
		'nanairo-accessibility',
		'nanairo_accessibility_display'
	);

	add_settings_field(
		'nanairo_accessibility_locale',
		esc_html__( 'Default language', 'nanairo-accessibility' ),
		'nanairo_accessibility_render_locale_field',
		'nanairo-accessibility',
		'nanairo_accessibility_display'
	);

	add_settings_field(
		'nanairo_accessibility_position',
		esc_html__( 'Button position', 'nanairo-accessibility' ),
		'nanairo_accessibility_render_position_field',
		'nanairo-accessibility',
		'nanairo_accessibility_display'
	);

	add_settings_field(
		'nanairo_accessibility_show_branding',
		esc_html__( 'Credit display', 'nanairo-accessibility' ),
		'nanairo_accessibility_render_branding_field',
		'nanairo-accessibility',
		'nanairo_accessibility_display'
	);
}
add_action( 'admin_init', 'nanairo_accessibility_register_settings' );

/**
 * Render the settings section description.
 */
function nanairo_accessibility_render_section() {
	echo '<p>' . esc_html__( 'Choose how the NANAiRO display support button appears on your public website.', 'nanairo-accessibility' ) . '</p>';
}

/**
 * Retrieve saved settings merged with defaults.
 *
 * @return array<string, mixed>
 */
function nanairo_accessibility_get_options() {
	$options = get_option( NANAIRO_ACCESSIBILITY_OPTION, array() );
	return wp_parse_args( is_array( $options ) ? $options : array(), nanairo_accessibility_default_options() );
}

/**
 * Render the enabled field.
 */
function nanairo_accessibility_render_enabled_field() {
	$options = nanairo_accessibility_get_options();
	?>
	<label>
		<input type="checkbox" name="<?php echo esc_attr( NANAIRO_ACCESSIBILITY_OPTION ); ?>[enabled]" value="1" <?php checked( ! empty( $options['enabled'] ) ); ?> />
		<?php echo esc_html__( 'Show the display support button on the frontend', 'nanairo-accessibility' ); ?>
	</label>
	<?php
}

/**
 * Render the locale field.
 */
function nanairo_accessibility_render_locale_field() {
	$options = nanairo_accessibility_get_options();
	?>
	<select name="<?php echo esc_attr( NANAIRO_ACCESSIBILITY_OPTION ); ?>[locale]">
		<option value="ja" <?php selected( $options['locale'], 'ja' ); ?>><?php echo esc_html__( 'Japanese', 'nanairo-accessibility' ); ?></option>
		<option value="en" <?php selected( $options['locale'], 'en' ); ?>><?php echo esc_html__( 'English', 'nanairo-accessibility' ); ?></option>
	</select>
	<?php
}

/**
 * Render the position field.
 */
function nanairo_accessibility_render_position_field() {
	$options = nanairo_accessibility_get_options();
	?>
	<select name="<?php echo esc_attr( NANAIRO_ACCESSIBILITY_OPTION ); ?>[position]">
		<option value="right" <?php selected( $options['position'], 'right' ); ?>><?php echo esc_html__( 'Right', 'nanairo-accessibility' ); ?></option>
		<option value="left" <?php selected( $options['position'], 'left' ); ?>><?php echo esc_html__( 'Left', 'nanairo-accessibility' ); ?></option>
	</select>
	<?php
}

/**
 * Render the optional credit field.
 */
function nanairo_accessibility_render_branding_field() {
	$options = nanairo_accessibility_get_options();
	?>
	<label>
		<input type="checkbox" name="<?php echo esc_attr( NANAIRO_ACCESSIBILITY_OPTION ); ?>[show_branding]" value="1" <?php checked( ! empty( $options['show_branding'] ) ); ?> />
		<?php echo esc_html__( 'Show the “Powered by NANAiRO” credit in the widget footer', 'nanairo-accessibility' ); ?>
	</label>
	<p class="description"><?php echo esc_html__( 'Optional and disabled by default.', 'nanairo-accessibility' ); ?></p>
	<?php
}

/**
 * Add the settings page.
 */
function nanairo_accessibility_add_settings_page() {
	add_options_page(
		esc_html__( 'NANAiRO Accessibility', 'nanairo-accessibility' ),
		esc_html__( 'NANAiRO Accessibility', 'nanairo-accessibility' ),
		'manage_options',
		'nanairo-accessibility',
		'nanairo_accessibility_render_settings_page'
	);
}
add_action( 'admin_menu', 'nanairo_accessibility_add_settings_page' );

/**
 * Render the settings page.
 */
function nanairo_accessibility_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html__( 'NANAiRO Accessibility', 'nanairo-accessibility' ); ?></h1>
		<p><?php echo esc_html__( 'Make web information easier to reach by letting each visitor adjust how the page is displayed.', 'nanairo-accessibility' ); ?></p>
		<form action="options.php" method="post">
			<?php
			settings_fields( 'nanairo_accessibility' );
			do_settings_sections( 'nanairo-accessibility' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

/**
 * Load the display support widget on public pages.
 */
function nanairo_accessibility_enqueue_widget() {
	$options = nanairo_accessibility_get_options();

	if ( empty( $options['enabled'] ) ) {
		return;
	}

	$handle = 'nanairo-accessibility';
	$src    = plugin_dir_url( __FILE__ ) . 'assets/js/nanairo-accessibility.iife.js';
	$config = array(
		'locale'       => 'en' === $options['locale'] ? 'en' : 'ja',
		'position'     => 'left' === $options['position'] ? 'left' : 'right',
		'showBranding' => ! empty( $options['show_branding'] ),
	);

	wp_enqueue_script(
		$handle,
		$src,
		array(),
		NANAIRO_ACCESSIBILITY_VERSION,
		array(
			'strategy'  => 'defer',
			'in_footer' => true,
		)
	);
	/*
	 * The settings are published *before* the script, and the bundle starts
	 * itself from them. An 'after' inline script would make WordPress drop the
	 * 'defer' strategy entirely (see WP_Scripts::filter_eligible_strategies),
	 * turning this into a blocking request on every page view.
	 */
	wp_add_inline_script(
		$handle,
		'window.nanairoAccessibilitySettings = ' . wp_json_encode( $config ) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'nanairo_accessibility_enqueue_widget' );

/**
 * Add a settings link to the Plugins screen.
 *
 * @param array<int, string> $links Existing plugin action links.
 * @return array<int, string>
 */
function nanairo_accessibility_action_links( $links ) {
	$url = admin_url( 'options-general.php?page=nanairo-accessibility' );
	array_unshift( $links, '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Settings', 'nanairo-accessibility' ) . '</a>' );
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'nanairo_accessibility_action_links' );
