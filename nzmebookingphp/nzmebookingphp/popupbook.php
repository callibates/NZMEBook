
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

<h1>Booking Information</h1>


<div id="content_div"></div>

<div id="preload_div">
    <img src="img/loading.gif" alt="Loading">
</div>

<div id="newform" align="center">
    <form onsubmit="submitbook.php">
        <label for="userName" class="user-name">Username</label>
        <input id="userName" type="text" value="<?php echo $_SESSION['user_name']; ?>"></br></br>

        <label for="email" class="email">Email</label>
        <input id="email" type="text" value="<?php echo $_SESSION['user_email']; ?>"></br></br>

        <label for="numScripts" class="num-scripts"># Scripts</label>
        <input id="numScripts" type="number"></br></br>

        <button type="submit">Submit</button>
        <!-- more inputs -->
    </form>
</div>

</body>

</html>