const FilmEles = document.querySelector("#films");
const nameFilms = document.querySelectorAll("option");
const seatTypes = document.querySelectorAll(".seat");
const displayBtn = document.querySelector(".wrapper");
const BookBtn = document.querySelector(".btn");
const exitBtn = document.querySelector(".icon");
const text_info = document.querySelectorAll("span.text_info");
const timeFilms = ["2h45p", "3h10p", "1h30p"];
let isClick = false;
let priceFilm = nameFilms[0].value;
let countSeat = getConfig("Seats") || 0;
let TotalMustPay = 0;
const arrIndexs = getConfig("arrayIndexs") || [];
function updateNameFilm() {
  for (var i = 0; i < nameFilms.length; i++) {
    if (priceFilm == nameFilms[i].value) {
      document.querySelectorAll("span.text")[0]
        .innerHTML = `: ${nameFilms[i].innerText}`;
      text_info[0].innerHTML = `${nameFilms[i].innerText}`
      setConfig("Movie", `${nameFilms[i].innerText}`);
    }
  }
}
function updatePriceFilm() {
  document.querySelectorAll("span.text")[2]
    .innerHTML = `: ${priceFilm}$`;
  FilmEles.addEventListener("change", (e) => {
    priceFilm = +e.target.value;
    document.querySelectorAll("span.text")[2]
      .innerHTML = `: ${priceFilm}$`;
    updateNameFilm();
    updateTimeFilm();
  });
}
function updateTimeFilm() {
  for (var i = 0; i < nameFilms.length; i++) {
    if (priceFilm == nameFilms[i].value) {
      document.querySelectorAll("span.text")[1]
        .innerHTML = `: ${timeFilms[i]}`;
      text_info[1].innerHTML = `${timeFilms[i]}`
      setConfig("Time", `${timeFilms[i]}`)
    }
  }
}
function updateSeats() {
  seatTypes.forEach((seatType, index) => {
    if (!(seatType.classList.contains("sold"))) {
      seatType.addEventListener("click", (e) => {
        const createAtt = document.createAttribute("data-index");
        createAtt.value = `${index}`;
        seatType.setAttributeNode(createAtt);
        const value_index = +seatType.getAttribute("data-index");
        if (e.target.classList.contains("selected")) {
          e.target.classList.remove("selected");
          countSeat--;
          for (var i = 0; i < arrIndexs.length; i++) {
            if (arrIndexs[i] == value_index) {
              arrIndexs.splice(i, 1);
            }
          }
          document.querySelectorAll("span.text")[3].innerHTML = `: ${countSeat} seat`;
        } else {
          e.target.classList.add("selected");
          countSeat++;
          arrIndexs.push(value_index);
          document.querySelectorAll("span.text")[3].innerHTML = `: ${countSeat} seat`;
        }
        text_info[2].innerHTML = `${countSeat} seats`;
        TotalMustPay = countSeat * priceFilm;
        setConfig("Seats", countSeat);
        setConfig("arrayIndexs", arrIndexs);
        updateTotalPay(TotalMustPay);
      })
    }
  })
}
function updateTotalPay(TotalMustPay) {
  document.querySelectorAll("span.text")[4].innerHTML = `: ${TotalMustPay}$`;
}
function showInfoOrder() {
  let isBooking = false;
  BookBtn.addEventListener("click", (e) => {
    isBooking = true;
    setConfig("onBook", isBooking);
    displayBtn.style.display = "block";
    for (var i = 0; i < arrIndexs.length; i++) {
      seatTypes[arrIndexs[i]].classList.add("sold");
      seatTypes[arrIndexs[i]].classList.remove("selected");
    }
  })
  exitBtn.addEventListener("click", (e) => {
    displayBtn.style.display = "none";
  })
  setConfig("onBook", isBooking);
}
function setConfig(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getConfig(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function loadConfig() {
  for (var i = 0; i < arrIndexs.length; i++) {
    seatTypes[arrIndexs[i]].classList.add("sold");
  }
}

function start() {
  loadConfig();
  updatePriceFilm();
  updateNameFilm();
  updateTimeFilm();
  updateSeats();
  showInfoOrder();
}
document.addEventListener('DOMContentLoaded', () => {
  start();
})
