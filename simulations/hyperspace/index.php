<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Voyage Hyperspatial</title>
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
    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Voyage Hyperspatial</span></h1>
    <nav id="menu">
        <li id="exit"><a href="../../index.php?v=true"><p>Quitter</p></a></li>
        <li id="fullscreen"><p>Plein écran</p>
            <ul id="screen-list">
                <li id="all">Avec Interface</li>
                <li id="not-all">Sans Interface</li>
                <li id="full-exit">Quitter Plein écran</li>
            </ul>
        </li>
        <li id="engage"><p>HyperEspace</p></li>
        <li id="views"><p>Vues</p>
            <ul id="cam-list">
                <li id="free">Vue libre</li>
                <li id="freed">Vue libre 3D</li>
            </ul>
        </li>
        <li id="settings"><p>Paramètres</p></li>
        <p id="fps"></p>
    </nav>
    <div id="setters">
        <h2>Paramètres</h2>
        <div id="setters-content">
            <h3>Vitesse HyperSpatiale</h3>
            <div id="speed"><div id="freehandle" class="ui-slider-handle"></div></div>
            <h3>Vitesse de Transition</h3>
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

    <?php include("../../includes/fr/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/fr/footer.html"); ?>

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


