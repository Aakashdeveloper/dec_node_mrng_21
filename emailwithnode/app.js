const sgMail = require('@sendgrid/mail');
const express = require('express')
const app = express()
sgMail.setApiKey('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')

app.get('/',(req,res) => {
    const msg = {
        to: 'ahanda205@gmail.com',
        from: 'ahanda206@hotmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        res.send('Email sent')
    })
    .catch((error) => {
        res.send(error)
    })
})


app.listen(5100,() => {
    console.log("App started on Port 5100")
})