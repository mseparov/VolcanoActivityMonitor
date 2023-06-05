FROM openjdk:18 as builder

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM openjdk:18

WORKDIR /app

COPY --from=builder /app/target/volcano-backend.jar .

EXPOSE 8080

CMD ["java", "-jar", "volcano-backend.jar"]
