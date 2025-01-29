const { google } = require('googleapis');


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
   console.error("Missing Google client ID or secret");
}


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage' // Redirect URL
);

module.exports = oauth2Client;