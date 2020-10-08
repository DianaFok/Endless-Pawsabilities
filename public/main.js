var heart = document.getElementsByClassName("fas fa-heart");
var approved = document.getElementsByClassName("fas fa-check");
var denied = document.getElementsByClassName("fas fa-times");
var pending = document.getElementsByClassName("fas fa-clock");
const saveChanges = document.getElementsByClassName("saveChanges");
const overlayOn = document.getElementsByClassName("overlayOn")
const overlayOff = document.getElementsByClassName("overlayOff")

Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log(this.parentNode.parentNode.parentNode.childNodes[1].innerText)
        const imgPath = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const petName = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const weight = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        const age = this.parentNode.parentNode.parentNode.childNodes[7].innerText
        const city = this.parentNode.parentNode.parentNode.childNodes[9].innerText
        const heart = this.parentNode.parentNode.parentNode.childNodes[11].innerText
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
            'heart': heart
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

Array.from(approved).forEach(function(element) {
      element.addEventListener('click', function(){
        const userName = this.parentNode.parentNode.childNodes[1].innerText
        const userEmail = this.parentNode.parentNode.childNodes[3].innerText
        const petName = this.parentNode.parentNode.childNodes[9].innerText

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

Array.from(saveChanges).forEach(function(element) {
      element.addEventListener('click', function(){
        // const imgPath = this.parentNode.parentNode.childNodes[1].childNodes[1].src.split("/")[5];
        const petName = this.parentNode.childNodes[1].innerText
        const type = this.parentNode.childNodes[3].innerText
        const caption = this.parentNode.childNodes[5].innerText
        const description = this.parentNode.childNodes[7].innerText
        const age = this.parentNode.childNodes[9].innerText
        const weight = this.parentNode.childNodes[11].innerText
        const city = this.parentNode.childNodes[13].innerText
        fetch('saveChanges', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'petName': petName,
            'type': type,
            'caption': caption,
            'description': description,
            'age': age,
            'weight': weight,
            'city': city
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          window.location.reload(true)
        })
      });
});

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

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const petName = this.parentNode.parentNode.childNodes[1].innerText
//         // console.log('images/uploads/'imgPath.split("/")[5]);
//
//         fetch('/delete', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'petName':petName
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//     });
// });

// function on() {
//   document.getElementById("overlay").style.display = "block";
// }
//
// function off() {
//   document.getElementById("overlay").style.display = "none";
// }
