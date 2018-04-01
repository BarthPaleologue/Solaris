<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <title>Projet Solaris - Galerie</title>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow, all" />
    <meta http-equiv="Cache-control" content="public">
    <meta name="description" content="Tous les fonds d'écran du Projet Solaris, à télécharger gratuitement." />
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="dns-prefetch" href="http://www.copyright01.com/">
    <link rel="dns-prefetch" href="http://www.twitter.com/">
    <link rel="icon" type="image/x-icon" href="icon.ico" />
    <style>
        body{display:none;}
    </style>
    <?php
        $compteur = fopen("compteur.txt","r+");
        $visites = fgets($compteur);
        fclose($compteur);
    ?>
</head>

<body id="corps">

    <h1 id="titre">Projet Solaris<br/><span class="soustitre">Simulations Spatiales en 3D</span></h1>

    <p id="contact"><a href="contact.php">Feedback</a></p>

    <div id="home">
        <p><a href="index.php?v=true">Accueil</a></p>
    </div>

    <div id="qualcontrol">
        <?php for($i=1;$i<=count(glob('bg/*.*'));$i++) echo("<img class='galerie-pic' alt='Background n°".$i."' src='bg/background".$i.".png' />");?>
    </div>

    <div id="zoombox">
        <p id="prev"><</p><p id="suiv">></p><img src=""/>
        <div id="close">X</div>
    </div>

    <a id="download" href="" download="solaris_background.png">Télécharger&nbsp;&nbsp;<img src="data/dl.png"/></a>

    <a href="https://twitter.com/ProjetSolaris" class="twitter-follow-button" data-show-count="false" data-size="large" data-dnt="true">Follow @ProjetSolaris</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

    <a href="gallery.php"><img class="flag" src="data/menu/english.jpg"/></a>

    <?php include("includes/fr/footer.html"); ?>
    <link rel="stylesheet" href="css/style.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script>
        $("#download").animate({"bottom":"-10%"},0);
        $("#download").css("left",(window.innerWidth-270)/2+"px");
        $("body").fadeIn(500);
        $("#qualcontrol").fadeIn()
        <?php echo("const nbimage = ".count(glob('bg/*.*')).";\n");?>
        var currentImage = null;
        $("#qualcontrol img").on("click",function(e) {
            $("#zoombox img").attr("src",$(this).attr("src"));
            $("#download").attr("href",$(this).attr("src"));
            $("#zoombox").fadeToggle(200);
            $("#zoombox").center();
            $("#zoombox").center();
            $("#download").animate({"bottom":"1%"},200);
            currentImage = $(this).index()+1;
        });
        $("#close").on("click",e => {
            $("#download").animate({"bottom":"-10%"},200);
            $("#zoombox").fadeToggle(200);
        });
        $("#suiv").on("click",e => {
            if(currentImage<nbimage) {
                $("#zoombox img").attr("src","bg/background"+(currentImage+1)+".png");
                currentImage += 1;
            } else {
                $("#zoombox img").attr("src","bg/background"+1+".png");
                currentImage = 1;
            }
        });
        $("#prev").on("click",e => {
            if(currentImage>1) {
                $("#zoombox img").attr("src","bg/background"+(currentImage-1)+".png");
                currentImage -= 1;
            } else {
                $("#zoombox img").attr("src","bg/background"+nbimage+".png");
                currentImage = nbimage;
            }
        });
        $.fn.extend({
            center: function () {
                return this.each(function() {
                    var top = ($(window).height() - $(this).outerHeight()) / 2;
                    var left = ($(window).width() - $(this).outerWidth()) / 2;
                    $(this).css({position:'absolute', top: top+'px', left: left+'px'});
                });
            }
        }); 

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