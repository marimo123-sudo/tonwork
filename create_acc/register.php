<?php

// Подключение к базе данных
$servername = "MySQL-8.2";
$username = "creator";
$password = "Eligoz46";
$dbname = "freelance";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение и обработка введенного имени и почты
$name = $conn->real_escape_string(htmlspecialchars($_POST["username"]));
$mail = $conn->real_escape_string(htmlspecialchars($_POST["email"]));

// Подготовка SQL-запроса для проверки существующего пользователя
$sqlCheck = "SELECT name FROM users WHERE name=?";
if ($stmtCheck = $conn->prepare($sqlCheck)) {
    $stmtCheck->bind_param("s", $name);
    $stmtCheck->execute();
    $stmtCheck->store_result();

    if ($stmtCheck->num_rows > 0) {
        $_SESSION['error_message'] = "Имя $name уже используется другим пользователем";
        header("Location: create_acc.html");
    } else {
        // Подготовка SQL-запроса для вставки данных
        $sql = "INSERT INTO users (name, mail) VALUES (?, ?)";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ss", $name, $mail);
            if ($stmt->execute()) {
                header("Location: ../hom/homik.html");
            } else {
                $_SESSION['error_message'] = "Error: " . $stmt->error;
                header("Location: create_acc.html");
            }
            $stmt->close();
        } else {
            $_SESSION['error_message'] = "Error preparing statement: " . $conn->error;
            header("Location: create_acc.html");
        }
    }

    $stmtCheck->close();
} else {
    $_SESSION['error_message'] = "Error preparing check statement: " . $conn->error;
    header("Location: create_acc.html");
}

// Закрытие соединения
$conn->close();
?>
