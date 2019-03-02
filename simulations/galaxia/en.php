<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - WebGL Galaxy Generator</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="The Galaxy Generator allows you to create spiral galaxies and to configure them as you want." />
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
    <h1 id="titre">Solaris Project<br/><span class="soustitre">Galaxy Generator</span></h1>
    <div id="home">
        <p><a href="../../en.php?v=true">Home</a></p>
    </div>
    <a href="index.php"><img class="flag" src="../../data/menu/french.png"/></a>
    <p id="contact"><a href="../../contact-en.php">Feedback</a></p>
    <nav id="menu">
        <li id="exit"><a href="../../en.php?v=true"><p>Quit</p></a></li>
        <li id="fullscreen"><p>Fullscreen</p>
            <ul id="screen-list">
                <li id="all">with interface</li>
                <li id="not-all">without interface</li>
                <li id="full-exit">exit fullscreen</li>
            </ul>
        </li>
        <li id="views"><p>Views</p>
            <ul id="cam-list">
                <li id="free">Free view</li>
                <li id="freed">3D Free view</li>
                <li id="plan">Galactic view</li>
                <li id="pland">3D Galactic view</li>
            </ul>
        </li>
        <li id="settings"><p>Settings</p></li>
        <p id="fps"></p>
    </nav>
    <div id="setters">
        <h2>Settings</h2>
        <div id="setters-content">
            <h3>Mouse wheel precision</h3>
            <div id="precision"><div id="precihandle" class="ui-slider-handle"></div></div>

            <h3>Free view speed</h3>
            <div id="speed"><div id="freehandle" class="ui-slider-handle"></div></div>

            <h3>Sensibility</h3>
            <div id="sensifree"><div id="sensihandle" class="ui-slider-handle"></div></div>

            <h3>Arms number</h3>
            <div id="arms"><div id="armshandle" class="ui-slider-handle"></div></div>

            <h3>Star density</h3>
            <div id="denstar"><div id="denshandle" class="ui-slider-handle"></div></div>

            <h3>Rotation factor</h3>
            <div id="enroulement"><div id="enrouhandle" class="ui-slider-handle"></div></div>

            <h3>Arms scale</h3>
            <div id="largeur"><div id="largehandle" class="ui-slider-handle"></div></div>

            <h3>Arms length</h3>
            <div id="longueur"><div id="longueurhandle" class="ui-slider-handle"></div></div>

            <h3>Star dispersion</h3>
            <div id="disp"><div id="disphandle" class="ui-slider-handle"></div></div>
            <br/>
            <h4 id="genere">Random Galaxy</h4>
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
        <p>Number of Stars :</p>
        <div id="star"><div id="starhandle" class="ui-slider-handle"></div></div>
        <br/><br/><br/>
        <div id="generate">Generate !</div>
    </div>

    <?php include("../../includes/fr/footer.html"); ?>

</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="babylon4.js"></script>
<script src="../../jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
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
    var nb = 20000;
    var starSlider = createSlider($("#star"),$("#starhandle"),20000,1000,150000,(e,ui)=>{
        $("#starhandle").text(intFormat(ui.value));
        nb=ui.value;
    });
    $("#generate").on("click", e => {
        createGalaxy(nb);
        $("#renderCanvas").fadeIn();
        $("#ui").remove();
    });
</script>


