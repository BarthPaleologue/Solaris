<!DOCTYPE HTML>

<html lang="en">

<head>
    <style>
        body {
            background:url('../../bg/background<?php echo(rand(1,count(glob("../../bg/*.*"))))?>.png');
        }
    </style>
    <title>Solaris Project - WebGL Galaxy Generator</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="The Galaxy Generator allows you to create spiral galaxies and to configure them as you want." />
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
    <h1 id="titre">Solaris Project<br/><span class="soustitre">Galaxy Generator</span></h1>
    <div id="home">
        <p><a href="../../en.php?v=true">Home</a></p>
    </div>
    <a href="index.php"><img class="flag" src="../../data/menu/french.png"/></a>
    <p id="contact"><a href="../../contact-en.php">Feedback</a></p>
    
    <?php include("../../includes/fr/nav.html") ?>

    <div id="setters">
        <h2>Settings</h2>
        <div id="setters-content">
            <h3>Mouse wheel precision</h3>
            <div id="precision"></div>

            <h3>Free view speed</h3>
            <div id="speed"></div>

            <h3>Sensibility</h3>
            <div id="sensifree"></div>

            <h3>Arms number</h3>
            <div id="arms"></div>

            <h3>Star density</h3>
            <div id="denstar"></div>

            <h3>Rotation factor</h3>
            <div id="enroulement"></div>

            <h3>Arms scale</h3>
            <div id="largeur"></div>

            <h3>Arms length</h3>
            <div id="longueur"></div>

            <h3>Star dispersion</h3>
            <div id="disp"></div>

            <br/>
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot [S]" />
        <img id="trandom" src="../../toolbar/random.png" width=50 height=50 title="Random Galaxy [G]" />
        <img id="tsound" src="../../toolbar/mute.png" width=50 height=50 title="Stop Music [M]" />
    </div>

    <canvas id="renderCanvas"></canvas>

    <div id="ui">
        <p>Number of stars :</p>
        <div id="star"></div>
        <div id="generate">Generate !</div>
    </div>

    <?php include("../../includes/fr/footer.html"); ?>

    <script type="text/javascript" src="../babylon4.js"></script>
    <script type="module">
        import { createGalaxy } from "./scripts/galaxy.js";
        import { Slider } from "../tools.js";

        let nbStarSlider = new Slider("star", document.getElementById("star"), 5000, 150000, 32000);
        document.getElementById("generate").addEventListener("click", () => {
            createGalaxy(nbStarSlider.getValue());
            document.getElementById("ui").remove();
        });
    </script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-91827071-1', 'auto');
        ga('send', 'pageview');
    </script>

</body>
</html>


