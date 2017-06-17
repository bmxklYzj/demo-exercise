<?php

// php连接mysql进行数据库操作

$db = new mysqli('localhost', 'root', '', 'test_hello');
if ($db->connect_errno) {
    echo 'database connect error';
    die();
}

$sql = 'select * from customers';
$result = $db->query($sql);
$count = $result->num_rows; // 查询返回的总个数

$output = 
'<table>
    <tr>
        <th>customerid</th>
        <th>name</th>
        <th>address</th>
        <th>city</th>
    </tr>
';
while ($row = $result->fetch_assoc()) {
    $output = $output.'
        <tr>
            <td>'.$row["customerid"].'</td>
            <td>'.$row["name"].'</td>
            <td>'.$row["address"].'</td>
            <td>'.$row["city"].'</td>
        </tr>
    ';
}

$output = $output.'</table>';
echo $output;

$result->free();
$db->close();

?>