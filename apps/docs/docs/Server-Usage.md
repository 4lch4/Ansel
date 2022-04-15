# Usage of Ansel Server

In order to use the Ansel API, you must have a few things already good to go. For example, the S3 bucket which will contain your images should already be setup and an API key to access it generated.

## Quickstart / `start.sh`

In the repo is a script called `start.sh` which will start up a Docker container running the latest version of the Ansel API. The only requirement is that you rename the `settings.sample.json` file to `settings.json` and populate it with the necessary values. You can now run `start.sh` and it'll start the container then begin tailing the logs.

_NOTE: `Ctrl+C` will stop the tailing/following of the logs so you can get your terminal back._

## Setup

First up, you need to provide a few environment variables to the Docker image for it to work correctly. The `start.sh` script shows exactly what parameters are needed, but we'll go over them here:

- `appName` ⸺ `APP_NAME`
  - The display name of the application. `Ansel` by default.
- `version` ⸺ `VERSION`
  - The version of the application.
- `port` ⸺ `PORT`
  - The port to listen on, defaults to `8080`.
- `apiPrefix` ⸺ `API_PREFIX`
  - The prefix of all endpoints, defaults to `/api/v1`.
- `imgBaseUrl` ⸺ `IMG_BASE_URL`
  - The URL to append to the beginning of each image URL.
- `bucketName` ⸺ `BUCKET_NAME`
  - The name of the bucket containing your images.
- `bucketEndpoint` ⸺ `BUCKET_ENDPOINT`
  - The url/endpoint for accessing the s3 API of the given bucket.
- `bucketAccessKeyId` ⸺ `BUCKET_ACCESS_KEY_ID`
  - The access key id for the s3 bucket that contains your images.
- `bucketSecretAccessKey` ⸺ `BUCKET_SECRET_ACCESS_KEY`
  - The secret access key for the s3 bucket that contains your images.

## Start It Up

The easiest way to pass these to the Docker image is to rename the `settings.sample.json` file to `settings.json` and run the `start.sh` script. It will start the Docker container for you using the following command, which we'll break down:

```bash
1  docker run -p $PORT:$PORT -d \
2    -e BUCKET_ENDPOINT=$BUCKET_ENDPOINT \
3    -e BUCKET_ACCESS_KEY_ID=$BUCKET_ACCESS_KEY_ID \
4    -e BUCKET_SECRET_ACCESS_KEY=$BUCKET_SECRET_ACCESS_KEY \
5    -e APP_NAME=$APP_NAME \
6    -e VERSION=$VERSION \
7    -e PORT=$PORT \
8    -e API_PREFIX=$API_PREFIX \
9    -e BUCKET_NAME=$BUCKET_NAME \
10   -e IMG_BASE_URL=$IMG_BASE_URL \
11   --name ansel 4lch4/ansel:latest
```

1. The first line is the docker run command, but with the `-d` and `-p` parameters.
   1. `-d` tells Docker to run the container in daemon mode, so that it can run in the background.
   2. `-p` tells the container the port to assign/forward for the container.
2. Lines 2-10 are assigning environment variables using the values from the `settings.json` file.
3. Line 11 provides the `--name` parameter and then the image with the `author/image-name:version` format.
   1. The `--name ansel` parameter and value tells Docker what to name the container when it's created. This is what you use when running commands such as `docker stop ansel` or `docker logs ansel`.
   2. The `4lch4/ansel:latest` bit specifies the image to run, which in this case, is the latest ansel image published by 4lch4 (me).
