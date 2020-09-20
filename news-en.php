<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <title>What's New ?</title>
    <link rel="stylesheet" href="css/home.min.css" />
    <link rel="icon" type="image/x-icon" href="icon.ico" />   
    <meta name="viewport" content="width=device-width, user-scalable=no">
     <?php
        $compteur = fopen("compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body>
    <div id="home">
        <p><a href="en.php?v=true">Home</a></p>
    </div>
    <h1 id="titre" class="newstitle">What's new ?</h1>

    <div id="news-content-block">
        <div>
            <p><u>Version 2<span class="point">.</span>9</u></p>
            <p>- Added an ambient music
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
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>8</u></p>
            <p>- Added seasons on planets
            <br/>- You can now disable asteroid belts by pressing [H]
            <br/>- You can now take a screenshot by pressing [P]
            <br/>- You can now display FPS number by pressing [K]
            <br/>- Added a gallery in which you can find all backgrounds of Solaris, downloadfree, reusefree
            <br/>- Improved Saturn's rings in "Saturn and its satellites"
            <br/>- Improved Galaxy generator
            <br/>- Planet's labels are now bigger than satellite's labels
            <br/>- Added new backgrounds
            <br/>- Improved interface on mobile
            <br/>- Improved feedback page
            <br/>- Bugs have been fixed
            </p>
        </div>
        <hr/>
         <div>
            <p><u>Version 2<span class="point">.</span>7</u></p>
            <p>- Added a label system for all celestial bodies
            <br/>- Added a new simulation based on Uranus and its satellites
            <br/>- Added the ability to change dynamically the date
            <br/>- Added keyboard shortcuts (O to toggle orbits, C to zoom, G toggle godrays, N to toggle labels et F to toggle antialiasing)
            <br/>- Added a new space skybox
            <br/>- Added a new parameter for star dispertion in the Galaxy generator
            <br/>- Added a new parameter for the contrast
            <br/>- Added a little bloom
            <br/>- Added new backgrounds
            <br/>- Changed Jupiter's and Betelgeuse's texture
            <br/>- Solaris is now running on BabylonJS 3<span class="point">.</span>0
            <br/>- Significant optimization
            <br/>- Bugs have been fixed
            <br/>- Minor other changes
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>6</u></p>
            <p>- Added an English Version
            <br/>- Improved loading screen
            <br/>- Corrected the content of the information pannel
            <br/>- Added a new simulation centered on Jupiter
            <br/>- Added a new simulation centered on Pulsars
            <br/>- Improved orbits
            <br/>- Improved free navigation
            <br/>- Improved interface
            <br/>- Improved Hyperspace travel
            <br/>- Galaxy generator has been reworked
            <br/>- Added new textures for Mercury, the Moon, Mimas, Tethys, Dione et Rhea
            <br/>- Added missing features in some simulations
            <br/>- Informations and settings pannels are no longer resizable
            <br/>- Bugs have been fixed
            <br/>- Minor improvements
            </p>
        </div>
    </div>

    <a href="news.php"><img class="flag" src="data/menu/french.png"/></a>

    <?php include("includes/en/footer.html"); ?>

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