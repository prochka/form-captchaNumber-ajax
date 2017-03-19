<?php

$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);


if($name && $email){
	
	if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
	{
		echo "email некорректный - поправьте!";
	}
	else{
		echo "Ваше письмо отправлено!";
		$message_to_myemail = "Здравствуйте! 
		Вашей контактной формой было отправлено сообщение! 
		E-mail: $email 
		Текст сообщения: $message 
		Конец";
		/* Отправляем сообщение, используя mail() функцию */
		$from  = "From: $yourname <$email> \r\n Reply-To: $email \r\n"; 
		$result = mail($myemail, $from, $message_to_myemail,'Content-type:text/plain;charset=utf-8');
	}
}
else {
	echo "Вы заполнили не все поля!";  
}

?>

















