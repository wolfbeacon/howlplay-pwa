import {DEFAULT_QUIZ_LINK} from "./configurations.example";

const mainserver_url = DEFAULT_QUIZ_LINK;

function send(method, url, data, callback){
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          if (xhr.status !== 200) callback("[" + xhr.status + "] " + xhr.responseText, null);
          else callback(null, JSON.parse(xhr.responseText));
      };
      xhr.open(method, url, true);
      if (!data) xhr.send();
      else{
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
      }
}

export function joinGame(code, callback) {
  send('POST', mainserver_url, {code : code}, callback);
  // fetch(mainserver_url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({code: code})
  //
  // })
  // .then(response => {
  //   if (response.status !== 200) {console.log('Error'); return callback('Error', null);}
  //   return response.json();
  // })
  // .then(data => {
  //   callback(null, data);
  // })
}
