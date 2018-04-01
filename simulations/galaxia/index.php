<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Générateur de Galaxies WebGL</title>
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
    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Générateur de Galaxies</span></h1>
    <div id="home">
        <p><a href="../../index.php?v=true">Accueil</a></p>
    </div>
    <a href="en.php"><img class="flag" src="../../data/menu/english.jpg"/></a>
    <p id="contact"><a href="../../contact.php">Feedback</a></p>
    <nav id="menu">
        <li id="exit"><a href="../../index.php?v=true"><p>Quitter</p></a></li>
        <li id="fullscreen"><p>Plein écran</p>
            <ul id="screen-list">
                <li id="all">Avec Interface</li>
                <li id="not-all">Sans Interface</li>
                <li id="full-exit">Quitter Plein écran</li>
            </ul>
        </li>
        <li id="views"><p>Vues</p>
            <ul id="cam-list">
                <li id="free">Vue libre</li>
                <li id="freed">Vue libre 3D</li>
                <li id="plan">Vue Galactique</li>
                <li id="pland">Vue Galactique 3D</li>
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

            <h3>Sensibilité</h3>
            <div id="sensifree"><div id="sensihandle" class="ui-slider-handle"></div></div>

            <h3>Nombre de bras</h3>
            <div id="arms"><div id="armshandle" class="ui-slider-handle"></div></div>

            <h3>Densité des étoiles</h3>
            <div id="denstar"><div id="denshandle" class="ui-slider-handle"></div></div>

            <h3>Enroulement de la galaxie</h3>
            <div id="enroulement"><div id="enrouhandle" class="ui-slider-handle"></div></div>

            <h3>Largeur des bras</h3>
            <div id="largeur"><div id="largehandle" class="ui-slider-handle"></div></div>

            <h3>Longueur des bras</h3>
            <div id="longueur"><div id="longueurhandle" class="ui-slider-handle"></div></div>

            <h3>Dispersion des étoiles</h3>
            <div id="disp"><div id="disphandle" class="ui-slider-handle"></div></div>

            <br/>
            <h4 id="genere">Générer aléatoirement</h4>
            <br/>
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot" />
        <img id="trandom" src="../../toolbar/random.png" width=50 height=50 title="Galaxie Aléatoire" />
    </div>

    <canvas id="renderCanvas"></canvas>

    <div id="ui">
        <p>Nombre d'étoiles :</p>
        <div id="star"><div id="starhandle" class="ui-slider-handle"></div></div>
        <br/><br/><br/>
        <div id="generate">Générer !</div>
    </div>



    <?php include("../../includes/fr/footer.html"); ?>

</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="babylon_galaxy.js"></script>
<script src="../../jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
<script src="../../js/screenfull.js"></script>
<script src="../../js/global.js"></script>
<script src="galaxy.js"></script>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-91827071-1', 'auto');
    ga('send', 'pageview');
</script>

<script>
    $("#renderCanvas").fadeOut();
    var nb = 32000;
    var starSlider = createSlider($("#star"),$("#starhandle"),32000,1000,150000,(e,ui)=>{
        $("#starhandle").text(intFormat(ui.value));
        nb=ui.value;
    });
    $("#generate").on("click", e => {
        createGalaxy(nb);
        $("#renderCanvas").fadeIn();
        $("#ui").remove();
    });
</script>


