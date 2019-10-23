# julab


## Development Requirments


### System

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com)
- [PostgreSQL](https://www.postgresql.org)


### npm

- [nodemon](https://nodemon.io)


### PostgreSQL conf

- **/etc/postgresql/11/main/pg_hba.conf** *(replace line)*

  >~~`local all postgres peer map`~~

  >`local all postgres peer map=<mapname>`

- **/etc/postgresql/11/main/pg_ident.conf** *(append lines)*

  >`<mapname> postgres postgres`

  >`<mapname> <username> postgres`

### Commands

- `nodemon --inspect julab.js`
