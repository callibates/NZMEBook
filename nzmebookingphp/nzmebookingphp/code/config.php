<?php

### IF YOU ARE GOING TO USE THE CHARACTER ' IN ANY OF THE OPTIONS, ESCAPE IT LIKE THIS: \' ###

// MySQL details
define('global_mysql_server', 'cmslamp14.aut.ac.nz');
define('global_mysql_user', 'gwh3504');
define('global_mysql_password', 'liamlinhaO130');
define('global_mysql_database', 'gwh3504');

// Salt for password encryption. Changing it is recommended. Use 9 random characters
// This MUST be 9 characters, and must NOT be changed after users have been created
define('global_salt', 'k4i8pa2m5');

// Days to remember login (if the user chooses to remember it)
define('global_remember_login_days', '180');

// Title. Used in page title and header
define('global_title', 'Booking System');

// Organization. Used in page title and header, and as sender name in reservation reminder emails
define('global_organization', 'NZME');

// Email address to webmaster. Shown to users that want to know the secret code
// To avoid spamming, JavaScript & Base64 is used to show email addresses when not logged in
define('global_webmaster_email', 'your@email.address');

// Set to '1' to enable reservation reminders. Adds an option in the control panel
// Check out the wiki for instructions on how to make it work
define('global_reservation_reminders', '0');

// Reservation reminders are sent from this email
// Should be an email address that you own, and that is handled by your web host provider
define('global_reservation_reminders_email', 'some@email.address');

// Code to run the reservation reminders script over HTTP
// If reservation reminders are enabled, this MUST be changed. Check out the wiki for more information
define('global_reservation_reminders_code', '1234');

// Full URL to web site. Used in reservation reminder emails
define('global_url', 'http://your.server/phpmyreservation/');

// How many weeks forward in time to allow reservations
define('global_weeks_forward', '2');

define('global_auckland', 'Auckland');
define('global_wellington', 'Wellington');
define('global_christchurch', 'Christchurch');

// Possible reservation times. Use the same syntax as below (TimeFrom-TimeTo)
$global_times = array('7:00-7:30', '7:30-8:00', '8:30-9:00', '9:00-9:30', '9:30-10:00', '10:30-11:00', '11:30-12:00', '12:00-12:30', '12:30-1:00', '1:00-1:30', '1:30-2:00', '2:00-2:30', '2:30-3:00','3:00-3:30','3:30-4:00','4:00-4:30','4:30-5:00','5:00-5:30','5:30-6:00','6:00-6:30');
$global_times[] = '6:30-7:00';
?>
