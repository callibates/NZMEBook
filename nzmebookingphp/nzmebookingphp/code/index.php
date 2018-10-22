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
<div class="form-popup" id="myFormStudio">
    <form class="form-container">
        <h1>Studio Booking</h1>

        <label for="usrnm"><i>Username</i></label>
        <input type="text" placeholder="Enter Username" name="usrnm" id="susrnm">

        <input type="hidden" name="d" id="d">

        <input type="hidden" name="w" id="w">

        <input type="hidden" name="t" id="t">

        <input type="hidden" name="f" id="f">

        <input type="hidden" name="oid" id="oid">

        <label for="loc"><i>Location</i></label>
        <select name="loc" id="sloc">
            <option value="Auckland" selected="selected">Auckland</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Wellington">Wellington</option>
        </select>

        <label for="stu"><i>Studio</i></label>
        <select name="stu" id="sstu">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <br><br>
        <label for="notes"><i>Notes:</i></label>
        <input type="text" placeholder="Additional Notes..." name="notes" id="snotes">

        <button type="submit" class="btn" >Confirm</button>
        <button type="button" class="cancello" onclick="closeForm()">Cancel</button>
    </form>
</div>
<div class="form-popup" id="myFormClient">
    <form class="form-container">
        <h1>Client Booking</h1>

        <label for="cliname"><i>Client Name</i></label>
        <input type="text" name="cliname" id="cliname">
        <br>
        <label for="conname"><i>Contact Name</i></label>
        <input type="text" name="conname" id="conname">

        <input type="hidden" name="d" id="d">

        <input type="hidden" name="w" id="w">

        <input type="hidden" name="t" id="t">

        <input type="hidden" name="f" id="f">

        <input type="hidden" name="oid" id="oid">

        <label for="loc"><i>Location</i></label>
        <select name="loc" id="cloc">
            <option value="Auckland" selected="selected">Auckland</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Wellington">Wellington</option>
        </select>

        <label for="stu"><i>Studio</i></label>
        <select name="stu" id="cstu">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <br><br>
        <label for="notes"><i>Notes:</i></label>
        <input type="text" placeholder="Additional Notes..." name="notes" id="cnotes">

        <button type="submit" class="btn" >Confirm</button>
        <button type="button" class="cancello" onclick="closeForm()">Cancel</button>
    </form>
</div>
<div class="form-popup" id="myFormVoice">
    <form class="form-container">
        <h1>Voice Booking</h1>

        <label for="usrnm"><i>Username</i></label>
        <input type="text" placeholder="Enter Username" name="usrnm" id="vusrnm">

        <input type="hidden" name="d" id="d">

        <input type="hidden" name="w" id="w">

        <input type="hidden" name="t" id="t">

        <input type="hidden" name="f" id="f">

        <input type="hidden" name="oid" id="oid">

        <label for="loc"><i>Location</i></label>
        <select name="loc" id="vloc">
            <option value="Auckland" selected="selected">Auckland</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Wellington">Wellington</option>
        </select>

        <label for="stu"><i>Studio</i></label>
        <select name="stu" id="vstu">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <br>
        <label for="scripts"><i># Scripts:</i></label>
        <br>
        <select name="scripts" id="Numscripts">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>

        <button type="submit" class="btn" >Confirm</button>
        <button type="button" class="cancello" onclick="closeForm()">Cancel</button>
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


        <button type="button" class="but clientb" id="clientb" >Client</button>
        <button type="button" class="but studiob" id="studiob">Studio</button>
        <button type="button" class="but voiceb" id="voiceb">Voice Actor</button>
	<button type="button" class="delete" id="delete">Delete Booking</button>
        <button type="button" class="cancello" onclick="closeForm()">Cancel</button>
    </form>
</div>
</body>

</html>
