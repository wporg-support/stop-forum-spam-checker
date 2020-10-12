// ==UserScript==
// @name         WordPress.org Stop Foum Spam Checker
// @namespace    https://wordpress.org/support
// @version      1.0.0
// @description  Check post author IPs against the Stop Forum Spam API to determine their credibility.
// @author       Clorith
// @match        https://wordpress.org/support/topic/*
// @match        https://wordpress.org/support/view/pending/
// @match        https://wordpress.org/support/view/spam/
// @match        https://wordpress.org/support/?post_type=topic&*
// @match        https://*.wordpress.org/support/topic/*
// @match        https://*.wordpress.org/support/view/pending/
// @match        https://*.wordpress.org/support/view/spam/
// @match        https://*.wordpress.org/support/?post_type=topic&*
// @grant        none
// @require      https://code.jquery.com/jquery-1.11.0.min.js
// @updateURL    https://github.com/wporg-support/stop-forum-spam-checker/raw/master/src/stop-forum-spam-checker.user.js
// @downloadURL  https://github.com/wporg-support/stop-forum-spam-checker/raw/master/src/stop-forum-spam-checker.user.js
// ==/UserScript==

jQuery(document).ready(function( $ ) {
    'use strict';

    var $IPs = $( '.bbp-author-ip' );
    if ( $IPs.length >= 1 ) {
        $IPs.each(function() {
            var address = $(this).text().replace( /(\(|\))/gi, '' );
            $(this).append( '<button type="button" class="button button-primary button-small stop-forum-spam-check" style="margin-left:0.5rem;color:#fff!important;" data-ip="' + address + '">Check IP</button>' );
        } );
    }

    $( 'body' ).on( 'click', '.stop-forum-spam-check', function() {
        var $button = $(this);

        $.post(
            'https://api.stopforumspam.org/api',
            {
                ip: $(this).data('ip'),
                json: true
            }
        ).done(function(response) {
            $button.attr('disabled', 'disabled');
            if ( typeof response.ip.torexit !== 'undefined' ) {
                $button.text( 'TOR proxy' );
            } else if ( ! response.ip.appears ) {
                $button.text( 'OK' );
            } else {
                $button.text( response.ip.frequency + ' spammed sites, last at ' + response.ip.lastseen );
            }

        });
    } );
});
