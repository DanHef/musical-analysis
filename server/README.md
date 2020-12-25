# musical-analysis Server

Server requires a MySQL database system with a musical_analysis database.

Also for user management keycloak is required (docker container based on [Keycloak Docker Image](https://hub.docker.com/r/jboss/keycloak/) can be used).

```docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=<your password> quay.io/keycloak/keycloak:12.0.1```

Keycloak API Endpoints:

Login: ```/auth/realms/<realm>/protocol/openid-connect/token```

Get Logged In User Info: ```/auth/realms/<realm>/protocol/openid-connect/userinfo```

Get All Users: ```/auth/admin/realms/<realm>/users```