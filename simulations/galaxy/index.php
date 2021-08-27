<!DOCTYPE HTML>

<html lang="fr">

<head>
    <style>
    body {
        background: url('../../bg/background<?php echo(rand(1,count(glob("../../bg/*.*"))))?>.png');
    }
    </style>
    <title>Projet Solaris - Générateur de Galaxies</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="robots" content="index" />
    <meta name="description"
        content="Le Générateur de Galaxies du Projet Solaris vous permet de créer des Galaxies Spirales paramétrables." />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <link rel="stylesheet" href="../../css/home.min.css" />
    <link rel="stylesheet" href="../../css/style.min.css" />
    <link rel="stylesheet" href="./style/style.min.css" />
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Projet Solaris<br /><span class="soustitre">Générateur de Galaxies</span></h1>
    <div id="home">
        <p><a href="../../index.php?v=true">Accueil</a></p>
    </div>
    <a href="en.php"><img class="flag" src="../../data/menu/english.jpg" /></a>
    <p id="contact"><a href="../../contact.php">Feedback</a></p>

    <?php include("../../includes/fr/nav.html") ?>

    <div id="setters" class="hiddenSetters">
        <h2>Paramètres</h2>
        <div id="setters-content">
            <h3>Précision de la roulette</h3>
            <div id="precision"></div>

            <h3>Vitesse en mode libre</h3>
            <div id="speed"></div>

            <h3>Sensibilité</h3>
            <div id="sensifree"></div>

            <h3>Nombre de bras</h3>
            <div id="arms"></div>

            <h3>Densité des étoiles</h3>
            <div id="denstar"></div>

            <h3>Enroulement de la galaxie</h3>
            <div id="enroulement"></div>

            <h3>Largeur des bras</h3>
            <div id="largeur"></div>

            <h3>Longueur des bras</h3>
            <div id="longueur"></div>

            <h3>Dispersion des étoiles</h3>
            <div id="disp"></div>

            <br />
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot [S]" />
        <img id="trandom" src="../../toolbar/random.png" width=50 height=50 title="Galaxie Aléatoire [G]" />
        <img id="tsound" src="../../toolbar/mute.png" width=50 height=50 title="Eteindre Musique [M]" />
    </div>

    <canvas id="renderCanvas"></canvas>

    <div id="ui">
        <p>Nombre d'étoiles :</p>
        <div id="star"></div>
        <div id="generate">Générer !</div>
    </div>

    <?php include("../../includes/fr/footer.html"); ?>

    <script type="text/javascript" src="../babylon4.js"></script>
    <script src="../components/slider.min.js"></script>
    <link rel="stylesheet" href="../components/style5.min.css">
    <script type="module">
    import {
        createGalaxy
    } from "./scripts/galaxy.js";

    let nbStarSlider = new Slider("star", document.getElementById("star"), 5000, 150000, 32000);
    document.getElementById("generate").addEventListener("click", () => {
        createGalaxy(nbStarSlider.getValue());
        document.getElementById("ui").remove();
    });
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