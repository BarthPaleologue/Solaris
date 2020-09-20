<!DOCTYPE HTML>

<html lang="fr">

<head>
    <style>
        body {
            background:url('./bg/background<?php echo(rand(1,count(glob("./bg/*.*"))))?>.png');
        }
    </style>
    <title>Projet Solaris - Simulations Spatiales 3D</title>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="Cache-control" content="public">
    <meta name="description" content="Le Projet Solaris est une collection de simulations spatiales 3D online qui vous permettent d'explorer l'espace comme si vous y étiez !" />
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="stylesheet" href="css/home.min.css" />
    <link rel="icon" type="image/x-icon" href="icon.ico" />
    <?php
        if(isset($_GET["v"]) && $_GET["v"]) {
            $compteur = fopen("compteur.txt","r+");
            $visites = fgets($compteur);
            fclose($compteur);
        } else {
            $compteur = fopen("compteur.txt","r+");
            $visites = fgets($compteur);
            $visites += 1;
            fseek($compteur,0);
            fputs($compteur,$visites);
            fclose($compteur);
        }
    ?>
</head>

<body id="corps">

    <h1 id="titre">Projet Solaris <br/><span class="soustitre">Simulations Spatiales en 3D</span></h1>

    <p id="contact"><a href="contact.php">Feedback</a></p>

    <div id="news">
        <p><a href="news.php">Quoi de neuf ?</a></p>
        <div id="news-content">
            <p>Version 2<span class="point">.</span>9
            <br/>- Ajout d'une musique d'ambiance
            <br/>- Ajout d'un raccourci pour couper la musique d'ambiance [M]
            <br/>- Vous pouvez désormais cacher le panneau d'informations en appuyant sur [I]
            <br/>- Vous pouvez paramétrer la date en appuyant sur [T]
            <br/>- Amélioration de l'interface sur PC
            <br/>- Amélioration de l'interface sur mobile
            <br/>- Vous pouvez désormais accéder au panneau d'informations sur mobile
            <br/>- Amélioration des galaxies
            <br/>- Petites corrections
            <br/>- Ajout de nouveaux fonds d'écran
            <br/>- Changement de la police de patch note (sérieusement, c'était illisible ^^)
            </p>
        </div>
    </div>

    <div id="start">Start</div>

    <div id="qualcontrol">
        <a href="simulations/solaris/index.php?q=low" id="low">
            <img src="data/menu/low.png" alt="Système Solaire (allégé)"/>
            <h3>Système Solaire&nbsp; (allégé)&nbsp;</h3>
        </a>
        <a href="simulations/solaris/index.php?q=high" id="high">
            <img src="data/menu/high.png" alt="Système Solaire"/>
            <h3>Système Solaire&nbsp;</h3>
        </a>
        <a href="simulations/galaxy" id="galaxy">
            <img src="data/menu/galaxy.png" alt="Galaxie"/>
            <h3>Galaxie&nbsp;</h3>
        </a>
        <a href="simulations/scales" id="scales">
            <img src="data/menu/scales.png" alt="Echelles Cosmiques"/>
            <h3>Echelles&nbsp; cosmiques&nbsp;</h3>    
        </a>
        <a href="simulations/moon-earth" id="terre">
            <img src="data/menu/moon-earth.png" alt="Terre et Lune"/>
            <h3>La Terre et la Lune&nbsp;</h3>
        </a>
        <a href="simulations/hyperspace" id="hyperspace">
            <img src="data/menu/hyperspace.png" alt="HyperEspace"/>
            <h3>HyperEspace&nbsp;</h3>
        </a>
        <a href="simulations/jupiter" id="jupiter">
            <img src="data/menu/jupiter.png" alt="Jupiter"/>
            <h3>Jupiter et ses&nbsp; satellites&nbsp;</h3>
        </a>
        <a href="simulations/saturne" id="saturne">
            <img src="data/menu/saturne.png" alt="Saturne"/>
            <h3>Saturne et ses&nbsp; satellites&nbsp;</h3>
        </a>
        <a href="simulations/mars" id="mars">
            <img src="data/menu/mars.png" alt="Mars"/>
            <h3>Mars (il y a 4 MA)&nbsp;</h3>
        </a>
        <a href="simulations/pulsar" id="pulsar">
            <img src="data/menu/pulsar.png" alt="Pulsar"/>
            <h3>Les Pulsars&nbsp;</h3>
        </a>
        <a href="simulations/uranus" id="uranus">
            <img src="data/menu/uranus.png" alt="Uranus"/>
            <h3>Uranus et ses&nbsp; satellites&nbsp;</h3>
        </a>
        <a href="galerie.php" id="gallery">
            <img src="data/menu/gallery.png" alt="Galerie"/>
            <h3>Galerie&nbsp;</h3>
        </a>
    </div>
    <a href="https://twitter.com/ProjetSolaris" class="twitter-follow-button" data-show-count="false" data-size="large" data-dnt="true">Follow @ProjetSolaris</a> 

    <a href="en.php?v=true"><img alt="english" class="flag" src="data/menu/english.jpg"/></a>

    <?php include("includes/fr/footer.html"); ?>

    <script>
        document.getElementById("start").addEventListener("click", () => {
            document.getElementById("start").style.display = "none";
            document.getElementById("qualcontrol").classList.toggle("showMenu");
            for(let elm of document.querySelectorAll("#qualcontrol a")) {
                elm.classList.toggle("toTop");
                setTimeout(() => elm.style.transitionDelay = "0s", 1000);
            }
        });
    </script>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
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