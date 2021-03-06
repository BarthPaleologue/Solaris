<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('../../bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Collision d'étoiles à Neutrons</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <meta name="robots" content="index" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="../../icon.ico" />
    <link rel="stylesheet" href="../../css/style.css" />
    <?php
        $compteur = fopen("../../compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">
    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Collision d'étoiles à Neutrons</span></h1>

    <?php include("../../includes/fr/nav.html"); ?>
    
    <?php include("../../includes/fr/settings.html"); ?>

    <div id="infos">
        <div id="infos-headers">
            <p id="previous">&lt;</p>
            <p id="name">Infos</p>
            <p id="next">&gt;</p>
        </div>
        <div id="infos-content">

            <h3>Description : <br/><span id="bio"></span></h3>

            <br/>
        </div>
    </div>

    <?php include("../../includes/fr/toolbar.html"); ?>

    <?php include("../../includes/fr/loading.html"); ?>

    <canvas id="renderCanvas"></canvas>


    <?php include("../../includes/fr/footer.html"); ?>

</body>
</html>

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
<script src="pulsar-data.js"></script>
<script src="colliding.js"></script>
<link rel="stylesheet" href="../common-style.css" />
<link rel="stylesheet" href="../../jquery-ui/jquery-ui.css" />
<script>setTimeout(()=>createScene(),100);</script> 


