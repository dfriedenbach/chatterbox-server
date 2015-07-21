var data = {
    results: [
      {"createdAt":"2015-07-20T23:45:18.703Z","objectId":"0VEEVx1P3Q","roomname":"secret","text":"Another ANOTHE another message  .","updatedAt":"2015-07-20T23:45:18.703Z","username":"Wut"},
      {"createdAt":"2015-07-20T23:44:58.411Z","objectId":"njxIH5Uabc","roomname":"lobby","text":"wohooo","updatedAt":"2015-07-20T23:44:58.411Z","username":"test"},
      {"createdAt":"2015-07-20T23:42:19.319Z","objectId":"DVyVtGQyx6","roomname":"lobby","text":"kdkdkdkd","updatedAt":"2015-07-20T23:42:19.319Z","username":"tester"},
      {"createdAt":"2015-07-20T23:41:07.917Z","objectId":"HuKK3zlgpi","roomname":"lobby","text":"gdsafg","updatedAt":"2015-07-20T23:41:07.917Z","username":"tester"},
      {"createdAt":"2015-07-20T23:36:55.005Z","objectId":"aROvGJpFnL","roomname":"lobby","text":"hi","updatedAt":"2015-07-20T23:36:55.005Z","username":"ggg"},
      {"createdAt":"2015-07-20T23:34:46.591Z","objectId":"SOg2Q5Pggj","roomname":"lobby","text":"IS ANYBODY STILL ON HERE","updatedAt":"2015-07-20T23:34:46.591Z","username":"Rick%20Morty"}
    ] // implement max 100 messasges
  };

var generateRandomId = function () {
  var letters = [
    1,2,3,4,5,6,7,8,9,0,
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  for (var i = 0, id = ""; i < 10; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  return id;
};

var requestHandler = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  console.log(data.results.length);
  console.log("Serving request type " + request.method + " for url " + request.url);

  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);

  if (request.url.slice(0, 17) === '/classes/messages') {
    if (request.method === 'POST') { // add message to results
      var body = "";
      request.on('data', function (message) {
        var message = JSON.parse(message);
        message.createdAt = new Date().toISOString();
        message.objectId = generateRandomId();
        data.results.push(message);
      });
      response.end('{"status":200}');
    } else if (request.method === 'GET') { // send data
      response.end(JSON.stringify(data), 'utf8', function () { console.log('Messages Sent'); });
    } else {
      response.end('Hello Werld');
    }
  } else {
    response.end('Hello Werld');
  }
};

var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept, data",
  "Access-Control-Max-Age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

