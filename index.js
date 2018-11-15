const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const WaiterRoutes = require('./waiter.js');

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;

if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/waiters';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let app = express();

app.use(session({
    secret: 'This is a secret message',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// let waiterFactory = WaiterFactory(pool);
// let waiterRoutes = WaiterRoutes(waiterFactory);

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'isChecked': function () {
            if (this.checked) {
                return 'checked';
            }
        }
    }
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



app.get('/', async function (req, res) {
    // let Waiter = await pool.query('select id from here username=$1', [username]);
    // if (Waiter.rowCount === 0) {
    //     await pool.query('insert into staff (username) values ($1)', [username]);
    //     Waiter = await pool.query('select id from staff where username=$1', [username]);
    // }
    res.render('index', {
      
    });
  });

// app.get('/', waiterRoutes);
// app.get('/waiters/:username', waiterRoutes.select);
// app.post('/waiters/:username', waiterRoutes.update);
// app.get('/days', waiterRoutes.admin);
// app.post('/days', waiterRoutes.adminReset);

let PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
    console.log('WaiterApp is running on port: ', PORT);
});