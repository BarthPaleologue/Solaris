<!DOCTYPE HTML>

<html lang="en">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('../../bg/*.*'))).".png');}</style>");?>
    <title>Solaris Project - Uranus and its satellites</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <meta name="description" content="" />
    <link rel="stylesheet" href="../../css/style.css" />
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Solaris Project<br/><span class="soustitre">Uranus and its Satellites</span></h1>

    <?php include("../../includes/en/nav.html"); ?>

    <?php include("../../includes/en/settings.html"); ?>

    <?php include("../../includes/en/infos.html"); ?>

    <?php include("../../includes/en/toolbar.html"); ?>

    <?php include("../../includes/en/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>

    <?php include("../../includes/en/footer.html"); ?>

    <script type="text/javascript" src="../babylon4.js"></script>
    <script type="text/javascript" src="../babylon.gui.js"></script>
    <script type='module'>
        import { initSolaris } from '../main.js';
        initSolaris("./uranus-data-en.json", "high");
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