<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - HyperSpace Travel</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="../../jquery-ui/jquery-ui.css" />
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Solaris Project<br/><span class="soustitre">HyperSpace Travel</span></h1>
    <nav id="menu">
        <li id="exit"><a href="../../en.php?v=true"><p>Quit</p></a></li>
        <li id="fullscreen"><p>Fullscreen</p>
            <ul id="screen-list">
                <li id="all">With Interface</li>
                <li id="not-all">Without Interface</li>
                <li id="full-exit">Exit Fullscreen</li>
            </ul>
        </li>
        <li id="engage"><p>HyperSpace</p></li>
        <li id="views"><p>Views</p>
            <ul id="cam-list">
                <li id="free">Normal View</li>
                <li id="freed">3D View</li>
            </ul>
        </li>
        <li id="settings"><p>Settings</p></li>
    </nav>
    <div id="setters">
        <h2>Settings</h2>
        <div id="setters-content">
            <h3>HyperSpace's speed</h3>
            <div id="speed"><div id="freehandle" class="ui-slider-handle"></div></div>
            <h3>Transition's speed</h3>
            <div id="trans"><div id="transhandle" class="ui-slider-handle"></div></div>
            <h3>FOV Max</h3>
            <div id="fov"><div id="fovhandle" class="ui-slider-handle"></div></div>
			<br/>
			<h4 id="disable">Désactiver SkyBox</h4>
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot [S]" />
    </div>

    <?php include("../../includes/en/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/en/footer.html"); ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="../babylon.js"></script>
    <script src="../../jquery-ui/jquery-ui.min.js"></script>
    <script src="../../js/screenfull.js"></script>
    <script src="../../js/global.js"></script>
    <script src="hyperspace.js"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-91827071-1', 'auto');
        ga('send', 'pageview');
    </script>

    <script>setTimeout(()=>createHyperSpace(),100)</script>

</body>
</html>


