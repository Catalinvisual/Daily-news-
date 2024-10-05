let buttons = document.querySelectorAll(".inp1");
let noutati = document.querySelector(".news");
let btn1 = document.querySelector(".next");
let btn2 = document.querySelector(".previous");
let btnsearch = document.querySelector(".btn");
let inpsearch = document.querySelector(".search");

function getcategory(category) {
  const categorycheck = category == undefined ? "technology" : category;

  const NEWS_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=${categorycheck}&apiKey=3500c01032f74ae8a4adcbd0d4b864af`;
  console.log(NEWS_LINK);
  try {
    const dailynews = async () => {
      await fetch(NEWS_LINK)
        .then((response) => response.json())
        .then((json) => news(json.articles));
    };
    dailynews();
  } catch (error) {
    console.log("The page is not working" + error);
  }
}
getcategory();

buttons.forEach((button) => {
  button.addEventListener("click", clickbtn);
  function clickbtn() {
    noutati.innerHTML = "";
    let category = button.value;
    getcategory(category);
    console.log(button.value);
  }
});

function news(json) {
  console.log(json);
  json.forEach((element, numar) => {
    const x =
      element.title != ["Removed"] && numar <= 9 ? "showdiv" : "hidediv";

    const y = element.description;
    const z = element.author;
    const urlremove = element.urlToImage;

    if (y != ["Removed"] && z != null && urlremove != null) {
      noutati.innerHTML += `

    <div class="card ${x}">
    <h2>${element.title}</h2>
    <p>${element.description}</p>
    <p>${element.author}</p>
    <p>${element.publishedAt}</p>
    <a class="url" href="${element.url}">Read more</a>
    <div class="foto">
    <img src="${element.urlToImage}">
    </div>
    </div>
       
    `;
    }

    console.log(json);
  });

  btnsearch.addEventListener("click", () => {
    let result = inpsearch.value;
    noutati.innerHTML = "";
    json.forEach((element, numar) => {
      let titleinfo = element.title;
      let descriptioninfo = element.description;
      const descriptionresult = descriptioninfo.toLowerCase().includes(result);
      const searchresult = titleinfo.toLowerCase().includes(result);
      if (searchresult || descriptionresult) {
        const x =
          element.title != "[Removed]" && numar <= 9 ? "showdiv" : "hidediv";
        noutati.innerHTML += `

        <div class="card ${x}">
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <p>${element.author}</p>
        <p>${element.publishedAt}</p>
        <a class="url" href="${element.url} ">Citeste noutatiele</a>
        <div class="foto">
        <img src="${element.urlToImage}">
        </div>
        </div>
          
        `;
        console.log(element);
      }
    });
  });
}

btn1.addEventListener("click", carduri);
function carduri() {
  let hideclass = document.querySelectorAll(".card");
  hideclass.forEach((element, numar) => {
    if (numar <= 9) {
      element.classList.remove("showdiv");
      element.classList.add("hidediv");
    } else if (numar > 9) {
      element.classList.remove("hidediv");
      element.classList.add("showdiv");
    }
    console.log(numar);
  });
}

btn2.addEventListener("click", carduri1);
function carduri1() {
  let showclass = document.querySelectorAll(".card");
  showclass.forEach((element, numar) => {
    if (numar > 9) {
      element.classList.remove("showdiv");
      element.classList.add("hidediv");
    } else if (numar < 9) {
      element.classList.remove("hidediv");
      element.classList.add("showdiv");
      console.log("ok");
    }
    console.log(numar);
  });
}
