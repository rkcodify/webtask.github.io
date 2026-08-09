async function user() {
    try {
        const response = await fetch("/user");

        const userdata = await response.json();

        console.log(userdata);

        if (userdata.user) {

            const data1 = userdata.user;

            const login = document.querySelector(".login");
            const welcomecontent =
                document.querySelector("#welcomecontent");

            welcomecontent.innerHTML =
                `<p>Welcome <strong>${data1}</strong>, thanks for signing up</p>
                 <p>Click on <strong>COURSES</strong> and</p>
                 <p>Start your Codify journey with us &#128512;</p>`;

            login.innerHTML =
                `<span>${data1}</span>
                 <a href="/logout">
                    <button id="signup">logout</button>
                 </a>`;

            login.style.fontSize = "1.5rem";
            login.style.color = "white";

            welcomecontent.style.marginTop = "100px";
        }

    } catch (error) {
        console.log("We have an error");
        console.log(error);
    }
}

user();