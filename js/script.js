"use strict";
const locale = navigator.language
let timer;

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
    movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
      "2020-07-28T23:36:17.929Z",

      "2023-03-15T10:51:36.790Z",

  ],
  currency: "USD",
  locale

};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
    movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",

};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
    movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2023-03-18T10:51:36.790Z",
  ],
  currency: "GBP",
  locale: "en-GB", 

};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
    movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "CAD",
  locale: "en-CA",

};

const accounts = [account1, account2, account3, account4];
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

let loginUser = {
  owner: "",
  pin: "",
};
let transferAccount = {
  owner: "",
  transferTo: "",
  amount: 0,
};
const loginInputs = document.querySelectorAll(".login input");
const transferInputs = document.querySelectorAll(".form--transfer input");
const loanInputs = document.querySelector(".form--loan input");

const login = document.querySelector(".login");
const transferForm = document.querySelector(".form--transfer");
const loanForm = document.querySelector(".form--loan");

const warning = document.querySelector(".warning");
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const labelExist = document.querySelector(".not--exsit");
const containerApp = document.querySelector(".appLogin");
const containerMovements = document.querySelector(".movements");

const btnSort = document.querySelector(".btn--sort");
const btnClose = document.querySelector('.form__btn--close');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');

const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let now =  new Date()
let newData = []
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

if (localStorage.getItem("updateAccounts")) {
  newData = JSON.parse(localStorage.getItem("updateAccounts"))
  for (let i = 0; i < newData.length; i++){
      accounts.push(newData[i])
  }
  const acc = accounts.find(a=> a.owner === loginUser.owner)
  
    updateUI(acc)

}

    const formatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
  currency: "EUR",
});
const formatterMov = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
function createUserName(accounts) {
  accounts.forEach((account) => {
    account.userName = account.owner
    .toLowerCase()
    .split(" ")
    .map((n) => n[0])
    .join("");
  });
}

createUserName(accounts);
function updateUI(acc) {
  displayMovements(acc);
  displayBalance(acc.movements);
  displayTotalUSD(acc);
  
}

const options = {
    weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
   hour: "numeric",
  minute: "numeric",
  second: "numeric",
    hour12: true,

    timeZoneName: "short",
    
  }
  let computingUserName = (account) =>
  account.userName === loginUser.owner && account.pin === loginUser.pin;
const timerFunc =  ()=> {
  const acc = accounts.find(computingUserName)
labelDate.textContent = `${new Intl.DateTimeFormat(acc.locale,options).format()}`

  setTimeout(timerFunc, 1000)
}
if (localStorage.getItem("accountLogin")) {
  loginUser = JSON.parse(localStorage.getItem("accountLogin"));
  clearInterval(timer)
    timer = startLogOutTimer()  

    isAlreadyLogin();
  timerFunc()
}

  
  function updateUI(acc) {
    if (acc?.movements)
    {
      
      displayMovements(acc);
       displayBalance(acc.movements);
        displayTotalUSD(acc);
      }

  }
let usersTransformInfo = []
const idx = localStorage.getItem("accs")
if (localStorage.getItem("userTransForm") || localStorage.getItem("userTransFormTo")) {
  const user = JSON.parse(localStorage.getItem("userTransForm"));
  usersTransformInfo = JSON.parse(localStorage.getItem("userTransFormTo")) ?? [];
  accounts.forEach(acc => {
    if (acc.owner === user.owner) {
      acc.movements = user.movements;
      
      acc.movementsDates = user.movementsDates;
    }
  });

  if (usersTransformInfo) {
  usersTransformInfo.forEach((user) => {
    const account = accounts.find(acc => user.owner === acc.owner)
    if (account) {
      account.movements = user.movements;
      account.movementsDates = user.movementsDates;
      
    }
  })  
  }
  
  
  const currentUser = accounts.find(acc => acc.pin === loginUser.pin );
  updateUI(currentUser)
}
if (idx) {
  accounts.splice(idx , 1)

  
}

