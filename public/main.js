var heart = document.getElementsByClassName("fas fa-heart");
var trash = document.getElementsByClassName("fas fa-trash");
var approved = document.getElementsByClassName("fas fa-check");
var denied = document.getElementsByClassName("fas fa-times");
var pending = document.getElementsByClassName("fas fa-clock");
const saveChanges = document.getElementsByClassName("saveChanges");
const overlayOn = document.getElementsByClassName("overlayOn")
const overlayOff = document.getElementsByClassName("overlayOff")

//user can save favorites, targeting textnodes in the listing, sending to backend
//then gets saved to DB aka making clone of petlistings
Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const imgPath = this.parentNode.parentNode.parentNode.childNodes[9].innerText
        const petName = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const weight = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        const age = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const city = this.parentNode.parentNode.parentNode.childNodes[7].innerText
        const caption = this.parentNode.parentNode.parentNode.childNodes[11].innerText
        const description = this.parentNode.parentNode.parentNode.childNodes[13].innerText
        alert(`${petName} has been added to favorites!`)
        fetch('favorites', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'imgPath': imgPath,
            'petName': petName,
            'weight': weight,
            'age': age,
            'city': city,
            'caption': caption,
            'description': description
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // window.location.reload(true)
        })
      });
});





//targeting these nodes (certain info of app) so the DB knows which application to update info
//username = applicants Name
//email = applicants email
//sends info as string
Array.from(approved).forEach(function(element) {
      element.addEventListener('click', function(){
        const userName = this.parentNode.parentNode.childNodes[1].innerText
        const userEmail = this.parentNode.parentNode.childNodes[3].innerText
        const petName = this.parentNode.parentNode.childNodes[9].innerText
        alert(`This application has been approved, response has been sent!`)
        fetch('approve', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'userName': userName,
            'userEmail': userEmail,
            'petName': petName
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // window.location.reload(true)
        })
    });
});

Array.from(denied).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log(this.parentNode.parentNode.childNodes[1].innerText)
        console.log(this.parentNode.parentNode.childNodes[9].innerText)
        const userName = this.parentNode.parentNode.childNodes[1].innerText
        const petName = this.parentNode.parentNode.childNodes[9].innerText
        alert(`This application has been denied, response has been sent.`)
        fetch('deny', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'userName': userName,
            'petName': petName
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // window.location.reload(true)
        })
    });
});

Array.from(pending).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log(this.parentNode.parentNode.childNodes[1].innerText)
        console.log(this.parentNode.parentNode.childNodes[9].innerText)
        const userName = this.parentNode.parentNode.childNodes[1].innerText
        const petName = this.parentNode.parentNode.childNodes[9].innerText
        alert(`This application is pending, response has been sent.`)
        fetch('pending', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'userName': userName,
            'petName': petName
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // window.location.reload(true)
        })
    });
});

// Array.from(saveChanges).forEach(function(element) {
//       element.addEventListener('click', function(){
//         // const imgPath = this.parentNode.parentNode.childNodes[1].childNodes[1].src.split("/")[5];
//         const petName = this.parentNode.childNodes[1].innerText
//         const type = this.parentNode.childNodes[3].innerText
//         const caption = this.parentNode.childNodes[5].innerText
//         const description = this.parentNode.childNodes[7].innerText
//         const age = this.parentNode.childNodes[9].innerText
//         const weight = this.parentNode.childNodes[11].innerText
//         const city = this.parentNode.childNodes[13].innerText
//         fetch('saveChanges', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'petName': petName,
//             'type': type,
//             'caption': caption,
//             'description': description,
//             'age': age,
//             'weight': weight,
//             'city': city
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           window.location.reload(true)
//         })
//       });
// });

Array.from(overlayOn).forEach(function(element) {
      element.addEventListener('click', function(){
        // console.log(this.parentNode.parentNode.parentNode.childNodes[1].innerText)
        const petName = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        console.log(`${petName}`)
        document.getElementById(`${petName}`).style.display = "block";
    });
});

Array.from(overlayOff).forEach(function(element) {
      element.addEventListener('click', function(){
        const petName = this.parentNode.childNodes[1].innerText
        console.log(`${petName}`)
        document.getElementById(`${petName}`).style.display = "none";
    });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const petName = this.parentNode.parentNode.childNodes[1].innerText
        const email = this.parentNode.parentNode.childNodes[3].innerText

        fetch('/delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'petName':petName,
            'email': email
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
