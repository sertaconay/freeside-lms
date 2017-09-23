const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
// const { catchErrors } = require('./helpers/errorHandlers');

require('./helpers/passport')(passport);
require('dotenv').config({ path: '.env' });


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('cannot run this app');
  process.exit();
}

async function mongoConnect() {
  await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_LINK}/${process.env.DB_NAME}`, { useMongoClient: true });
}
mongoose.Promise = bluebird;
mongoConnect().catch(({ stack }) => console.error(stack, 'error'));

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(morgan('dev'));

    server.use(expressValidator());

    server.use(passport.initialize());

    server.post('/login',
      authController.authenticate,
    );

    server.post('/register',
      userController.register,
    );

    server.get('/dashboard', passport.authenticate('jwt', { session: false }));

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`express running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
