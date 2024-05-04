const express = require('express');
const nodemailer = require('nodemailer');
const otp_generator = require('otp-generator')
const verificationCodes = new Map();
const Place = require('./placemodel');
const Booking = require('./booking');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const imagedownloader = require('image-downloader');
const app = express();
app.use('/uploads', express.static(__dirname + '/uploads'))
const cors = require('cors');
const cookieparsor = require('cookie-parser');
app.use(cookieparsor());
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(6);
const jwtsecretkey = "asjdsjsjdsdijsijdj2323111"
const mongoose = require('mongoose')
const users = require('./db');
const forgetpassword = require('./forgetpassword')
mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(() => { console.log("connected") }).catch((e) => {
  console.log(e);
})
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/forgetpassword', forgetpassword);

app.post('/Register', async (req, res) => {
  console.log("received")
  const { name, email, password, code } = req.body

  const existingUser = await users.findOne({ email: email });
  if (existingUser) {
    return res.status(500).json({ error: 'User already exists' });
  }
  console.log(verificationCodes)
  const otp = verificationCodes.get(email);
  if (otp === undefined)
    return res.status(500).json({ error: 'timeout or please provide valid credentials' });
  try {
    if (!otp) {
      return res.send({ message: "otp expired" })
    }
    else if (otp.code == code && otp.exptime > Date.now()) {
      const user = await users.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, salt)
      })
      console.log(user);
      return res.send({ message: "otp verified", verifyotp: otp.code })
    }
    else if (otp.code != code) {
      return (
        res.status(500).json({ error: 'invalid otp' })
      )
    }
  } catch (error) {
    console.log(error.message)
    return (
      res.status(500).json({ error: 'Internal server error ' })
    )
  }
})

app.post('/getotp', async (req, res) => {
  const { email } = req.body;
  const existingUser = await users.findOne({ email: email });
  if (existingUser) {
    return res.status(500).json({ error: 'User already exists' });
  }
  const exptime = 180 * 1000;
  const otpvalue = otp_generator.generate(6, { upperCaseAlphabets: true, specialChars: true, digits: true })
  console.log(otpvalue)
  verificationCodes.set(email, { code: otpvalue, exptime: exptime + Date.now() })
  console.log(verificationCodes);
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abc437510@gmail.com',
      pass: 'vytd kpdi pvum pzpq'
    }
  });
  const composemail = {
    from: 'abc437510@gmail.com',
    to: email,
    subject: 'send mail using node',
    html: `<h1>Enter this OTP: ${otpvalue} to register</h1>`
  }


  sender.sendMail(composemail, function (err, info) {
    if (err) {
      console.log(err)
    }
    else
      console.log('mail sent successfully' + info.response)
  })


  const timeID = setTimeout(() => {
    verificationCodes.delete(email)
  }, exptime)


  res.json("ok")
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const doc = await users.findOne({ email: email })
  if (doc) {
    const passok = bcrypt.compareSync(password, doc.password)
    if (passok) {
      jwt.sign({ email: doc.email, id: doc._id }, jwtsecretkey, {}, (err, token) => {
        if (err) throw err;
        else
          res.cookie('token', token, { httpOnly: false });
        res.send(doc)
      })
    }
    else {
      res.status(500).json('pass not ok')
    }
  }
  else {
    res.status(500).json('not found')
  }
})


app.get('/profile', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecretkey, {}, async (err, userdata) => {
      if (err) throw err;
      const { name, email, _id } = await users.findById(userdata.id)
      res.json({ name, email, _id })
    })
  }
  else
    res.json(null);
})

app.post('/logout', (req, res) => {
  console.log("hi");
  res.cookie('token', '').json(true);
})


app.post('/uploadbylink', async (req, res) => {
  const { link } = req.body;
  const newname = Date.now() + '.jpg';

  await imagedownloader.image({ url: link, dest: __dirname + '/uploads/' + newname })
    .then(({ filename }) => {
      console.log('Saved to', filename);
      res.json(newname);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to download image' });
    });

});
const photosmiddleware = multer({ dest: __dirname + '/uploads/' })
app.post('/upload', photosmiddleware.array('photos', 100), async (req, res) => {
  const uploadedfiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newpath = path + '.' + ext;
    fs.renameSync(path, newpath);
    console.log(newpath)
    uploadedfiles.push(newpath.substring(30));
  }
  console.log(uploadedfiles);
  res.json(...uploadedfiles);
})

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const { title, address, addphotos, description, perks, extrainfo, checkin, checkout, maxguests, price } = req.body;

  jwt.verify(token, jwtsecretkey, {}, async (err, userdata) => {
    if (err) throw err;
    const placedoc = await Place.create({
      owner: userdata.id,
      title, address, addphotos, description, perks, extrainfo, checkin, checkout, maxguests, price
    })
    res.json(placedoc)
  })

})


app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecretkey, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});


app.get('/places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecretkey, {}, async (err, userdata) => {
    res.json(await Place.find())
  })
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await (Place.findById(id)))
})

app.put('/places/:id', async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  jwt.verify(token, jwtsecretkey, {}, async (err, userdata) => {
    const placedoc = await Place.findById(id);
    console.log(userdata.id + " " + placedoc.owner);
    if (userdata.id === placedoc.owner.toString()) {
      const { title, address, addphotos, description, perks, extrainfo, checkin, checkout, maxguests, price } = req.body;
      await placedoc.set({ title, address, addphotos, description, perks, extrainfo, checkin, checkout, maxguests, price });
      await placedoc.save();
      res.json('ok');
    }
  })

})

app.post('/bookings', async (req, res) => {
  userdata = await getuserdatafromtoken(req)
  const {
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
  } = req.body;
  await Booking.create({
    user: userdata.id,
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

function getuserdatafromtoken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtsecretkey, {}, async (err, userdata) => {
      if (err) throw err;
      resolve(userdata)
    })
  })
}
app.get('/bookings', async (req, res) => {
  const userdata = await getuserdatafromtoken(req);
  res.json(await Booking.find({ user: userdata.id }).populate('place'))
})



app.delete('/delete', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecretkey, {}, async (err, userData) => {
    const { id } = userData;
    await Place.deleteOne({ owner: id });
    res.json('deleted')
  });
})

app.listen(4000, () => {
  console.log("server is running")
});
