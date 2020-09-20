<!DOCTYPE HTML>

<html lang="en">

<head>
        <?php echo("<style>body{background:url('bg/background".rand(1,count(glob('bg/*.*'))).".png');}</style>");?>
        <title>Feedback</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <link rel="icon" type="image/x-icon" href="icon.ico" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    </head>
<?php
    if(!empty($_POST["adresse"]) && !empty($_POST["msg"])) {
        if (preg_match('#^[\w.-]+@[\w.-]+\.[a-z]{2,6}$#i', $_POST["adresse"])) {
            $_POST["adresse"]=trim(stripslashes($_POST["adresse"]));
            $msg = $_POST["msg"];
            $_POST["message"]='<p>Mail : '.$_POST["adresse"].'<br/><br/>Message : '.$msg.'</p>' ;

            $entete = "From: ".$_POST["adresse"]." <".$_POST["adresse"].">\n";
            $entete .= "MIME-Version: 1.0\n";
            $entete .= "Content-type: text/html; charset= iso-8859-1\n";

            if (@mail("barth@paleologue.fr",'Solaris Feedback',$_POST["message"],$entete)){
                echo("<div class='success'><strong>Success!</strong> The message have been send successfuly!</div>");
            } else {
                echo("<div class='alert'><strong>Warning!</strong> Something went wrong, retry later</div>");
            }
        } else echo("<div class='alert'><strong>Warning!</strong> Incorrect mail adress</div>");
    } else echo("<div class='alert'><strong>Warning!</strong> You have to fill in the fields</div>");

?>
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
        <script>setTimeout(()=>$(".alert,.success").fadeOut(1500),3000);</script>

</body>

</html>