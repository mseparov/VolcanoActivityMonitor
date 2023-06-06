# VolcanoActivityMonitor
Fullstack project for an assignment.

# Frontend
Using Angular for the GUI.
Using Leaflet as the library for the Volcano map.
Using ComponentFactoryResolver and Injector to inject component into leaflet popup.
# Backend
Using Java SpringBoot for the backend.
Decided to use the java.net.http.HttpRequest libarary instead of RestTemplate because of MimeType issue.
Using regex for parsing for simplicity
Made the PostgresManager a singleton because I want only one instance of the connection to the database
Using liquibase to create the initial tables in the DB.
# Devops
Using PostgreSQL as the Database.


# START
docker-compose up --build