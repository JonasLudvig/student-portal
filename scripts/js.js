// Data Containers ----------------------o

let cataloge = [];
let cart = [];


// Structures ---------------------------o

class Course {
    constructor(
        courseTitle,
        courseNumber,
        courseLengthMonths,
        coursePriceSek,
        courseDescription
    ) {
        this.courseTitle = courseTitle;
        this.courseNumber = courseNumber;
        this.courseLengthMonths = courseLengthMonths;
        this.coursePriceSek = coursePriceSek;
        this.courseDescription = courseDescription;
    }
}


// User Interface Content Control -------o

window.onload = function() {
    drawCourseCataloge();
    formatCataloge();
};

function navigateCataloge() {
    document.getElementById("mainHome").style.display = "none";
    document.getElementById("mainCart").style.display = "none";
    document.getElementById("mainCataloge").style.display = "initial";
}

function navigateNews() {
    document.getElementById("mainCataloge").style.display = "none";
    document.getElementById("mainCart").style.display = "none";
    document.getElementById("mainHome").style.display = "initial";
}

function navigateCart() {
    document.getElementById("mainHome").style.display = "none";
    document.getElementById("mainCataloge").style.display = "none";
    document.getElementById("mainCart").style.display = "initial";
}


// Server Operation ---------------------o

fetch("../objects/courses/cataloge.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for (let i = 0; i < data.length; i++) {
            let courseObject = new Course(
                data[i].courseTitle,
                data[i].courseNumber,
                data[i].courseLengthMonths,
                data[i].coursePriceSek,
                data[i].courseDescription
            );
            cataloge.push(courseObject);
        }
        formatCataloge();
    });


// Logics: Course Cataloge --------------o

function catalogeAddCourse() {
    var title = document.getElementById("userInputTitle").value;
    var length = document.getElementById("userInputLength").value;
    var price = document.getElementById("userInputPrice").value;
    var description = document.getElementById("userInputDescription").value;

    number = Math.max.apply(
        Math,
        cataloge.map(function(o) {
            return o.courseNumber;
        })
    );
    number++;

    let courseObject = new Course(title, number, length, price, description);
    cataloge.push(courseObject);

    const courseItemDiv = document.createElement("div");
    courseItemDiv.className = "courseItem";
    document.getElementById("courseCataloge").appendChild(courseItemDiv);

    courseItemDiv.innerHTML =
        `<h6>` +
        title +
        `</h6>` +
        `<div class="courseItemContent">` +
        `<p2>` +
        description +
        `</p2><br>` +
        `<p3>Course ID: ` +
        number +
        `</p3>` +
        `<p3>Course Length: ` +
        length +
        ` months</p3>` +
        `<p3>Course Price: ` +
        price +
        ` SEK</p3>` +
        `<button class="addToCartButton" onclick="addToCart(` +
        number +
        `)"><p1>Add Course to Cart</p1></button>`;
}

function catalogeRemoveCourse() {
    courseNumberRequest = document.getElementById("userInputRemove").value;
    let filteredArray = cataloge.filter(
        (value) => value.courseNumber != courseNumberRequest
    );
    cataloge = filteredArray;
    console.log(cataloge);
    drawCourseCataloge();
    formatCataloge();
}


// Logics: Shopping Cart ----------------o

function addToCart(courseNumberRequest) {
    index = cataloge.findIndex((x) => x.courseNumber === courseNumberRequest);

    if (!cart.some((e) => e.courseNumber === courseNumberRequest)) {
        cart.push(cataloge[index]);
        drawCart();
    } else {
        alert(
            "Item already added. Navigate upper panel to\nreview items in shopping cart."
        );
    }
}

function removeFromCart(courseNumberRequest) {
    let filteredArray = cart.filter(
        (value) => value.courseNumber != courseNumberRequest
    );
    cart = filteredArray;
    console.log(cart);

    if (cart.length === 0) {
        document.getElementById("cartStatus").style.display = "none";
        document.getElementById("cartPanel").innerHTML =
            "<p2>Cart is empty. Browse <i>course cataloge</i> for items.</p2>";
    } else {
        drawCart();
    }
}


