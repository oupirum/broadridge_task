### Test task for Broadridge

#### How to run:

```
npm i
npm run start
```

It will start development server and application will be available at localhost:3000.

Press Ctrl+C to stop.

#### How to run in Docker container:

```
docker build -t broadridge_task ./
docker run --rm -i -t --network=host broadridge_task
```

It also will start development server and application will be available at localhost:3000

Press Ctrl+C to stop.
