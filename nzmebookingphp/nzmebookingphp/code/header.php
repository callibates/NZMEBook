<?php include_once('main.php'); ?>

<div id="header_inner_div"><div id="header_inner_left_div">

<?php

if(isset($_SESSION['logged_in']))
{
	echo '';
}

?>

</div><div id="header_inner_center_div">

<?php

if(isset($_SESSION['logged_in']))
{
	echo '<p> ' . global_day_name . ' ' . date('jS F Y') . '</p>';
}

?>

</div><div id="header_inner_right_div">

<?php

if(isset($_SESSION['logged_in']))
{
	echo '<a href="#help">Help</a> | <a href="#cp">Control panel</a> | <a href="#logout">Log out</a>';
}
else
{
	echo 'Not logged in';
}

?>

</div></div>
