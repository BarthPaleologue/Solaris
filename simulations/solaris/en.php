<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - Solar System</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <link rel="stylesheet" href="../../css/style.min.css" />
    <meta name="description" content="Online 3D (WebGL) space simulation of our solar system." />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Solaris Project<br/><span class="soustitre">3D Solar System</span></h1>
    
    <?php include("../../includes/en/nav.html"); ?>

    <?php include("../../includes/fr/settings.html"); ?>

    <?php include("../../includes/en/infos.html"); ?>

    <?php include("../../includes/en/toolbar.html"); ?>

    <?php include("../../includes/en/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/en/footer.html"); ?>

    <link rel="stylesheet" href="../common-style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="../babylon.js"></script>
    <script src="../../js/global.js"></script>
    <script src="../../jquery-ui/jquery-ui.min.js"></script>
    <script src="solaris-data-en.js"></script>
    <script src="../solaris_algorithm.js"></script>
    <link rel="stylesheet" href="../../jquery-ui/jquery-ui.min.css" />
    <script>
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-91827071-1', 'auto');
        ga('send', 'pageview');
    </script>
    <?php 
        if(!isset($_GET["q"])) $_GET["q"] = "low";
        if($_GET["q"] != "low" && $_GET["q"] != "high") $_GET["q"] = "low";
        echo("<script>setTimeout(()=>createScene('".$_GET["q"]."'),100);</script>"); 
    ?>

</body>

</html>