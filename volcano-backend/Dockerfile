FROM openjdk:18 as builder

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw

# Add the sed command to remove carriage return characters from mvnw script
RUN sed -i 's/\r$//' mvnw

RUN ./mvnw package -DskipTests

FROM openjdk:18

WORKDIR /app

COPY --from=builder /app/target/*.jar .

EXPOSE 8080

CMD ["java", "-jar", "volcano-backend-0.0.1-SNAPSHOT.jar"]