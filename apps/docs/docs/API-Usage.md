# Usage of Ansel API

Once the API server is up and running, [using the setup steps](/docs/Server-Usage), you can begin calling it and receiving images/data.

## Endpoints

Below is a quick overview of the available endpoints and the HTTP method associated with each type of request that's available (note that all endpoints are prefixed with `/api/v1`):

:::info

The ID of an asset is simply an integer where the first asset in a folder has an ID of `0` and the next asset would be `1`. For example, if we uploaded a gif to folder `test` and it was the first asset, it would have a name of `/test/0.gif` where 0 is the ID and test is the folder name.

:::

- `/list`
  - **GET** — Get a list of top-level folders in the bucket.
- `/:folderName`
  - **GET** — Get a random item from the folder with the given `:folderName`.
    - The API will get the amount of items in the folder, then pick one at random to return.
  - **POST** — Upload a new asset under `:folderName` and assign it the next ID in the sequence.
- `/:folderName/:id`
  - **GET** — Gets a specific item from the folder with the given `:folderName` that has the same `:id`.
  - **POST** — Upload a new asset under the specific `:folderName` with the given `:id`.
  - **PUT** — Update an existing asset under `:folderName` with an ID that matches `:id`.
  - **DELETE** — Delete an existing asset under `:folderName` with an ID that matches `:id`.

## Sample Usage

First things first ports and URLs:

- If you are running the server as is without a reverse proxy then you'll need to append the port number to your URLs.
- If you have a custom apiPrefix be sure to keep that in mind. Otherwise, the default is `/api/v1`.

Once you have the above info, you're able to begin making requests! The following samples utilize the [HTTPie CLI utility][2]:

### List Folders

Since images are categorized in folders, the `/list` endpoint will return an object containing a count of the folders and an array of those folders in the s3 bucket:

```bash
❯ http GET localhost:8080/api/v1/list --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 460
...

{
    "count": 54,
    "data": [
        "alcha",
        ...
        "whack"
    ]
}
```

### Get Images

There are two ways to retrieve images from a given folder: Randomly or Index-based

#### Random Retrieval

If you don't care which image is returned, hit the `/get` endpoint with the name of the folder:

```bash
❯ http GET localhost:8080/api/v1/get/alcha --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 42
...

https://ansel.4lch4.tech/alcha/alcha-6.png
```

#### Index Retrieval

My personal instance of Ansel has images indexed by filename and each filename has the index number in it. Therefore, retrieving specific images is easy once you know the index/number of the file:

```bash
❯ http GET localhost:8080/api/v1/get/alcha/2 --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 42
...

https://ansel.4lch4.tech/alcha/alcha-2.gif
```

### Healthcheck Endpoints

Since Ansel is designed to be run within Kubernetes it has healthcheck endpoints available by default.

#### Liveness

```bash
❯ http GET localhost:8080/api/v1/health/liveness --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
...

OK
```

#### Readiness

```bash
❯ http GET localhost:8080/api/v1/health/readiness --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
...

OK
```
