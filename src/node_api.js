import {DEFAULT_QUIZ_CODE_LINK} from "./configurations";

const mainserver_url = DEFAULT_QUIZ_CODE_LINK;

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
}
