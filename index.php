<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Simulations Spatiales en 3D WebGL</title>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="Cache-control" content="public">
    <meta name="description" content="Le Projet Solaris est une collection de simulations spatiales 3D online qui vous permettent d'explorer l'espace comme si vous y étiez !" />
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="dns-prefetch" href="http://www.copyright01.com/">
    <link rel="dns-prefetch" href="http://www.twitter.com/">
    <link rel="icon" type="image/x-icon" href="icon.ico" />
    <style>
        body{display:none;}
    </style>
    <?php
        if(isset($_GET["v"]) && $_GET["v"] == true) {
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

    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Simulations Spatiales en 3D</span></h1>

    <p id="contact"><a href="contact.php">Feedback</a></p>

    <div id="news">
        <p><a href="news.php">Quoi de neuf ?</a></p>
        <div id="news-content">
            <p>Version 2<span class="point">.</span>8
            <br/>- Ajout des saisons pour toutes les planètes
            <br/>- Ajout d'une option pour activer/désactiver les astéroides [H]
            <br/>- Ajout d'un raccourci pour prendre un screenshot [P]
            <br/>- Presser la touche [K] permet d'afficher le nombre de FPS
            <br/>- Ajout d'une galerie contenant tous les fond d'écrans utilisés par Solaris en HD, gratuit à télécharger et à utiliser
            <br/>- Améliorations des anneaux de Saturne dans "Saturne et ses satellites"
            <br/>- Amélioration du générateur de galaxies
            <br/>- Les noms des planètes apparaissent plus gros que ceux des satellites
            <br/>- Ajout de nouveaux fonds d'écran
            <br/>- Amélioration de l'interface sur mobile
            <br/>- Amélioration de la page de feedback
            <br/>- Correction de bugs
            </p>
        </div>
    </div>



    <div id="start">Start</div>


    <div id="qualcontrol">
        <a href="simulations/solaris/index.php?q=low" id="low">
            <img src="data/menu/low.png" alt="Système Solaire (qualité basse)"/>
            <h3>Système Solaire&nbsp; (qualité basse)&nbsp;</h3>
        </a>
        <a href="simulations/solaris/index.php?q=high" id="high">
            <img src="data/menu/high.png" alt="Système Solaire (qualité haute)"/>
            <h3>Système Solaire&nbsp; (qualité haute)&nbsp;</h3>
        </a>
        <a href="simulations/galaxia" id="galaxy">
            <img src="data/menu/galaxy.png" alt="Galaxie"/>
            <h3>Galaxie&nbsp;</h3>
        </a>
        <a href="simulations/scales" id="scales">
            <img src="data/menu/scales.png" alt="Echelles"/>
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
    <a href="https://twitter.com/ProjetSolaris" class="twitter-follow-button" data-show-count="false" data-size="large" data-dnt="true">Follow @ProjetSolaris</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

    <a href="en.php?v=true"><img class="flag" src="data/menu/english.jpg"/></a>

    <?php include("includes/fr/footer.html"); ?>
    <link rel="stylesheet" href="css/style.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script>
        $("body").fadeIn(500);
        $("#start").on("click", function(e) {
            $(this).fadeOut(() => {
                $("#qualcontrol").fadeIn()
                $("#qualcontrol a").addClass("toTop");
                setTimeout(() => {
                    $("#qualcontrol a").css({"transition-delay":"0s"});
                }, 1000);
            });
        });
        $("#news").hover(e => $("#news-content").fadeToggle(200));
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