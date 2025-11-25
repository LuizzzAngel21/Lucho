# syntax=docker/dockerfile:1

ARG JAVA_VERSION=17

FROM eclipse-temurin:${JAVA_VERSION}-jdk-alpine AS build
WORKDIR /workspace

# Maven wrapper needs unzip to expand the downloaded distribution
RUN apk add --no-cache unzip

COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw

COPY src ./src

RUN ./mvnw -B -DskipTests clean package \
	&& JAR_PATH=$(find target -maxdepth 1 -type f -name '*.jar' ! -name '*original*' | head -n 1) \
	&& test -n "$JAR_PATH" \
	&& mv "$JAR_PATH" target/app.jar

FROM eclipse-temurin:${JAVA_VERSION}-jre-alpine AS runtime
WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=prod

COPY --from=build /workspace/target/app.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