function resetApp() {
  containerApp.classList.add("hidden");
  containerApp.classList.remove("show");
    loginUser.owner = ''
  loginUser.pin = ''
  labelWelcome.textContent = "Log in to get started";
}
function loginFun(e) {
  e.preventDefault();
  loginUser.owner = inputLoginUsername.value
  loginUser.pin = +(inputLoginPin.value)
  if (accounts.some(computingUserName)) {
    isAlreadyLogin();

      if (timer) {
    clearInterval(timer)
  }
    timer = startLogOutTimer()  
    

    localStorage.setItem("accountLogin", JSON.stringify(loginUser));

  } else {
    resetApp();
    warning.classList.remove("hidden");
  }
}

function isAlreadyLogin() {
  containerApp.classList.remove("hidden");
  warning.classList.add("hidden");

  containerApp.classList.add("show");
  let account = accounts.find(computingUserName);
  labelWelcome.textContent = `Welcome back, ${account.owner}!`;
  loginInputs.forEach((input) => (input.value = ""));
updateUI(account)
}
function formatCurrency() {
    const acc = accounts.find(computingUserName)
  return new Intl.NumberFormat(acc.locale, {
  style: "currency",
  currency:acc.currency,
  minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',

});

}

function displayBalance(account) {
  const balance = account.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = formatCurrency().format(balance);
}

