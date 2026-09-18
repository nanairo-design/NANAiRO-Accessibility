<?php
/**
 * Remove NANAiRO Accessibility settings when the plugin is deleted.
 *
 * @package NANAiRO_Accessibility
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'nanairo_accessibility_options' );

if ( is_multisite() ) {
	delete_site_option( 'nanairo_accessibility_options' );
}
