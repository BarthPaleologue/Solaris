<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Echelles Cosmiques</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="../../jquery-ui/jquery-ui.css" />
    <style>
        #name {font-size:170%}
    </style>
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Echelles Cosmiques</span></h1>
    <nav id="menu">
        <li id="exit"><a href="../../index.php?v=true"><p>Quitter</p></a></li>
        <li id="fullscreen"><p>Plein écran</p>
            <ul id="screen-list">
                <li id="all">Avec Interface</li>
                <li id="not-all">Sans Interface</li>
                <li id="full-exit">Quitter Plein écran</li>
            </ul>
        </li>
        <li id="binfos"><p>Infos</p></li>
        <li id="views"><p>Vues</p>
            <ul id="cam-list">
                <li id="free">Vue libre</li>
                <li id="freed">Vue libre 3D</li>
                <li id="plan">Vue planétaire</li>
                <li id="pland">Vue planétaire 3D</li>
            </ul>
        </li>
        <li id="astras"><p>Astres</p>
            <ul id="astra-list" style="max-height:1200% !important;">
                <div id="Japet" class="planete"><img src="../../icons/Japet.png" /><p>Japet</p></div>
                <div id="Lune" class="planete"><img src="../../icons/Lune.png" /><p>Lune</p></div>
                <div id="Mercure" class="planete"><img src="../../icons/Mercure.png" /><p>Mercure</p></div>
                <div id="Mars" class="planete"><img src="../../icons/Mars.png" /><p>Mars</p></div>
                <div id="Terre" class="planete"><img src="../../icons/Terre.png" /><p>Terre</p></div>
                <div id="Neptune" class="planete"><img src="../../icons/Neptune.png" /><p>Neptune</p></div>
                <div id="Saturne" class="planete"><img src="../../icons/Saturne.png" /><p>Saturne</p></div>
                <div id="Jupiter" class="planete"><img src="../../icons/Jupiter.png" /><p>Jupiter</p></div>
                <div id="Soleil" class="planete"><img src="../../icons/Soleil.png" /><p>Soleil</p></div>
                <div id="Altair" class="planete"><img src="../../icons/Altair.png" /><p>Altair</p></div>
                <div id="Pollux" class="planete"><img src="../../icons/Pollux.png" /><p>Pollux</p></div>
                <div id="Arcturus" class="planete"><img src="../../icons/Arcturus.png" /><p>Arcturus</p></div>
                <div id="Aldébaran" class="planete"><img src="../../icons/Aldebaran.png" /><p>Aldébaran</p></div>
                <div id="Rigel" class="planete"><img src="../../icons/Rigel.png" /><p>Rigel</p></div>
                <div id="R Doradus" class="planete"><img src="../../icons/RDoradus.png" /><p>R Doradus</p></div>
                <div id="V382 Carinae" class="planete"><img src="../../icons/Carinae.png" /><p>V382 Carinae</p></div>
                <div id="Bételgeuse" class="planete"><img src="../../icons/Betelgeuse.png" /><p>Bételgeuse</p></div>
                <div id="UY Scutti" class="planete"><img src="../../icons/uyscutti.png" /><p>UY Scutti</p></div>
            </ul>
        </li>
        <li id="settings"><p>Paramètres</p></li>
        <p id="fps"></p>
    </nav>
    <div id="setters">
            <h2>Paramètres</h2>
            <div id="setters-content">
            <h3>Précision de la roulette</h3>
            <div id="precision"><div id="precihandle" class="ui-slider-handle"></div></div>

            <h3>Vitesse en mode libre</h3>
            <div id="speed"><div id="freehandle" class="ui-slider-handle"></div></div>

            <h3>Sensibilité en mode libre</h3>
            <div id="sensifree"><div id="sensihandle" class="ui-slider-handle"></div></div>

            <h3>Vitesse des Transitions</h3>
            <div id="transispeed"><div id="transihandle" class="ui-slider-handle"></div></div>

            <h3>Contraste</h3>
            <div id="contrast"><div id="contrasthandle" class="ui-slider-handle"></div></div>

            <br/>
        </div>
    </div>

    <div id="infos">
        <div id="infos-headers"><p id="previous"><</p><p id="name">Infos</p><p id="next">></p></div>
        <div id="infos-content">
                    
            <h3>Diamètre : <span id="diameter"></span></h3>
            
            <h3>Distance au Soleil : <br/><span id="distance"></span></h3>
            
            <h3>Type : <span id="class"></span></h3>

            <!--<h3>Description : <br/><span id="bio"></span></h3>     -->    

            <br/>
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot [P]" />
        <img id="tfxaa" src="../../toolbar/noantialiasing.png" width=50 height=50 title="Activer l'Anticrénelage [F]" />
        <img id="tzoom" src="../../toolbar/zoom.png" width=50 height=50 title="Zoomer sur l'astre cible [C]" />
        <img style="border-radius:100%;" id="tgodrays" src="../../toolbar/godrays.png" width=50 height=50 title="Enlever les godrays [G]" />
    </div>

    <?php include("../../includes/fr/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/fr/footer.html"); ?>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-91827071-1', 'auto');
        ga('send', 'pageview');
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="../babylon.js"></script>
    <script src="../../jquery-ui/jquery-ui.min.js"></script>
    <script src="../../js/screenfull.js"></script>
    <script src="../../js/global.js"></script>
    <script src="scales-data.js"></script>
    <script src="scales.js"></script>

    <script>setTimeout(()=>createScales(),100);</script> 

</body>
</html>


