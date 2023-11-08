let currentPage = '#Page1'
function setup() {
  select('#Item1').mouseClicked(() => switchPage('#Page1'))
  select('#Item2').mouseClicked(() => switchPage('#Page2'))
  select('#Item3').mouseClicked(() => switchPage('#Page3'))
  select('#Item4').mouseClicked(() => switchPage('#Page4'))
  
}

function switchPage (whichPage)
{
 select(currentPage).removeClass('show')
 select(whichPage).addClass('show')
 currentPage = whichPage
}