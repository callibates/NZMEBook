<?php include_once('main.php'); ?>

<!DOCTYPE html>

<html>

<head>

<meta http-equiv="content-type" content="text/html;charset=utf-8">

<noscript><meta http-equiv="refresh" content="0; url=error.php?error_code=2"></noscript>

<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery-cookies.js" type="text/javascript"></script>
<script src="js/jquery-base64.js" type="text/javascript"></script>
<?php include('js/header-js.php'); ?>
<script src="js/main.js" type="text/javascript"></script>

<link href="css/style.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="img/favicon.ico">

<title><?php echo global_title . ' - ' . global_organization; ?></title>

</head>

<body>

<div id="notification_div"><div id="notification_inner_div"><div id="notification_inner_cell_div"></div></div></div>

<div id="header_div"><?php include('header.php'); ?></div>

<h2><?php echo global_organization; ?></h2>

<div id="content_div"></div>

<div id="preload_div">
<img src="img/loading.gif" alt="Loading">
</div>
<div class="form-popup" id="myForm">
    <form class="form-container">
        <h1>Make A Booking</h1>

        <label for="usrnm"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="usrnm" id="usrnm">

        <input type="hidden" name="d" id="d">

        <input type="hidden" name="w" id="w">

        <input type="hidden" name="t" id="t">

        <input type="hidden" name="f" id="f">

        <input type="hidden" name="oid" id="oid">

        <label for="loc"><b>Location</b></label>
        <select name="loc" id="loc">
            <option value="Auckland" selected="selected">Auckland</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Wellington">Wellington</option>
        </select>

        <label for="stu"><b>Studio</b></label>
        <select name="stu" id="stu">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <button type="submit" class="btn" >Make Booking</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
</div>
<div class="form-popup" id="myForm0">
    <form class="form-container">
        <h1>What Kind of Booking?</h1>

        <input type="hidden" name="d" id="d">

        <input type="hidden" name="w" id="w">

        <input type="hidden" name="t" id="t">

        <input type="hidden" name="f" id="f">

        <input type="hidden" name="oid" id="oid">


        <button type="button" class="client" >Client</button>
        <button type="button" class="client" >Studio</button>
        <button type="submit" class="client" >Voice Actor</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
    </form>
</div>
</body>

</html>
