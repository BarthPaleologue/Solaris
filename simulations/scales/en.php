<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - Cosmic scales</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="../common-style.css" />
    <link rel="stylesheet" href="../../jquery-ui/jquery-ui.css" />
    <style>
        #name {font-size:150% !important}
    </style>
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Solaris Project<br/><span class="soustitre">Universe's Scales</span></h1>
    <nav id="menu">
        <li id="exit"><a href="../../en.php?v=true"><p>Quit</p></a></li>
        <li id="fullscreen"><p>Fullscreen</p>
            <ul id="screen-list">
                <li id="all">With Interface</li>
                <li id="not-all">Without Interface</li>
                <li id="full-exit">Exit Fullscreen</li>
            </ul>
        </li>
        <li id="binfos"><p>Info</p></li>
        <li id="views"><p>Views</p>
            <ul id="cam-list">
                <li id="free">Free View</li>
                <li id="freed">3D Free View</li>
                <li id="plan">Planetary View</li>
                <li id="pland">3D Planetary View</li>
            </ul>
        </li>
        <li id="astras"><p>Celestial bodies</p>
            <ul id="astra-list" style="max-height:1200% !important;">
                <div id="Japet" class="planete"><img src="../data/icons/Japet.png" /><p>Japet</p></div>
                <div id="The Moon" class="planete"><img src="../data/icons/Lune.png" /><p>The Moon</p></div>
                <div id="Mercury" class="planete"><img src="../data/icons/Mercure.png" /><p>Mercury</p></div>
                <div id="Mars" class="planete"><img src="../data/icons/Mars.png" /><p>Mars</p></div>
                <div id="The Earth" class="planete"><img src="../data/icons/Terre.png" /><p>The Earth</p></div>
                <div id="Neptune" class="planete"><img src="../data/icons/Neptune.png" /><p>Neptune</p></div>
                <div id="Saturn" class="planete"><img src="../data/icons/Saturne.png" /><p>Saturn</p></div>
                <div id="Jupiter" class="planete"><img src="../data/icons/Jupiter.png" /><p>Jupiter</p></div>
                <div id="The Sun" class="planete"><img src="../data/icons/Soleil.png" /><p>The Sun</p></div>
                <div id="Altair" class="planete"><img src="../data/icons/Altair.png" /><p>Altair</p></div>
                <div id="Pollux" class="planete"><img src="../data/icons/Pollux.png" /><p>Pollux</p></div>
                <div id="Arcturus" class="planete"><img src="../data/icons/Arcturus.png" /><p>Arcturus</p></div>
                <div id="Aldebaran" class="planete"><img src="../data/icons/Aldebaran.png" /><p>Aldebaran</p></div>
                <div id="Rigel" class="planete"><img src="../data/icons/Rigel.png" /><p>Rigel</p></div>
                <div id="R Doradus" class="planete"><img src="../data/icons/RDoradus.png" /><p>R Doradus</p></div>
                <div id="V382 Carinae" class="planete"><img src="../data/icons/Carinae.png" /><p>V382 Carinae</p></div>
                <div id="Betelgeuse" class="planete"><img src="../data/icons/Betelgeuse.png" /><p>Betelgeuse</p></div>
                <div id="UY Scutti" class="planete"><img src="../data/icons/uyscutti.png" /><p>UY Scutti</p></div>
            </ul>
        </li>
        <li id="settings"><p>Settings</p></li>
        <p id="fps"></p>
    </nav>
    <div id="setters">
            <h2>Settings</h2>
            <div id="setters-content">
            <h3>Mouse wheel's precision</h3>
            <div id="precision"><div id="precihandle" class="ui-slider-handle"></div></div>

            <h3>Free view's speed</h3>
            <div id="speed"><div id="freehandle" class="ui-slider-handle"></div></div>

            <h3>Sensibility</h3>
            <div id="sensifree"><div id="sensihandle" class="ui-slider-handle"></div></div>

            <h3>Travel's speed</h3>
            <div id="transispeed"><div id="transihandle" class="ui-slider-handle"></div></div>

            <h3>Contrast</h3>
            <div id="contrast"><div id="contrasthandle" class="ui-slider-handle"></div></div>
            <br/>
        </div>
    </div>

    <div id="infos">
        <div id="infos-headers"><p id="previous"><</p><p id="name">Info</p><p id="next">></p></div>
        <div id="infos-content">
                    
            <h3>Diameter : <span id="diameter"></span></h3>
            
            <h3>Distance to Sun : <br/><span id="distance"></span></h3>
            
            <h3>Type : <span id="class"></span></h3>

            <!--<h3>Description : <br/><span id="bio"></span></h3>     -->    

            <br/>
        </div>
    </div>

    <div id="toolbar">
        <img id="tscreen" src="../../toolbar/screenshot.png" width=50 height=50 title="Screenshot [P]" />
        <img id="tfxaa" src="../../toolbar/noantialiasing.png" width=50 height=50 title="Enable FXAA [F]" />
        <img id="tzoom" src="../../toolbar/zoom.png" width=50 height=50 title="Zoom on current target [C]" />
        <img style="border-radius:100%;" id="tgodrays" src="../../toolbar/godrays.png" width=50 height=50 title="Remove Godrays [G]" />
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
    <script src="scales-data-en.js"></script>
    <script src="scales.js"></script>

    <script>setTimeout(()=>createScales(),100);</script> 

</body>
</html>


