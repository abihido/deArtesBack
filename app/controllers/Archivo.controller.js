

const fs = require('fs');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './app/config/token.json';

let oAuth2Client;


exports.getToken=(req,res)=>{

    // Load client secrets from a local file.
fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client);
      oAuth2Client.setCredentials(JSON.parse(token));
      res.send("ya estaba");
    });
    }
    
    /**
    * Get and store new token after prompting for user authorization, and then
    * execute the given callback with the authorized OAuth2 client.
    * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
    * @param {getEventsCallback} callback The callback for the authorized client.
    */
    function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    res.send(authUrl);
    };

}

exports.callback = (req,res)=>{

    code = req.query.code;
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err){
            res.status(500).send(err);
            return console.error(err);
          }      
          return console.log('Token stored to', TOKEN_PATH);
        });
        res.send("ok");
      });
       
}
exports.list=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      listFiles(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      }, (err, res2) => {
        if (err) { console.log('The API returned an error: ' + err);return res.error(error);} 
        const files = res2.data.files;
        let sendFile = [];
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            sendFile.push({name:file.name,id:file.id,padres:file.parents});
            console.log(`${file.name} (${file.id})`);
          });
          res.send(sendFile);
        } else {
          console.log('No files found.');
          res.send("vacio");
        }
      });
      }
}
exports.listVideos=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      listFiles(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        q:"'1DgXbZm9NWreEFGvHBRR4Y_EKYxWW8-bf' in parents",
        fields: 'nextPageToken, files(id, name)',
      }, (err, res2) => {
        if (err) { console.log('The API returned an error: ' + err);return res.error(error);} 
        const files = res2.data.files;
        let sendFile = [];
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            sendFile.push({name:file.name,id:file.id,padres:file.parents});
            console.log(`${file.name} (${file.id})`);
          });
          res.send(sendFile);
        } else {
          console.log('No files found.');
          res.send("vacio");
        }
      });
      }
}
exports.listClases=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      listFiles(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        q:"'17CmTzk3Z1aKwzSGz05cqKvUGxw9fUCdy' in parents",
        fields: 'nextPageToken, files(id, name)',
      }, (err, res2) => {
        if (err) { console.log('The API returned an error: ' + err);return res.error(error);} 
        const files = res2.data.files;
        let sendFile = [];
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            sendFile.push({name:file.name,id:file.id,padres:file.parents});
            console.log(`${file.name} (${file.id})`);
          });
          res.send(sendFile);
        } else {
          console.log('No files found.');
          res.send("vacio");
        }
      });
      }
}
exports.listAudios=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      listFiles(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        q:"'13gNz4EL60lEPBE0YZAsjFPmkwSDqXiZB' in parents",
        fields: 'nextPageToken, files(id, name)',
      }, (err, res2) => {
        if (err) { console.log('The API returned an error: ' + err);return res.error(error);} 
        const files = res2.data.files;
        let sendFile = [];
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            sendFile.push({name:file.name,id:file.id,padres:file.parents});
            console.log(`${file.name} (${file.id})`);
          });
          res.send(sendFile);
        } else {
          console.log('No files found.');
          res.send("vacio");
        }
      });
      }
}
exports.listDocumentos=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      listFiles(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 10,
        q:"'10ULdxaxrFnFON6yaaLc2IQUJDz2FCdZh' in parents",
        fields: 'nextPageToken, files(id, name)',
      }, (err, res2) => {
        if (err) { console.log('The API returned an error: ' + err);return res.error(error);} 
        const files = res2.data.files;
        let sendFile = [];
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            sendFile.push({name:file.name,id:file.id,padres:file.parents});
            console.log(`${file.name} (${file.id})`);
          });
          res.send(sendFile);
        } else {
          console.log('No files found.');
          res.send("vacio");
        }
      });
      }
}
exports.downloadFile=(req,res)=>{
  fs.readFile('./app/config/credentials.json', (err, content) => {
    if (err)
     {  
       return console.log('Error loading client secret file:', err)};
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    });
    
    /**
    * Create an OAuth2 client with the given credentials, and then execute the
    * given callback function.
    * @param {Object} credentials The authorization client credentials.
    * @param {function} callback The callback to call with the authorized client.
    */
    function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
     oAuth2ClientL = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return res.send("error");
      oAuth2ClientL.setCredentials(JSON.parse(token));
      download(oAuth2ClientL)
    });
    }
    /**
    * Lists the names and IDs of up to 10 files.
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
     function download(auth) {
      const drive = google.drive({version: 'v3', auth});
      var dest = fs.createWriteStream('./temp/'+req.query.name);
      drive.files.get({
          fileId: req.query.file,
          alt: 'media'
        },
        { responseType: 'stream' })
       .then((driveResponse) => {
          driveResponse.data
            .on('end', () => {
              console.log('\nDone downloading file.');
              const file = './temp/'+req.query.name; // file path from where node.js will send file to the requested user
              res.download(file); // Set disposition and send it.
            })
            .on('error', (err) => {
              console.error('Error downloading file.');
            })
            .pipe(dest);
        })
      .catch((err) => console.log(err));
    }
}
