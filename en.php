<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - 3D WebGL Space Simulations Online</title>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <meta name="description" content="The Solaris Project is a collection of 3D space simulations which permit you to discover the solar system and more." />
    <meta name="viewport" content="width=device-width, user-scalable=no">
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
    <h1 id="titre">Solaris Project <br/><span class="soustitre">3D space simulations online</span></h1>

    <p id="contact"><a href="contact-en.php">Feedback</a></p>

    <div id="news">
        <p><a href="news-en.php">What's new ?</a></p>
        <div id="news-content">
            <p>Version 2<span class="point">.</span>9
            <br/>- Added an ambient music
            <br/>- You can now disable the ambient music by pressing [M]
            <br/>- You can now toggle the information pannel by pressing [I]
            <br/>- You can now set a new date by pressing [T]
            <br/>- Improved interface on PC
            <br/>- Improved interface on mobile
            <br/>- You can now access the information pannel on mobile
            <br/>- Improved Galaxies
            <br/>- Little Fixes
            <br/>- Added new backgrounds
            <br/>- Change patch note's font (seriously, that was unreadable ^^)
            </p>
        </div>
    </div>



    <div id="start">Start</div>


    <div id="qualcontrol">
        <a href="simulations/solaris/en.php?q=low" id="low">
            <img src="data/menu/low.png" alt="Solar System (lightened)"/>
            <h3>Solar System <br/>(lightened)&nbsp;</h3>
        </a>
        <a href="simulations/solaris/en.php?q=high" id="high">
            <img src="data/menu/high.png" alt="Solar System"/>
            <h3>Solar System&nbsp;</h3>
        </a>
        <a href="simulations/galaxia/en.php" id="galaxy">
            <img src="data/menu/galaxy.png" alt="Galaxy"/>
            <h3>Galaxy&nbsp;</h3>
        </a>
        <a href="simulations/scales/en.php" id="scales">
            <img src="data/menu/scales.png" alt="Universe's scales"/>
            <h3>Universe's scales&nbsp;</h3>    
        </a>
        <a href="simulations/moon-earth/en.php" id="terre">
            <img src="data/menu/moon-earth.png" alt="Earth and Moon"/>
            <h3>Earth and Moon&nbsp;</h3>
        </a>
        <a href="simulations/hyperspace/en.php" id="hyperspace">
            <img src="data/menu/hyperspace.png" alt="HyperSpace"/>
            <h3>HyperSpace Travel&nbsp;</h3>
        </a>
        <a href="simulations/jupiter/en.php" id="jupiter">
            <img src="data/menu/jupiter.png" alt="Jupiter and its satellites"/>
            <h3>Jupiter and its&nbsp; satellites&nbsp;</h3>
        </a>
        <a href="simulations/saturne/en.php" id="saturne">
            <img src="data/menu/saturne.png" alt="Saturne and its satellites"/>
            <h3>Saturn and its satellites&nbsp;</h3>
        </a>
        <a href="simulations/mars/en.php" id="mars">
            <img src="data/menu/mars.png" alt="Mars"/>
            <h3>Mars (4 billion years ago)&nbsp;</h3>
        </a>
        <a href="simulations/pulsar/en.php" id="pulsar">
            <img src="data/menu/pulsar.png" alt="Pulsar"/>
            <h3>Pulsars&nbsp;</h3>
        </a>
        <a href="simulations/uranus/en.php" id="uranus">
            <img src="data/menu/uranus.png" alt="Uranus and its saltellites"/>
            <h3>Uranus and its&nbsp; satellites&nbsp;</h3>
        </a>
        <a href="gallery.php" id="gallery">
            <img src="data/menu/gallery.png" alt="Gallery"/>
            <h3>Gallery&nbsp;</h3>
        </a>
    </div>

    <a href="https://twitter.com/ProjetSolaris" class="twitter-follow-button" data-show-count="false" data-size="large" data-dnt="true">Follow @ProjetSolaris</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    
    <a href="index.php?v=true"><img alt="french" class="flag" src="data/menu/french.png"/></a>

    <?php include("includes/en/footer.html"); ?>
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