function displayTotalUSD(account) {
  const totalDeposit = account.movements
    .filter((acc) => acc > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCurrency().format(totalDeposit);
  const Withdrawal = account.movements
    .filter((acc) => acc < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent =formatCurrency().format(Math.abs(Withdrawal)) 
  const interestDeposit = account.movements
    .filter((acc) => acc > 0)
    .map((acc) => (acc * account.interestRate) / 100)
    .filter((acc) => acc >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCurrency().format(interestDeposit)  
}


function displayMovements(acc , sort = false) {
  containerMovements.innerHTML = "";
  if(! acc?.movements) return
  const movementEl = sort? acc.movements.slice().sort((a,b)=> a-b): acc.movements
  movementEl.forEach((mov, i) => {
    let type = mov > 0 ? "deposit" : "withdrawal";
    const day = new Date(acc.movementsDates[i])
    const displayDate = () => {
      let daysPassed = calcDaysPassed(day, now)
      if (daysPassed <= 7) {
        if (daysPassed == 0) return 'today'
        else if(daysPassed == 1) return 'yesterday'
        else return `${daysPassed} days ago`
      }
      else return `${day.getFullYear()}/${`${day.getMonth()+ 1}`.padStart(2,"0")}/${`${day.getDate()}`.padStart(2,"0")}`

      
    }
    
    const domEl = ` <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate()}</div>
     <div class="movements__value">${formatCurrency().format(mov)}<div>
     </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", domEl);
  });
}

function startLogOutTimer() {
  let timerTillLogout = (5 * 60) ;

  const tick = () => {
    const minutes = Math.floor(timerTillLogout / 60);
    const seconds = Math.floor(timerTillLogout % 60);
    labelTimer.textContent = `${`${minutes}`.padStart(2,"0")} : ${`${seconds}`.padStart(2,"0")}`
    timerTillLogout--;
   
    if (minutes == 0 && seconds == 0) {
      clearInterval(timer);
      localStorage.clear();
      resetApp();
    }
  }
  tick()
  const timer = setInterval(tick, 1000);

  return timer
  
  }


let checkTransformFound = (acc) => acc.userName === transferAccount.transferTo;
function labelInfo(q,msg) {
  document.querySelector(`.${q}`).textContent = msg;
  document.querySelector(`.${q}`).style.display = "block";
}
function transferFun(e) {
  e.preventDefault();
  const name = inputTransferTo.value
  const amount = inputTransferAmount.value
  transferAccount.amount = amount
  transferAccount.transferTo = name
  transferAccount.owner = loginUser.owner
  const transferAccountFound = accounts.some(checkTransformFound);
  if (!transferAccountFound) {
    labelInfo("transform",`User not found`);
    return;
  }
  if (parseInt(transferAccount.amount) === 0) {
    
  
    labelInfo("transform",`You have to send at least 1$`);
    return;
    }
    if (transferAccount.amount === "") {
      labelInfo("transform","Please enter a valid amount")
          return;

    }
  const balance = parseFloat(
    labelBalance.textContent.split(",")[0].replace(".", "")
  );
  if (transferAccount.amount > balance) {
    labelInfo("transform",`You don't have enough money`);
    return;
  }
  if (transferAccount.amount < 0) {
        labelInfo("transform",`You can't send negative money`);
    return;

  }
  if (transferAccount.transferTo === loginUser.owner) {

        labelInfo("transform",`You can't transform money to yourself`);
    return;

  }
  const receiverUSer = accounts.find(checkTransformFound);
  const senderUser = accounts.find((acc) => acc.userName === loginUser.owner);

  senderUser.movements.push(parseInt(-transferAccount.amount));
  receiverUSer.movements.push(parseInt(transferAccount.amount));
  senderUser.movementsDates.push(now.toISOString())
  receiverUSer.movementsDates.push(now.toISOString())
  usersTransformInfo.push(receiverUSer)

  localStorage.setItem("userTransForm", JSON.stringify(senderUser));
  localStorage.setItem("userTransFormTo", JSON.stringify(usersTransformInfo));
  updateUI(senderUser)
  transferInputs.forEach((input) => (input.value = ""));
    clearInterval(timer)
    timer = startLogOutTimer()  
}
function clearLocalStorage() {
  
    localStorage.removeItem("accountLogin")
    localStorage.removeItem("userTransForm")

}
function CloseAccFun(e) {
  e.preventDefault()
  const name = inputCloseUsername.value
  const pin = +(inputClosePin.value)
  const confirmAcc = loginUser.owner === name && loginUser.pin === pin
  if (confirmAcc) {
    const index = accounts.findIndex(acc => acc.pin === pin)
    accounts.splice(index, 1)
    localStorage.setItem("accs", index)

    clearLocalStorage()
    resetApp()
    
  }
  else {
    labelInfo("close",`User not found or password wrong, try Again!!`);
  }
}
function requestLoan(e) {
  e.preventDefault()
  const amount = Math.floor(loanInputs.value)
   if (amount === "" || amount === 0 ) {
      labelInfo("loan","Please enter a valid amount")
          return;
   }
  const currentAcc = accounts.find(computingUserName)
  const validLoan = amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)
  if (validLoan) {
    const sec = 2.5
    labelInfo("loan", `You Loan have approved please wait ${sec} seconds.`)
    setTimeout(() => {
      currentAcc.movements.push(amount)
    currentAcc.movementsDates.push(now.toISOString())
    localStorage.setItem("userTransForm", JSON.stringify(currentAcc));
    loanInputs.value = ''

      updateUI(currentAcc)
          labelInfo("loan", "")
    clearInterval(timer)
    timer = startLogOutTimer()  

    } , sec * 1000)

  }
  else {
    labelInfo("loan", "You do not qualify for a loan. Please make sure you have at least 10% of the requested amount in your account.")
  }
  
}
let sort = false
function sortFun() {
  const account = accounts.find(computingUserName)
  displayMovements(account, !sort) 
  sort = ! sort

}


login.addEventListener("submit", loginFun);
transferForm.addEventListener("submit", transferFun);
btnClose.addEventListener("click",CloseAccFun)
loanForm.addEventListener("submit",requestLoan)
btnSort.addEventListener("click",sortFun)
///////////////////////////////////////////////////////////
const fragmentCookies = document.createDocumentFragment()
const message = document.createElement("div")
message.classList.add("cookie-message")
const cookieMessage = document.createElement("p")
const cookiesBtn = document.createElement("button")
cookieMessage.textContent =  `By clicking ”Accept”, you agree to the storing of cookies on your device to
  enhance site navigation, analyze site usage, and improve marketing.`
  cookiesBtn.textContent = 'Accept'

message.appendChild(cookieMessage)
message.appendChild(cookiesBtn)
fragmentCookies.appendChild(message)
document.body.appendChild(fragmentCookies);
cookiesBtn.addEventListener("click", function () {
message.remove()
})



const openBtnPopup = document.querySelectorAll(".link--btn")
const wrapperPopUp = document.querySelector(".wrapper")
const btnClosePopUp = document.querySelector(".btn--close")
const btnNav = document.querySelector(".items")

const operationsContainer = document.querySelector(".operations__container")
const operationsTabs = document.querySelector(".operations__tabs")
const mainNav = document.querySelector(".mainNav")
const mainNavHeight = mainNav.getBoundingClientRect().height

const btnScrollTon = document.querySelector(".btn-scroll-to")
const featuresSection = document.querySelector("#features")

const header = document.querySelector(".header")

const sliderBtnLeft = document.querySelector(".slider__btn--left")
const sliderBtnRight = document.querySelector(".slider__btn--right")
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const slider = document.querySelector(".slider")
const dotsSlider = document.querySelector(".dots")

const operationsData = [{
  svg: 'img/icons.svg#icon-upload',
  header: 'Tranfser money to anyone, instantly! No fees, no BS.',
  text:`            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
`
},
  {
  svg: 'img/icons.svg#icon-home',
  header: `Buy a home or make your dreams come true, with instant loans.`,
  text:`Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.`
  },
  {
  svg: 'img/icons.svg#icon-user-x',
  header: 'No longer need your account? No problem! Close it instantly.',
  text:`    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.`
},

]

function openModel(e) {
  e.preventDefault()
      wrapperPopUp.classList.remove("wrapper--hidden")
}
function addWrapperHidden() {
  wrapperPopUp.classList.add("wrapper--hidden")
}
function closeModel(e) {
  const className = e.target.classList.value
  if (className.includes("wrapper") || className.includes("btn--close")) {
    addWrapperHidden()
  }

}

function navigateToSection(e) {
  e.preventDefault()
  const item = e.target
  const targetId = item.getAttribute('href');
  if (targetId == '#')  return
  
  const targetElem = document.querySelector(targetId);
  const { top, left } = targetElem.getBoundingClientRect()
  const sectionTop = top + window.pageYOffset
  const sectionLeft = left + window.pageXOffset

  const offsetPosition = sectionTop - mainNavHeight - 1; 
  window.scrollTo({
    top: offsetPosition,
    left: sectionLeft,
   behavior: "smooth",

});
}
function menuFadeAnimation(e) {
  const link = e.target
  if (!link.classList.contains("link")) return
    const nav = link.closest("nav")
  const img = nav.querySelector(".logo")
  const links = nav.querySelectorAll(".link")
    links.forEach(el => {
    if(el !== link) el.style.opacity = this 
  })

  img.style.opacity = this

}

function createTabContent(e) {
    const clicked = e.target.closest(".operations__tab")
  if (!clicked) return
  const { tab } = clicked.dataset
  let currentContent = document.querySelector(".operations__content--active")
  let templateDiv = document.querySelector(".templateDiv")
  if(templateDiv) templateDiv.remove()
  currentContent.remove()
  const { svg, text, header } = operationsData[tab  - 1]
  document.querySelectorAll(".operations__tab").forEach((btn) => btn.classList.remove("operations__tab--active"))
  clicked.classList.add("operations__tab--active")
  const fragment = document.createDocumentFragment()
  
  const operationsContent =
  `<div class="operations__content operations__content--${tab} operations__content--active">
  <div class="operations__icon operations__icon--${tab}">
  <svg>
  <use xlink:href="${svg}"></use>
  </svg>
  </div>
  <h5 class="operations__header">
  ${header}
  </h5>
  <p>
  ${text}
  </p>
  </div>`
const div = document.createElement('div');
div.className = 'templateDiv'
div.innerHTML = operationsContent;

fragment.appendChild(div);
  
operationsContainer.appendChild(fragment)

}
btnScrollTon.addEventListener("click", function () {
  featuresSection.scrollIntoView({ behavior: "smooth"})

})
wrapperPopUp.addEventListener("click", closeModel)
btnClosePopUp.addEventListener("click",closeModel)

openBtnPopup.forEach((btn) => {
  btn.addEventListener("click",openModel)
  
})



btnNav.addEventListener("click", navigateToSection)
btnNav.addEventListener("mouseover", menuFadeAnimation.bind(0.5))
btnNav.addEventListener("mouseout", menuFadeAnimation.bind(1))

operationsContainer.addEventListener("click", createTabContent)

/*bad performance on mobile
const { top:featuresSectionTop } = featuresSection.getBoundingClientRect()
const offsetPosition = featuresSectionTop  - mainNavHeight - 10; 
function stickyNavigation() {
  if (window.scrollY > offsetPosition) {
            mainNav.classList.add("sticky")
  }
  else {
            mainNav.classList.remove("sticky")
  }
}
window.addEventListener("scroll", stickyNavigation)

*/
 
const observeCallback = (entries) => {
  const [entry] = entries
  const { isIntersecting } = entry
  if (!isIntersecting) {
    mainNav.classList.add("sticky")
    
  }
  else {
    mainNav.classList.remove("sticky")
  }

}
const observeOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${mainNavHeight }px`

}
const headerObserver = new IntersectionObserver(observeCallback,observeOptions)
headerObserver.observe(header)

const sectionObserverCallback = (entries , observer) =>{
  const [entry] = entries
    const {target ,  isIntersecting } = entry
if(!isIntersecting) return
target.classList.remove("section--hidden")
observer.unobserve(target)
}
const sectionObserverOptions = {
  root: null,
  threshold: 0.12,
}
const sectionObserver = new IntersectionObserver(sectionObserverCallback,sectionObserverOptions)
const allLazyImages = document.querySelectorAll(".features__img")
const allSectionsReveal = document.querySelectorAll("section")
allSectionsReveal.forEach((sec) => {
  sectionObserver.observe(sec)
  sec.classList.add("section--hidden")
})
const lazyLoadingImgCallback = (entries, observer) => {
  const [entry] = entries
  const { target, isIntersecting } = entry
  if(!isIntersecting) return
  
  target.src = target.dataset.src
  target.addEventListener("load", function () {
      target.classList.remove("lazy-img")
  })
observer.unobserve(target)
  
}
const lazyLoadingImgOptions = {
  root: null,
  threshold: 0,
  rootMargin:'220px'
  
}
const lazyLoadingImgObserver = new IntersectionObserver(lazyLoadingImgCallback , lazyLoadingImgOptions)
allLazyImages.forEach((img) => {
  lazyLoadingImgObserver.observe(img)
  img.classList.add("lazy-img")
})
function activeDot(slide) {
  document.querySelectorAll(".dots__dot").forEach(d => d.classList.remove("dots__dot--active"))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active")

}
function goToSlide (slide)  {
    slides.forEach((item, i) => item.style.transform =  `translateX(${(i - slide )  * 100}%)` )

}
function createDots() {

    const fragment = document.createDocumentFragment()
      slides.forEach((_ , i)=>{
        fragment.appendChild(createDotElement(i))
      })
  dotsSlider.appendChild(fragment)
}
function createDotElement(i) {
  const dot = document.createElement("button")
  dot.classList.add("dots__dot")
  if (i == currentSlide) {
      dot.classList.add("dots__dot--active")
  }
  dot.dataset.slide = i
  return dot

}

function navigateToSlider(i) {

  currentSlide = currentSlide + i
  if (currentSlide > slides.length - 1) currentSlide = 0
  if (currentSlide < 0) currentSlide = slides.length - 1
  activeDot(currentSlide)

  goToSlide(currentSlide)


}
function gotToSlide(e) {
    const dot = e.target
  if (!dot.classList.contains("dots__dot")) return
  let { slide } = dot.dataset
  activeDot(slide)
  goToSlide(slide)

}
function initSlider() {
createDots()
goToSlide(0)

}
initSlider()
sliderBtnRight.addEventListener("click",navigateToSlider.bind(null, 1))
sliderBtnLeft.addEventListener("click", navigateToSlider.bind(null, -1))
dotsSlider.addEventListener("click", gotToSlide)


document.addEventListener("keyup", function (e) {
  if (e.key === 'Escape' && !wrapperPopUp.classList.contains('wrapper--hidden')) {
    addWrapperHidden()
  }
  else if (e.key === 'ArrowRight') {
   navigateToSlider(1)
    
  }
  else if (e.key === 'ArrowLeft') {
    navigateToSlider(-1)
    
  }
})

const popForm = document.querySelector(".popup__form")
const popFormInputs = [...document.querySelectorAll(".popup__form input")]

const newAccount = {  owner: "",
  movements: [],
  interestRate: 1.2,
  pin: '',
    movementsDates: [
    

  ],
  currency: "USD",
  locale
}
function validName(name) {
  const nameRegex = /^[A-Z][a-z]{2,20}$/
  return nameRegex.test(name) 
  
}
function validEmail(email) {
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);

}
function validPin(pin) {
  const pinRegex = /^\d{4}$/;
  return pinRegex.test(pin) ;

  
  
}
function openNewAccount(e) {
  e.preventDefault()
 
  let [firstNamAcc, lastNamAcc, emailAcc ,pinAcc] = popFormInputs.map((input) => input.value)
  let allDataValid = validName(firstNamAcc) && validName(lastNamAcc) &&validEmail(emailAcc) &&validPin(pinAcc)
  if (allDataValid) {
    
    newAccount.owner = `${firstNamAcc} ${lastNamAcc}`
    newAccount.pin = +pinAcc
  let isUserExist =accounts.some(acc => newAccount.owner === acc.owner && newAccount.pin === acc.pin)
   
    if (isUserExist) {
      document.querySelector(".userValid").style.display = 'block'
    }
    else {
      accounts.push(newAccount)
      newData.push(newAccount)
      localStorage.setItem("updateAccounts", JSON.stringify(newData))
      document.querySelector(".popup").classList.add("wrapper--hidden")
      document.querySelector(".goToAccount").style.display = 'block'

      
    }
      popFormInputs.forEach((input) => input.value = '')

    
    
  }
  else {
    
    if (!validName(firstNamAcc) || !validName(lastNamAcc)) {
      document.querySelector(".nameValid").style.display = 'block'
    }
    else if (validPin(pinAcc)){
      document.querySelector(".pinValid").style.display = 'block'
  }
  }

}
popForm.addEventListener("submit", openNewAccount)


const goNowAccBtn = document.querySelector(".goNow")
const goNow = document.querySelector(".go-acc")
goNow.addEventListener("click", function () {
  isAlreadyOpenNewAcc()
})
goNowAccBtn.addEventListener("click", function (e) {
  addWrapperHidden()
  isAlreadyOpenNewAcc()

})
function toggleClass(selector, classToAdd, classToRemove) {
  document.querySelectorAll(selector).forEach(element => {
    if (classToAdd) {
      
      element.classList.add(classToAdd);
    }
    if (classToRemove) {
      
      element.classList.remove(classToRemove);
    }
  });
}
function isAlreadyOpenNewAcc() {
  document.querySelector(".navLogin").classList.remove("notLogin")
  document.querySelector(".warning").classList.remove("notLogin")
  document.querySelector(".appLogin").classList.remove("notLogin")

  document.querySelector(".header").classList.add("notLogin")
  document.querySelector(".footer").classList.add("notLogin")

  document.querySelectorAll("section").forEach(section=>section.classList.add("notLogin"))
}