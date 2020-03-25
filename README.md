# webexteams-electron

## Why?
Webex teams uses sessionStorage to store the user's session token, which means that each time you close the tab, your session will end, and you have to login again. By using this electron app, you will be able to load your session previously used, saving you the trouble of having to login each time.

## Steps to set up your Webex Teams session:
- Create a file called token in the same directory as main.js
- In a logged in Webex browser window, run the following command in the javascript console:
`copy(sessionStorage.getItem('web-client-internal-bounded'))`
- Create a file named `token` in the same directory as main.js. Paste the contents in `token` file. This is your session token for webex.
- Run the following commands:

`npm install`

`npm start`

- Electron will launch and it should take a few seconds for the session token to be used to redirect you to a logged in session on teams. If it does not redirect you, try refreshing the Electron app window.


## Disclaimer:
Use this at your own risk!

Webex Teams session tokens will expire, so if it does not log you in after a few tries, you will have to login manually and obtain a new session token, and update the `token` file with it.