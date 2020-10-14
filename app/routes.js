module.exports = function(app, passport, db, multer, ObjectId) {
const nodemailer = require('nodemailer'); //lets us use nodemailer
// Image Upload Code =========================================================================
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/image/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
});
var upload = multer({storage: storage});

// normal routes ===============================================================

// show the home page (will also have our login links)
app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/indexlogin', function(req, res) {
    res.render('indexlogin.ejs');
});

app.get('/adminfeed', function(req, res) {
    res.render('adminfeed.ejs');
});

app.get('/aboutus', function(req, res) {
    res.render('aboutus.ejs');
});

// TEST/Application FORM SECTION =========================
app.get('/test', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({'posterId': uId}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('test.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// User submits app SECTION =========================
//renders page and gets info ->passport(unique user's posting)
//connected to applications bc we're still posting to this collection
app.get('/userform', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('applications').find({'posterId': uId}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('userform.ejs', {
        user : req.user,
        applications: result
      })
    })
});

// Admin views all apps SECTION =========================
app.get('/adminall', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('applications').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('adminall.ejs', {
        user : req.user,
        applications: result
      })
    })
});

// User views all their submitted apps SECTION =========================
app.get('/userall', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('applications').find({'posterId': uId}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('userall.ejs', {
        user : req.user,
        applications: result
      })
    })
});

// PET DATABASE SECTION =========================
app.get('/petdb', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({'posterId': uId}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('petdb.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('posts').find({'posterId': uId}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user : req.user,
        posts: result
      })
    })
});

// CAT Feed with user logged in =========================
app.get('/loggedinfeed', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({"type": "Cat"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('loggedinfeed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// Dog Feed with user logged in =========================
app.get('/loggedindogfeed', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({"type": "Dog"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('loggedindogfeed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// Small Animal Feed with user logged in =========================
app.get('/smallAniFeed', isLoggedIn, function(req, res) {
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({"type": "Small Animal"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('smallAniFeed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// Favorites page =========================
app.get('/favorites', isLoggedIn, function(req, res) {
    var user  = req.user;
    let uId = ObjectId(req.session.passport.user)
    db.collection('petlistings').find({'email': user.local.email}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('favorites.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// CAT FEED PAGE =========================
//find method displays types of animals
app.get('/feed', function(req, res) {
    db.collection('petlistings').find({"type": "Cat"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('feed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// DOGFEED PAGE =========================
app.get('/dogFeed', function(req, res) {
    db.collection('petlistings').find({"type": "Dog"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('dogFeed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

// Smallanimal PAGE =========================
app.get('/bbfeed', function(req, res) {
    db.collection('petlistings').find({"type": "Bird"}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('bbfeed.ejs', {
        user : req.user,
        petlistings: result
      })
    })
});

//Create Post =========================================================================
app.post('/qpPost', upload.single('file-to-upload'), (req, res, next) => {
  let uId = ObjectId(req.session.passport.user)
  db.collection('petlistings').save({posterId: uId, petName: req.body.petName, type: req.body.type, caption: req.body.caption, description: req.body.description, age: req.body.age, weight: req.body.weight, city: req.body.city, imgPath: 'image/uploads/' + req.file.filename}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/feed')
  })
});

app.post('/submitForm', (req, res, next) => {
  let uId = ObjectId(req.session.passport.user)
  db.collection('applications').save({posterId: uId, userName: req.body.userName, userEmail: req.body.userEmail, userNumber: req.body.userNumber, userAddress: req.body.userAddress, petName: req.body.petName, ownPets: req.body.ownPets, schedule: req.body.schedule, vet: req.body.vet, home: req.body.home, roommates: req.body.roomates, behavior: req.body.behavior, reference: req.body.reference}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/feed')
  })
});

// const userEmail = user.local.email

//ADDING FAVORITES NOT GETTING
//updating via email&petname -> telling backend to find document with these two conditions
//but doesn't exist so upsert is set to true -> automatically create doc that it does match (NOW it exists)
//all info (textnodes) will be added to this document AKA cloning listing except adding own userEmail
//have petname so it doesn't clone again
app.put('/favorites', (req, res) => {
  var user  = req.user;
  let uId = ObjectId(req.session.passport.user)
  // db.collection('petlistings').save(`{${uId}: true}`, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log('saved to database')
  //   res.redirect('/feed')
  // })
  db.collection('petlistings')
  .findOneAndUpdate({email: user.local.email, petName: req.body.petName}, {
    $set: {
      imgPath: req.body.imgPath,
      petName: req.body.petName,
      weight: req.body.weight,
      city: req.body.city,
      age: req.body.age,
      caption: req.body.caption,
      description: req.body.description,
      heart: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

//nodemailer = service (NPM package) configuration
app.put('/approve', (req, res) => {
  var transport = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "endlesspawsabilities1@outlook.com", //where we're sending emails from
      pass: "09876543!"
    }
  });

//OBJECT {} -> template/configuration for creating a message
  const message = {
      from: 'endlesspawsabilities1@outlook.com', // Sender address
      to: req.body.userEmail,         // List of recipients
      subject: 'Your pet adoption application has been approved, congrats!', // Subject line
      text: 'Your application has been approved. The next step is a phone interview with one of our staff at Endless Pawsabilities, a representative will call you to set up a time.', // Plain text body of the email i.e. steps for next adoption phase COVID???
      // html: 'Embedded image: <img src=""/>',
      // attachments: [{
      //     filename: 'image.png',
      //     path: `./public/img/${fileName}`,
      //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
      // }]
  };
    transport.sendMail(message, function(err, info) { //using transport variable to use sendmail method -> send approved email to client
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
  });

//finds info -> then updates doc and inserts approval/deny/pending
  db.collection('applications').findOneAndUpdate({userName: req.body.userName, petName: req.body.petName}, {
    $set: {
      approval: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/deny', (req, res) => {
  db.collection('applications')
  .findOneAndUpdate({userName: req.body.userName, petName: req.body.petName}, {
    $set: {
      approval: false
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/pending', (req, res) => {
  db.collection('applications')
  .findOneAndUpdate({userName: req.body.userName, petName: req.body.petName}, {
    $set: {
      approval: undefined
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.put('/saveChanges', (req, res) => {
//   db.collection('petlistings')
//   .findOneAndUpdate({petName: req.body.petName}, {
//     $set: {
//       petName: req.body.petName,
//       type: req.body.type,
//       caption: req.body.caption,
//       description: req.body.description,
//       age: req.body.age,
//       weight: req.body.weight,
//       city: req.body.city
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: false
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/delete', (req, res) => {
  db.collection('petlistings').findOneAndDelete({petName: req.body.petName, email: req.body.email, }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN =============================== diff endpoints
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the USER login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : 'indexlogin', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/adminlogin', function(req, res) {
              res.render('adminlogin.ejs', { message: req.flash('loginMessage') });
          });

        // process the ADMIN login form
        app.post('/adminlogin', passport.authenticate('local-login', {
            successRedirect : 'test', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/indexlogin', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));



// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/test');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
