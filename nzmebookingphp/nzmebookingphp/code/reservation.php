<?php

include_once('main.php');

if(check_login() != true) { exit; }

if(isset($_GET['make_reservation']))
{
	$week = mysql_real_escape_string($_POST['week']);
	$day = mysql_real_escape_string($_POST['day']);
	$time = mysql_real_escape_string($_POST['time']);
	$loc = mysql_real_escape_string($_POST['loc']);
	$stu = mysql_real_escape_string($_POST['stu']);
	$note = mysql_real_escape_string($_POST['note']);
	$clientName = mysql_real_escape_string($_POST['clientName']);
	$contactName = mysql_real_escape_string($_POST['contactName']);
	$NumScr = mysql_real_escape_string($_POST['NumScr']);
	echo make_reservation2($week, $day, $time, $loc, $stu, $note, $clientName, $contactName, $NumScr);
}
elseif(isset($_GET['delete_reservation']))
{
	$week = mysql_real_escape_string($_POST['week']);
	$day = mysql_real_escape_string($_POST['day']);
	$time = mysql_real_escape_string($_POST['time']);
	echo delete_reservation($week, $day, $time);
}
elseif(isset($_GET['read_reservation']))
{
	$week = mysql_real_escape_string($_POST['week']);
	$day = mysql_real_escape_string($_POST['day']);
	$time = mysql_real_escape_string($_POST['time']);
	$location = mysql_real_escape_string($_POST['location']);
	$studio = mysql_real_escape_string($_POST['studio']);
	echo read_reservation($week, $day, $time, $location, $studio);
}
elseif(isset($_GET['read_reservation_details']))
{
	$week = mysql_real_escape_string($_POST['week']);
	$day = mysql_real_escape_string($_POST['day']);
	$time = mysql_real_escape_string($_POST['time']);
	echo read_reservation_details($week, $day, $time);
}
elseif(isset($_GET['week']))
{
	$week = $_GET['week'];
	$location = $_GET['location'];
	$studio = $_GET['studio'];

	if($location == null)
	{
		$location = 'Auckland';
	}

	if($studio == null)
	{
		$studio = 1;
	}


	echo '<table id="reservation_table"><colgroup span="1" id="reservation_time_colgroup"></colgroup><colgroup span="5" id="reservation_day_colgroup"></colgroup>';

	$datemonday = date_create();
	date_isodate_set($datemonday,date("Y"),$week,1);
	$datetuesday = date_create();
	date_isodate_set($datetuesday,date("Y"),$week,2);
	$datewednesday = date_create();
	date_isodate_set($datewednesday,date("Y"),$week,3);
	$datethursday = date_create();
	date_isodate_set($datethursday,date("Y"),$week,4);
	$datefriday = date_create();
	date_isodate_set($datefriday,date("Y"),$week,5);
	$days_row = '<tr><td id="reservation_corner_td"><input type="button" class="blue_button small_button" id="reservation_today_button" value="Today"></td><th class="reservation_day_th">'. date_format($datemonday,"d/m") .'</th><th class="reservation_day_th">'. date_format($datetuesday,"d/m") .'</th><th class="reservation_day_th">'. date_format($datewednesday,"d/m") .'</th><th class="reservation_day_th">'. date_format($datethursday,"d/m") .'</th><th class="reservation_day_th">'. date_format($datefriday,"d/m") .'</th></tr>';

	if($week == global_week_number)
	{
		echo highlight_day($days_row);
	}
	else
	{
		echo $days_row;
	}

	foreach($global_times as $time)
	{
		echo '<tr><th class="reservation_time_th">' . $time . '</th>';

		$i = 0;

		while($i < 5)
		{
			$i++;
			$rtime = str_ireplace(":","",$time);
			echo '<td><div class="reservation_time_div"><div class="reservation_time_cell_div" id="div:' . $week . ':' . $i . ':' . $rtime . '" onclick="void(0)">' . read_reservation($week, $i, $rtime, $location, $studio) . '</div></div></td>';
		}

		echo '</tr>';
	}

	echo '</table>';
}
else
{
	echo '</div><div class="box_div" id="reservation_div"><div class="box_top_div" id="reservation_top_div"><div id="reservation_top_left_div"><a href="." id="previous_week_a">&lt; Previous week</a></div><div id="reservation_top_center_div">Reservations for week <span id="week_number_span">' . global_week_number . '</span></div><select id = "location" OnChange = "regionreservations()"> <option value="Auckland">Auckland</option><option value="Wellington">Wellington</option><option value="Christchurch">Christchurch</option></select><select id = "studio" OnChange = "regionreservations()"><option value= 1>Studio 1</option><option value= 2>Studio 2</option><option value= 3>Studio 3</option><option value= 4>Studio 4</option></select><div id="reservation_top_right_div"><a href="." id="next_week_a">Next week &gt;</a></div></div><div class="box_body_div"><div id="reservation_table_div"></div></div></div><div id="reservation_details_div">';
}

?>
