//variables
let getListItems =[];
getListItems= $(".student-item");
console.log(getListItems);
let pages = [];
let pgNum = 0;
currentPage = 1;

// varibles to figure number of pages for the pagination
const dividePagesBy = 10;
const paginate = Math.ceil(getListItems.length / dividePagesBy);

//
/*const getPages = () =>{
    for (let i=0; i<getListItems.length; i+=dividePagesBy){
        pages.push(getListItems.slice(i, i+dividePagesBy));
        
            console.log(pages);

    }
    return pages;
   

}
getPages();*/
//pagination
//$(".pagination").append("<li><a href = 'javascript:void(0)'>1</a></li>");
const displayPagination = () =>{
    $(".pagination").append("<li><a href = '#'>" + "<" + "</a></li>");
    for(j =1; j<=paginate; j++){
$(".pagination").append("<li><a href = '#'>" + j + "</a></li>");
    }
    $(".pagination").append("<li><a href = '#'>" + ">" + "</a></li>");

}

//function to display first 10 people.
// .eq() Reduce the set of matched elements to the one at the specified index.
const showPages = (pgNum) => {
//$(".student-item") .show(); 
$(".student-item") .hide();
for(let i=pgNum; i<=((dividePagesBy*currentPage)-1); i++){
    $(".student-item").eq(i).show();
}  
}
showPages(pgNum);

// ===================================
//          Event Listeners
//====================================



// add event listener on pagination div
const listen = $(".pagination");
listen[0].addEventListener("click", (event) => {
    console.log(event.target.textContent);

// set variables for function
   let calculatePage= parseInt(event.target.textContent);
   let goToPage = (calculatePage * dividePagesBy)-dividePagesBy;
   let pgMove = (event.target.textContent);

// set intital  prveious and back  li controls in pagination
   if (pgMove === "<"){
       pgMove= -1
   }else if (pgMove=== ">"){
       pgMove=1;
   }
   console.log(calculatePage);
   console.log(currentPage);

// controls pagination functionality:
// 1) previous number 2) next numbers 3)previous symbol 4) next symbol
   if (calculatePage !== currentPage){
       //console.log("hi");
       if(calculatePage < currentPage){
        pgNum = goToPage;
        currentPage=calculatePage;
        //console.log(pgNum);
        //console.log(currentPage);
        showPages(pgNum);
       } else if(calculatePage > currentPage){
        pgNum = goToPage;
        currentPage=calculatePage;
        //console.log(pgNum);
        //console.log(currentPage);
        //console.log(goToPage);
        showPages(pgNum);
        } else if( pgMove + currentPage < currentPage) {
            //console.log("waht");
        currentPage = pgMove + currentPage;
        pgNum = (currentPage * dividePagesBy) - dividePagesBy;
        //console.log(pgNum);
        //console.log(currentPage);
        showPages(pgNum);
        }else if( pgMove + currentPage > currentPage) {
            //console.log("waht");
        currentPage = pgMove + currentPage;
        pgNum = (currentPage * dividePagesBy) - dividePagesBy;
        //console.log(pgNum);
        //console.log(currentPage);
        showPages(pgNum);
        }

   }
});



displayPagination();   


// Event listener on Search Box
const search = $("#search-button");
search[0].addEventListener("click", (event) =>{
    // event.preventDefault();
    let match;
    let searchTerm = document.getElementById("search").value.toLowerCase();
    console.log(searchTerm);
    getListItems.hide();
    for (k=0; k<getListItems.length; k++){
         let nameText = getListItems[k].getElementsByTagName("h3")[0].innerText.toLowerCase();
         let email = getListItems[k].getElementsByTagName("span")[0].innerText.toLowerCase();
         console.log(nameText);
    if(nameText.indexOf(searchTerm) != -1 || email.indexOf(searchTerm) != -1){
     getListItems[k].style.display="block";
     
    };
    } 
});     