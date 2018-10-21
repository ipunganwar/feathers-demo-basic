# feathers-demo-basic
http-server public/

node app.js

hit localhost:3030/messages
hit hit localhost:3030/messages/1

create new message cmdline
curl 'http://localhost:3030/messages/' -H 'Content-Type: application/json' --data-binary '{ "text": "Hello from the command line!" }'

delete cmdline
curl -X "DELETE" http://localhost:3030/messages/1

# APP_PAGINATION.JS
for testing PAGINATION