// Formatting ---------------------------o

function formatCataloge() {
    for (let i = 0; i < cataloge.length; i++) {
        const courseItemDiv = document.createElement("div");
        courseItemDiv.className = "courseItem";
        document.getElementById("courseCataloge").appendChild(courseItemDiv);

        courseItemDiv.innerHTML =
            `<h6>` +
            cataloge[i].courseTitle +
            `</h6>` +
            `<div class="courseItemContent">` +
            `<p2>` +
            cataloge[i].courseDescription +
            `</p2><br>` +
            `<p3>Course ID: ` +
            cataloge[i].courseNumber +
            `</p3>` +
            `<p3>Course Length: ` +
            cataloge[i].courseLengthMonths +
            ` months</p3>` +
            `<p3>Course Price: ` +
            cataloge[i].coursePriceSek +
            ` SEK</p3>` +
            `<button class="addToCartButton" onclick="addToCart(` +
            cataloge[i].courseNumber +
            `)"><p1>Add Course to Cart</p1></button></div>`;
    }
}

function drawCart() {
    document.getElementById("cartStatus").style.display = "inline-block";
    document.getElementById("cartPanel").innerHTML =
        "<p2>Reviewing cart items. Click to remove.</p2><button class='confirmButton'><p1>Confirm Purchase</p1></button>";

    for (let i = 0; i < cart.length; i++) {
        const courseItemDiv = document.createElement("div");
        courseItemDiv.className = "cartItem";
        document.getElementById("cartPanel").appendChild(courseItemDiv);

        courseItemDiv.innerHTML =
            `<p1>` +
            cart[i].courseTitle +
            `, ` +
            cart[i].coursePriceSek +
            ` SEK</p1><div style="float: right"><img src="media/remove.svg" class="removeIcon" onclick="removeFromCart(` +
            cart[i].courseNumber +
            `)"></div>`;
    }
}


// (.onload) Source Content -------------o

function drawCourseCataloge() {
    document.getElementById("courseCataloge").innerHTML = `
  <h5>Course Cataloge</h5>
        <div class="adminPanel">
          <p7> Administrator Features Demo</p7>
          <p7>+----------------------------+</p7>
          <table broder="0">
            <tr>
              <td width="0" valign="top">
                <p7>Add Course</p7><br>
                <form action="#nojump">
                  <label for="userInputTitle">
                    <p7>Course title</p7>
                  </label>
                  <input type="text" id="userInputTitle" value="New Course" class="adminCatalogeFormInput">
                  <label for="userInputLength">
                    <p7>Course length in months</p7>
                  </label>
                  <input type="text" id="userInputLength" value="6" class="adminCatalogeFormInput">

                  <label for="userInputPrice">
                    <p7>Price in SEK</p7>
                  </label>
                  <input type="text" id="userInputPrice" value="9999" class="adminCatalogeFormInput">
                  <label for="userInputDescription">
                    <p7>Course description</p7>
                  </label>
                  <input type="text" id="userInputDescription" value="Learn something..."
                    class="adminCatalogeFormInput">
                  <br>
                  <a href="#nojump" type="submit" onclick="catalogeAddCourse()">
                    <p8>[Submit]</p8>
                  </a>
                </form>
              </td>
              <td class="panelBorder">
                <p7>------------------------------</p7>
              </td>
              <td valign="top">
                <p7>Remove Course</p7><br>
                <form action="#">
                  <label for="userInputRemove">
                    <p7>Course number</p7>
                  </label>
                  <input type="text" id="userInputRemove" value="1" class="adminCatalogeFormInput"><br>
                  <a href="#nojump" type="submit" onclick="catalogeRemoveCourse()">
                    <p8>[Submit]</p8>
                  </a>
                </form>
              </td>
            </tr>
          </table>
        </div>
  `;
}