FROM adoptopenjdk:11-jdk-hotspot as builder

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM adoptopenjdk:11-jre-hotspot

WORKDIR /app

COPY --from=builder /app/target/volcano-backend.jar .

EXPOSE 8080

CMD ["java", "-jar", "volcano-backend.jar"]
