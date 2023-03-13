const http = require('http');


const formTag = `
<form method="GET" action="/login">
<input type="text" name="id"> <br>
<input type="password" name="password" minlength="8"> <br>
<input type="submit">
</form>
`;


function greet(fromSubmitString) {
return `<h1>${fromSubmitString}로 로그인 됐습니다.</h1>`;
}


function firstPage(data) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}


const server = http.createServer(function(request, response){
  // console.log(request.method)
  // console.log(request.url)
// 최초접속
if(request.method === 'GET' && request.url === '/') {
response.writeHead(200, {'Content-Type': 'text/html'});
console.log(request.url)
let page = firstPage(formTag);
response.write(page);
response.end();
}


// 무언가
if(request.method === 'GET' && request.url.startsWith('/login')) {
// const name = request.url.split('&').join('=').split('=');
const name = decodeURI(request.url).split('&').join('=').split('=')[1];
console.log(name);
console.log(name[1]);
console.log(name[3]);
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(greet(name))
response.write(page);

response.end();
}
}); //server 끝


// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});