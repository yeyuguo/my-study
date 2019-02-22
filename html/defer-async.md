
参考文章   
[详解defer和async的原理及应用](https://blog.csdn.net/liuhe688/article/details/51247484)
[描述的非常准确的文章](https://zhuanlan.zhihu.com/p/29418126)
[英文图解 defer 和 async](https://bitsofco.de/async-vs-defer/)  

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>验证 script defer async 例子</title>
</head>

<body>
    <p> 正常</p>
    <script async>
        alert('async')
    </script>
    <p>async 后</p>

    <script defer>
        alert('defer')
    </script>
    <p>defer 后</p>

    <p>defer script 在 “正常“之前下载了资源，等 html 解析完后才加载的。</p>
</body>

</html>

```

### 合集
![images](https://img-blog.csdn.net/20160503104416135)

### 普通加载
![images](https://bitsofco.de/content/images/2017/02/Normal-Execution.png)

### async  
![images](https://bitsofco.de/content/images/2017/02/Async-Execution.png)

### defer
![images](https://bitsofco.de/content/images/2017/02/Defer-Execution.png)