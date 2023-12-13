import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 8080;

app.use(morgan("combined"))

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/dashboard', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    let authUser = users.find(user => user.email === email && user.password === password);
    if (!authUser) {
        return res.redirect('/');
    } else {
        return res.render('dashboard.ejs', {
            authUsername: authUser.username,
            authEmail: authUser.email
    }) && res.redirect('/dashboard');
}})

app.post('/register', (req, res) => {

    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    users.push(newUser)

    res.render('registerSuccess.ejs')
})

app.listen(port, () => {
    console.log(`Listening on port ::${port}...`);
})

let users = [
    {
        username: "Tope",
        email: "tope@test.com",
        password: "iloveadeola"
    },
];