


### querySeletor 返回查询到的第一个元素

### querySelectorAll 返回查询到的元素，返回是一个数组


```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>document.querySelector</title>
</head>

<body>
    <div> querySeletor 返回查询到的第一个元素</div>
    <div> querySelectorAll 返回查询到的元素，返回是一个数组</div>
    <p>获取 P 标签</p>
    <p id="ID">获取 ID 名称</p>
    <p class="CLASS">获取 class 名称</p>
    <script>
        console.log(document.querySelector('p'))
        console.log(document.querySelector('#ID'))
        console.log(document.querySelector('.CLASS'))
        console.log(document.querySelectorAll('#ID'))
    </script>
</body>

</html>
```