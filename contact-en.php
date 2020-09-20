<!DOCTYPE HTML>

<html lang="en">

    <head>
        <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
        <title>Feedback</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/x-icon" href="icon.ico" />
    </head>

    <body>
        <div id="home">
            <p><a href="en.php?v=true">Home</a></p>
        </div>
        <a href="contact.php"><img class="flag" src="data/menu/french.png"/></a>
        <h1>Feedback</h1>
        <form method="post" action="envoi-en.php">
            <label>Your mail adress :</label><br />
            <input name="adresse" type="email" placeholder="Write down your mail adress" /><br />
            <label>Your message :</label><br />
            <textarea name="msg" cols="50" rows="10" placeholder="Write down your message"></textarea><br />
            <input type="reset" value="Reset" />
            <input type="submit" value="Submit" />
        </form>
        <link rel="stylesheet" href="css/home.min.css" />
        <link rel="stylesheet" href="css/form.min.css" />
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