# Meerkat

## Deployment instructions:
- Backend server was deployed through Heroku using this guide: https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku

- Frontend application was also deployed through Heroku: https://blog.heroku.com/deploying-react-with-zero-configuration

- Media server was deployed on Google Cloud Platform: https://antmedia.io/how-to-install-ams-on-google-cloud/

- Database was set up with MongoDB Atlas on the Azure cloud, though it's also possible to do so on AWS and GCP: https://www.mongodb.com/cloud

## Notes:
- Changing the URI for the backend/frontend/media servers require modifying the frontend source code to ensure
    fetch requests are properly made. These spots will be marked as comments in the code. 

- Changing the database URI requires changing the URI in meerkat-backend/resources/application.properties to the correct
    database connection string

- Make sure to whitelist the backend server IP in the database network settings, else the backend will not
    be authorized to read/write data from the database and receive an error

- Ensure that the backend websocket configuration allows requests from the frontend uri (setAllowedOrigins) in 
    WebSocketConfig.java