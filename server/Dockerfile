FROM maven:3.6.0-jdk-11-slim AS build
WORKDIR /usr/app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn package

FROM openjdk:11-jre-slim-stretch
WORKDIR /usr/app
COPY --from=build /usr/app/target/expenses-server-0.1.jar .
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "expenses-server-0.1.jar"]
