# Flock

Flock by Pollygot - An API on top of multiple notification services to overcome repetitive building and platform idiosyncrasies.

## Docs

Full documentation found at https://dev.pollygot.com

## Developing

Primarily so that we can use async/await, this repo uses Typescript to compile `.ts` files from `./src` to `./nodes`.

To create a new node, create the following:

```
./src/new-noded-name.ts
./nodes/new-noded-name.html
```

Then you can run `npm run watch` to compile the Typescript files. Don't update any JS files within the `./nodes` directory as they will be overwritten.

## Contributing

https://github.com/pollygot/flock

