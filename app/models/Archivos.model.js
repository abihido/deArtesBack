



exports.init= result=>{


};

Archivo.list=(code,err,res)=>{

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log('Token stored to', TOKEN_PATH);
    });
    callback(oAuth2Client);
  });



/**
* Lists the names and IDs of up to 10 files.
* @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/
function listFiles(auth) {
const drive = google.drive({version: 'v3', auth});
drive.files.list({
  pageSize: 10,
  fields: 'nextPageToken, files(id, name)',
}, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const files = res.data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No files found.');
  }
});
}

}


