<!DOCTYPE HTML>

<html lang="fr">

<head>
    <style>
        body {
            background:url('../../bg/background<?php echo(rand(1,count(glob("../../bg/*.*"))))?>.png');
        }
    </style>
    <title>Projet Solaris - Le Système Solaire</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <link rel="stylesheet" href="../../css/style.min.css" />
    <meta name="description" content="Simulation de tout le système solaire en 3D en ligne." />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />

    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);

        $q = "low";
        if($_GET["q"] != "low" && $_GET["q"] != "high") $q = "low";
        else $q = $_GET["q"];
    ?>
</head>

<body id="corps">
    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Système Solaire en 3D</span></h1>
    
    <?php include("../../includes/fr/nav.html"); ?>

    <?php include("../../includes/fr/settings.html"); ?>

    <?php include("../../includes/fr/infos.html"); ?>

    <?php include("../../includes/fr/toolbar.html"); ?>

    <?php include("../../includes/fr/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/fr/footer.html"); ?>
    
    <script type="text/javascript" src="../babylon4.js"></script>
    <script type="text/javascript" src="../babylon.gui.js"></script>
    <script type='module'>
        import { initSolaris } from '../main.js';
        initSolaris("./solaris-data.json","<?php echo($q)?>");
    </script>
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

</body>

</html>