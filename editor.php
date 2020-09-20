<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <title>Editeur</title>
    <link rel="stylesheet" href="css/home.min.css" />
    <link rel="stylesheet" href="css/editor.min.css" />
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
        <p><a href="index.php?v=true">Accueil</a></p>
    </div>
    <h1 id="titre">Editeur</h1>

    <div id="generalSettings">
        <h2>Paramètres Généraux</h2>
        <div><p>Multiplicateur de diamètre : </p><input type="text" value="1" /></div>
        <div><p>Une unité de diamètre = </p><input type="text" value="1" /><p>km</p></div>
        <div><p>Multiplicateur de distance : </p><input type="text" value="1" /></div>
        <div><p>Une unité de distance = </p><input type="text" value="1" /><p>km</p></div>
        <div><p>Multiplicateur de la vitesse du temps : </p><input type="text" value="1" /></div>
        <div><p>Date initiale : </p><input type="date" value="" /></div>
    </div>

    <div id="astraSettings">
        <h2>Liste des Astres</h2>
    </div>

    <div id="addButton"><p id="addSymbol">+</p><p id="addText">Ajouter</p></div>
    <p>Uploader</p>
    <p>Télécharger</p>

    <div id="iconPicker" class="hiddenPicker" tabindex="0">
        <?php 
            for($i = 0; $i < count(glob('./simulations/data/icons/*.*')); $i++) {
                echo("<img class='icon' src='".glob('./simulations/data/icons/*.*')[$i]."' />");
            }
        ?>
    </div>

    <div id="surfacePicker" class="hiddenPicker">
        <?php 
            for($i = 0; $i < count(glob('./simulations/data/textures/surfaces/*.*')); $i++) {
                echo("<img class='surface' src='".glob('./simulations/data/textures/surfaces/*.*')[$i]."' />");
            }
        ?>
    </div>

    <div id="maskPicker" class="hiddenPicker">
        <?php 
            for($i = 0; $i < count(glob('./simulations/data/textures/atmospheres/*.*')); $i++) {
                echo("<img class='mask' src='".glob('./simulations/data/textures/atmospheres/*.*')[$i]."' />");
            }
        ?>
    </div>

    <div id="ringPicker" class="hiddenPicker">
        <?php 
            for($i = 0; $i < count(glob('./simulations/data/textures/rings/*.*')); $i++) {
                echo("<img class='ring' src='".glob('./simulations/data/textures/rings/*.*')[$i]."' />");
            }
        ?>
    </div>

    <a href="news-en.php"><img class="flag" src="data/menu/english.jpg"/></a>

    <?php //include("includes/fr/footer.html"); ?>

    <script src="./editor.js"></script>
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