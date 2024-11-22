let key = "0bf727b2c20c4c6785aba854f3d0286e"
let lang = "en"
let country = "gb"

function setup() {
  GetNews()

  select("#Button").mousePressed(function(){

  })
}

async function GetNews() {
  try{
  const response = await fetch(`https://api.worldnewsapi.com/top-news?api-key=${key}&source-country=${country}&language=${lang}`)
  const data = await response.json()
  console.log(data)
    const TopNews = data.top_news
    for(p of TopNews){
      console.log(p.news[0].title)
    }
  }catch(e){
    console.log(e)
  }
}

