import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 8080;

app.use(express.static("public"))


app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/dashboard', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    let authUser = users.find(user => user.email === email && user.password === password);
    if (!authUser) {
        let errorMessage = `<p style="color: red; text-align: center;"><em>Email or password incorrect.</em></p>`
        return [
            res.render('index.ejs',{ error: errorMessage }),
            res.redirect('/'),            
        ];
    } else {
        return res.render('dashboard.ejs', {
            authUsername: authUser.username,
            authEmail: authUser.email
    }); 
}})

app.post('/register', (req, res) => {

    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === newUser.username || users[i].email === newUser.email) {
            return res.render('register.ejs', {
                message: `<p style="color: red; text-align: center;"><em>User already exist.</em></p>`
            });
        } else {
            return [
                users.push(newUser),
                res.render('registerSuccess.ejs'),
                console.log("Registered Users: ", users),
                console.log("Number of Registered Users: ", users.length)
            ];
        }
    }
})

app.listen(port, () => {
    console.log(`Listening on port ::${port}...`);
})

let users = [
    {
        username: "Tope",
        email: "tope@test.com",
        password: "iloveadeola"
    }
];