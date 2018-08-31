<!DOCTYPE HTML>

<html lang="fr">

<head>
    <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
    <meta charset="utf-8" />
    <meta name="robots" content="index, follow" />
    <title>Quoi de neuf ?</title>
    <link rel="stylesheet" href="css/style.css" />
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
    <h1 id="titre" class="newstitle">Quoi de neuf ?</h1>

    <div id="news-content-block">
        <div>
            <p><u>Version 2<span class="point">.</span>9</u></p>
            <p>- Ajout d'une musique d'ambiance
            <br/>- Ajout d'un raccourci pour couper la musique d'ambiance [M]
            <br/>- Vous pouvez désormais cacher le panneau d'informations en appuyant sur [I]
            <br/>- Vous pouvez paramétrer la date en appuyant sur [T]
            <br/>- Amélioration de l'interface sur PC
            <br/>- Amélioration de l'interface sur mobile
            <br/>- Vous pouvez désormais accéder au panneau d'informations sur mobile
            <br/>- Amélioration des galaxies
            <br/>- Petites corrections
            <br/>- Ajout de nouveaux fonds d'écran
            <br/>- Changement de la police de patch note (sérieusement, c'était illisible ^^)
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>8</u></p>
            <p>- Ajout des saisons pour toutes les planètes
            <br/>- Ajout d'une option pour activer/désactiver les astéroides [H]
            <br/>- Ajout d'un raccourci pour prendre un screenshot [P]
            <br/>- Presser la touche [K] permet d'afficher le nombre de FPS
            <br/>- Ajout d'une galerie contenant tous les fond d'écrans utilisés par Solaris en HD, gratuit à télécharger et à utiliser
            <br/>- Améliorations des anneaux de Saturne dans "Saturne et ses satellites"
            <br/>- Amélioration du générateur de galaxies
            <br/>- Les noms des planètes apparaissent plus gros que ceux des satellites
            <br/>- Ajout de nouveaux fonds d'écran
            <br/>- Amélioration de l'interface sur mobile
            <br/>- Amélioration de la page de feedback
            <br/>- Correction de bugs
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>7</u></p>
            <p>- Ajout d'un système d'étiquettes pour les astres
            <br/>- Ajout d'une simulation centrée sur Uranus et ses satellites
            <br/>- Ajout d'une nouvelle skybox
            <br/>- Changement de la texture de Jupiter et de Bételgeuse
            <br/>- Solaris fonctionne désormais avec la version 3<span class="point">.</span>0 de BabylonJS
            <br/>- Ajout de raccourcis clavier (O pour les orbites, C pour zoomer, G pour désactiver les godrays, N pour désactiver les étiquettes et F pour activer l'antialiasing)
            <br/>- Ajout d'un nouveau paramètre pour le positionnement des étoiles dans le générateur de galaxies
            <br/>- Ajout d'un nouveau paramètre pour régler le contraste
            <br/>- Ajout d'un peu de flou lumineux
            <br/>- Vous pouvez maintenant paramétrer une date en cliquant sur celle-ci
            <br/>- Optimisations significatives
            <br/>- Correction de bugs
            <br/>- Ajout de nouveaux fonds d'écran
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>6</u></p>
            <p>- Ajout d'une version anglaise
            <br/>- Amélioration de l'écran de chargement avec des pourcentages
            <br/>- Correction du contenu du panneau d'informations
            <br/>- Ajout d'une simulation centrée sur Jupiter et ses satellites
            <br/>- Ajout d'une simulation centrée sur les pulsars
            <br/>- Amélioration des orbites
            <br/>- Amélioration de la navigation libre
            <br/>- Correction des problèmes et amélioration de l'interface
            <br/>- Changements pour le voyage hyperspatial
            <br/>- Refonte du générateur de galaxies
            <br/>- Amélioration des textures de Mercure, la Lune, Mimas, Téthys, Dioné et Rhéa
            <br/>- Ajout des fonctionalités manquantes sur certaines simulations
            <br/>- Les panneaux d'informations et de paramètres ne sont plus redimensionnables
            <br/>- Correction de bugs
            <br/>- Améliorations mineures
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>5</u></p>
            <p>- Ajout d'un facteur inclinaison pour les orbites et pour la rotation des planètes
            <br/>- Ajout d'une barre de raccourcis en bas à gauche de l'écran
            <br/>- Nouveau mode déplacement à l'aide des flèches du panneau d'informations
            <br/>- Amélioration des anneaux de Saturne
            <br/>- Remises à l'échelle des distances dans la Simulation de Saturne et celle de la Terre et la Lune
            <br/>- Changement de couleur des orbites en rouge
            <br/>- Supression du paramètre pour changer la taille du système solaire
            <br/>- Augmentation de la taille du système solaire
            <br/>- Ajout de la texture nocturne de la Terre
            <br/>- Ajout d'effets d'atmosphères aux astres qui n'en avaient pas
            <br/>- Ralentissment du temps dans le système solaire
            <br/>- Amélioration des graphismes dans la comparaison des tailles dans le cosmos
            <br/>- Ajout d'un paramètre permettant d'activer la précision exponentielle (plus la caméra est loin d'un astre, plus son éloignement augmentera vite)
            <br/>- Ajout de UY Scutti dans la présentation des tailles dans le cosmos
            <br/>- Réduction de la charge de calcul CPU des Godrays
            <br/>- Ajout de l'option capture d'écran à toutes les simulations
            <br/>- Correction des erreurs dans le panneau d'informations
            <br/>- Les panneaux d'informations et des paramètres peuvent maintenant être déplacés et redimensionnés
            <br/>- Nouveaux fonds d'écrans
            <br/>- Correction de bugs
            <br/>- Optimisations internes
            <br/>- Améliorations mineures
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>4</u></p>
            <p>- Nouvelle interface de navigation des planètes
            <br/>- Ajout du paramètre FXAA pour l'antialiasing (anticrénelage)
            <br/>- Changement de la texture du soleil dans certaines simulations pour plus de réalisme
            <br/>- Changement des nuages de la Terre et de l'ancienne Mars
            <br/>- Ajout de nuages de gaz et de nébuleuse dans la Galaxie
            <br/>- Supression des effets d'athmosphères par surlignage
            <br/>- Supression de la comète dans le système solaire
            <br/>- Le panneau d'information est maintenant affiché dès le début
            <br/>- Ajout de la navigation libre avec espace et shift
            <br/>- Ajout d'un message pour le contrôle de la caméra en mode libre
            <br/>- Ajout d'une texture spéculaire à l'ancienne Mars et à la Terre dans le système solaire
            <br/>- Amélioration changements et ajouts de fonds d'écrans
            <br/>- Optimisations diverses et variées
            <br/>- Correction de bugs</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>3</u></p>
            <p>- Ajout d'une simulation de Saturne et de ses satellites
            <br/>- Ajout d'une simulation de Mars il y a 4 milliards d'années
            <br/>- Ajout des descriptions manquantes pour tous les satellites
            <br/>- Ajout d'un bouton twitter vers le compte du projet
            <br/>- Ajout du panneau d'information dans la simulation des échelles stellaires
            <br/>- Ajout de la vue planétaire 3D dans la simulation des échelles stellaires
            <br/>- Amélioration de la texture de la Terre dans les simulations
            <br/>- Amélioration visuelle de la simulation d'HyperEspace
            <br/>- Supression des infos de pied de page dans les simulations (sauf le copyright)
            <br/>- Amélioration de l'interface sur les grands et petits écrans
            <br/>- Ajout de nouveaux fonds d'écran</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>2</u></p>
            <p>- Ajout des satellites de Saturne suivants : Mimas, Encelade, Téthys, Dioné, Rhéa et Japet
            <br/>- Ajout des satellites de Uranus suivants : Ariel, Umbriel, Titania, Obéron et Miranda
            <br/>- Ajout des satellites de Neptune suivants : Triton et Protée
            <br/>- La vue libre se déplace de planète à planète grâce au menu des astres
            <br/>- Ajout de nouveaux fonds d'écran
            <br/>- Changement de la miniature des échelles de l'univers
            <br/>- Ajout d'un environnement plus réaliste dans la simulation de voyage hyperspatial
            <br/>- Amélioration des systèmes de la page de contact
            <br/>- Améliorations mineures
            <br/>- Correction de bugs
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>1</u></p>
            <p>- Ajout d'un bandeau lors du chargement d'une simulation
            <br/>- Refonte de la simulation de Galaxie
            <br/>- Ajout de nouveaux fond d'écran
            <br/>- Ajout d'une nouvelle simulation : Voyage HyperSpatial
            <br/>- Ajout de Ganymède, Callisto et Europe
            <br/>- Changement de la texture de saturne
            <br/>- Correction des problèmes de compatibilité
            <br/>- Correction de bugs
            <br/>- Améliorations mineures
            </p>
        </div>
        <hr/>
        <div>
            <p><u>Version 2<span class="point">.</span>0</u></p>
            <p>- Refonte totale de l'interface
            <br/>- Ajout de 3 Nouvelles simulations : Galaxie, Echelles Stellaires et Terre et Lune
            <br/>- Ajout d'un panneau d'information à la place des controles pour le système solaire
            <br/>- Ajout d'une véritable couche de nuages pour la Terre
            <br/>- Changement des textures de la Terre
            <br/>- Refonte totale des ceintures d'astéroides
            <br/>- Refonte des calculs d'orbites pour un résulat ultra-précis
            <br/>- Refonte du Soleil et augmentation de sa taille, proportionnellement aux astres
            <br/>- Ajout des anneaux d'Uranus
            <br/>- Ajout de fonds d'écrans aléatoires pour la page d'accueil
            <br/>- Les simulations sont maintenant sur des pages éparées pour optimiser la consommation de bande passante
            <br/>- Améliorations des dépalcements de planète à planète
            <br/>- Ajout d'une vue planétaire en 3D
            <br/>- Ajout d'un paramètre pour régler la sensibilité en mode libre
            <br/>- Améliorations de la Terre
            <br/>- Amélioration de l'ergonomie sur smartphone
            <br/>- Correction massive de bugs
            <br/>- Améliorations gloables internes</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>6</u></p>
            <p>- Mise à l'échelle des durées dans le système solaire
            <br/>- Augementation de la taille du système solaire
            <br/>- Ajout d'un nouveau soleil pour la version haute qualité
            <br/>- Ajout d'un système de date réaliste (des nouveautées sont à venir à son sujet)
            <br/>- Amélioration du menu pour les mobiles
            <br/>- Ajout d'un nouveau système de collisions plus réaliste
            <br/>- Améliorations de certaines textures
            <br/>- Correction de bugs
            <br/>- Stabilisations globales
            <br/>- Optimisations internes</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>5</u></p>
            <p>- Nouvelles textures
            <br/>- Remise à l'échelle du système
            <br/>- Ajout d'athmosphères pour Venus, la Terre, et Mars
            <br/>- Ajout de la ceinture de Kuiper
            <br/>- Ajout de transitions lors d'un changment de planète
            <br/>- Ajout d'un paramètre pour régler la vitesse de transition
            <br/>- Ceinture d'Astéroides plus réaliste
            <br/>- Réorganisation des temps de rotations des planètes
            <br/>- Ajout de la comète en qualité basse
            <br/>- Ajout d'une option pour afficher les orbites des planètes
            <br/>- Ajout d'un système de collision de base (un meilleur sera utilisé bientôt)
            <br/>- Meilleur écran de chargement
            <br/>- Changements dans la page de contact
            <br/>- Optimisations internes
            <br/>- Correction de bugs</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>4</u></p>
            <p>- Ajout de la vue libre en 3D anagyphe
            <br />- Ajout d'un paramètre afin d'ajuster la vitesse du temps
            <br />- Ajout d'une page de contact
            <br />- Adaptation pour le mobile
            <br />- Nouvelles textures pour certaines planètes
            <br />- Amélioration des performances sur la version haute qualité
            <br />- Optimisations internes
            <br />- Correction de bugs</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>3</u></p>
            <p>- Ajout de nouveaux anneaux pour Saturne
            <br />- Nouvelles textures pour la version basse qualité afin de la rendre plus rapide
            <br />- La ceinture d'astéroides n'est plus plate
            <br />- Ajout d'un mode plein écran avec l'interface
            <br />- Ajout d'un paramètre pour changer la vitesse en mode libre
            <br />- Ajout de textures de meilleur qualité sur la version haute qualité
            <br />- Correction de bugs
            <br />- Optimisations variées</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>2</u></p>
            <p>- Ajout du plein écran
            <br />- Ajout d'un bouton pour quitter
            <br />- Ajout d'une liste des astres pour une meilleur érgonomie
            <br />- Nouvelles textures pour Mercure, Venus, La Terre, Mars et Jupiter
            <br />- Ajout d'une comète
            <br />- Ajout d'options paramétrables telles que la précision de la roulette de la souris ou la taille de soleil
            <br />- Optimisations diverses et variées pour augmenter la vitesse et la fluidité
            <br />- Correction de bugs</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>1</u></p>
            <p>- Ajout d'une version allégée pour les ordinateurs les moins puissants
            <br />- Grande amélioration de la vitesse
            <br />- Correction de bugs</p>
        </div>
        <hr/>
        <div>
            <p><u>Version 1<span class="point">.</span>0</u></p>
            <p>- Lancement de Solaris</p>
        </div>
    </div>

    <a href="news-en.php"><img class="flag" src="data/menu/english.jpg"/></a>

    <?php include("includes/fr/footer.html"); ?>

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