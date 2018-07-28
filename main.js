//variables
let getListItems = [];
getListItems = $(".student-item");
let pages = [];
let pgNum = 0;
let currentPage = 1;
let searchTerm = "";
let counter = 0;
let noResults = document.getElementsByTagName("h2");
let getStudents = $(".student-item");


// variables to figure out number of pages for the pagination
const dividePagesBy = 10;
let paginate = Math.ceil(getListItems.length / dividePagesBy);
// function that displays pagination 
const displayPagination = (paginate) => {
    $(".pagination li").remove();

    if (currentPage > 1) {
        $(".pagination").append("<li ><a href = '#'>" + "<" + "</a></li>");
    }
    for (j = 1; j <= paginate; j++) {
        $(".pagination").append("<li><a id=list" + j + " href = '#'>" + j + "</a></li>");
    }
    if (currentPage < paginate) {
        $(".pagination").append("<li><a href = '#'>" + ">" + "</a></li>");
    }
    if (paginate != 0) {
        let getCurrentPg = document.getElementById("list" + currentPage);
        getCurrentPg.classList.add("active");
    }
}

//function to display a page of people.
// .eq() Reduce the set of matched elements to the one at the specified index.
const showPages = (pgNum, getstudents) => {
    getStudents.hide();
    for (let i = pgNum; i <= ((dividePagesBy * currentPage) - 1); i++) {
        getStudents.eq(i).show();
    }
    displayPagination(paginate);
}
showPages(pgNum, getStudents);

const studentPaginate = () => {
    // set variables for function
    let newPage = parseInt(event.target.textContent);

    let pgMove = (event.target.textContent);
    if (isNaN(newPage)) {
        newPage = 1;
    }
    //  previous and back li controls in pagination
    if (pgMove === "<") {
        newPage = currentPage - 1;
    } else if (pgMove === ">") {
        newPage = currentPage + 1;
    }

    // controls pagination functionality:
    if (newPage !== currentPage) {
        let getCurrentPg = document.getElementById("list" + currentPage);
        getCurrentPg.classList.remove("active");
        pgNum = (newPage * dividePagesBy) - dividePagesBy;
        currentPage = newPage;
        getCurrentPg = document.getElementById("list" + currentPage);
        getCurrentPg.classList.add("active");
        showPages(pgNum, getStudents);
    }
}
// ===================================
//          Event Listeners
//====================================

// add event listener on pagination div
const listen = $(".pagination");
listen[0].addEventListener("click", (event) => {
    studentPaginate();
});

displayPagination(paginate);

// Event listener on Search Box 
//get search criteria and lowercase all display match.
const search = $("#search-button");
search[0].addEventListener("click", (event) => {
    $(".query").remove();
    noResults[0].textContent = ("Students");

    searchTerm = document.getElementById("search").value.toLowerCase();
    pgNum = 0;
    currentPage = 1;
    getListItems.hide();
    counter = 0;
    for (k = 0; k < getListItems.length; k++) {
        let nameText = getListItems[k].getElementsByTagName("h3")[0].innerText.toLowerCase();
        let email = getListItems[k].getElementsByTagName("span")[0].innerText.toLowerCase();
        if (nameText.indexOf(searchTerm) != -1 || email.indexOf(searchTerm) != -1) {
            counter++;
            getListItems[k].classList.add("query");
        }
    } // end for k loop 
    getStudents = $(".query");
    let queryResults = $(".query");
    paginate = Math.ceil(queryResults.length / dividePagesBy);
    showPages(pgNum, getStudents);

    if (counter === 0) {
        noResults[0].textContent = ("Sorry, no results were found")
    };
}); // endlistener on search button

//listener on search field  contains reset
const searchBox = document.getElementById("search");
searchBox.addEventListener("focus", (event) => {
    if (searchBox.value != "") {
        paginate = Math.ceil(getListItems.length / dividePagesBy);
        pgNum = 0;
        currentPage = 1;
        getStudents = $(".student-item");
        showPages(pgNum, getStudents);
        studentPaginate();
        searchTerm = "";
        noResults[0].textContent = ("Students");
    }
})