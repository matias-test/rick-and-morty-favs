# [Rick And Morty FAVs](https://github.com/matias-test/rick-and-morty-favs)

Simple express/React/Mongo/Typescript application using [Rick and Morty API](https://rickandmortyapi.com/).

## Notes

### Non standard libraries used:

* [rickmortyapi](https://www.npmjs.com/package/rickmortyapi): Used to simplify the calls to the api, and to have the proper interfaces already defined.
* [bcryptjs](https://www.npmjs.com/package/bcryptjs): Used to hash and compare the user passwords.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens.

### Out of the ordinary configuraion

* In tsconfig.json `skipLibCheck` has been set to `true` to fix a types conflict between mongo and mongoose.


## Usage

### Server
1. Replace `nodemon.json` env variables with local values, if needed.
2. Start Server:
```
/server$ npm start
```

### Client

1. Create an `.env` or `.env.local` file from `.env.template`.
2. Replace with local values, if necesary.
3. Start Client
```
/client$ npm start
```

## Author

Developed by Matías Niklison &lt;matias.niklison@gmail.com&gt;
