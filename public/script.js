const API = "http://localhost:5000/api";

/* ==========================
   SIGNUP
========================== */

async function signup(){

    const username =
    document.getElementById("username").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const res = await fetch(`${API}/auth/signup`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            email,
            password
        })

    });

    const data = await res.json();

    document.getElementById("message").innerText =
    data.message;

}

/* ==========================
   LOGIN
========================== */

async function login(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data = await res.json();

    if(data.message === "Login Successful"){

        localStorage.setItem(
            "username",
            data.username
        );

        window.location.href =
        "dashboard.html";

    }
    else{

        document.getElementById("message").innerText =
        data.message;

    }

}

/* ==========================
   SAVE PROFILE
========================== */

async function saveProfile(){

    try{

        const username =
        localStorage.getItem("username");

        const profileData = {

            username,

            age:
            document.getElementById("age").value,

            gender:
            document.getElementById("gender").value,

            height:
            document.getElementById("height").value,

            currentWeight:
            document.getElementById("currentWeight").value,

            goalWeight:
            document.getElementById("goalWeight").value,

            activityLevel:
            document.getElementById("activityLevel").value,

            dietType:
            document.getElementById("dietType").value,

            goal:
            document.getElementById("goal").value

        };

        const res = await fetch(
        `${API}/profile/save`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(profileData)
        });

        const data = await res.json();

        document.getElementById("message").innerText =
        data.message;

    }
    catch(error){

        console.log(error);

        alert("Error Saving Profile");

    }

}

/* ==========================
   DASHBOARD
========================== */

async function loadDashboard(){

    try{

        const username =
        localStorage.getItem("username");

        const res = await fetch(
        `${API}/profile/dashboard/${username}`
        );

        const data = await res.json();

        let bmiStatus = "";

if(data.bmi < 18.5){

    bmiStatus = "Underweight";

}
else if(data.bmi < 25){

    bmiStatus = "Healthy Weight";

}
else if(data.bmi < 30){

    bmiStatus = "Overweight";

}
else{

    bmiStatus = "Obese";

}

document.getElementById("bmi").innerHTML =
`${data.bmi}<br><small>${bmiStatus}</small>`;

        document.getElementById("calories").innerText =
        data.calories + " kcal";

        document.getElementById("protein").innerText =
        data.protein + " g";

        document.getElementById("carbs").innerText =
        data.carbs + " g";

        document.getElementById("fats").innerText =
        data.fats + " g";

        document.getElementById("goal").innerText =
        data.goal;

    }
    catch(error){

        console.log(error);

    }

}

/* ==========================
   LOAD FOODS
========================== */

async function loadFoods(){

    try{

        const username =
        localStorage.getItem("username");

        const profileRes =
        await fetch(
        `${API}/profile/${username}`
        );

        const profile =
        await profileRes.json();

        const dietType =
        profile.dietType;

        const foodRes =
        await fetch(
        `${API}/foods`
        );

        const foods =
        await foodRes.json();

        const select =
        document.getElementById("foodSelect");

        if(!select) return;

        select.innerHTML =
        '<option value="">Select Food</option>';

        foods.forEach(food => {

            if(
                dietType === "Vegetarian" &&
                food.type === "nonveg"
            ){
                return;
            }

            const option =
            document.createElement("option");

            option.value =
            food.name;

            option.textContent =
            food.name;

            select.appendChild(option);

        });

    }
    catch(error){

        console.log(error);

    }

}

/* ==========================
   ADD FOOD
========================== */

async function addFood(){

    try{

        const username =
        localStorage.getItem("username");

        const foodName =
        document.getElementById("foodSelect").value;

        const quantity =
        Number(
        document.getElementById("quantity").value
        );

        const res =
        await fetch(
        `${API}/foods/add`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                foodName,
                quantity
            })
        });

        const data =
        await res.json();

        alert(data.message);

        loadFoodLogs();

    }
    catch(error){

        console.log(error);

        alert("Error Adding Food");

    }

}

/* ==========================
   LOAD FOOD LOGS
========================== */

async function loadFoodLogs(){

    try{

        const username =
        localStorage.getItem("username");

        const res =
        await fetch(
        `${API}/foods/logs/${username}`
        );

        const logs =
        await res.json();

        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fats = 0;

        const logsDiv =
        document.getElementById("foodLogs");

        if(!logsDiv) return;

        logsDiv.innerHTML = "";

        logs.forEach(log=>{

            calories += log.calories;
            protein += log.protein;
            carbs += log.carbs;
            fats += log.fats;

            logsDiv.innerHTML += `
            <p>
            ${log.foodName} - ${log.quantity * 100}g
            </p>
            `;

        });

        document.getElementById("totalCalories")
        .innerText =
        `Calories: ${calories.toFixed(2)} kcal`;

        document.getElementById("totalProtein")
        .innerText =
        `Protein: ${protein.toFixed(2)} g`;

        document.getElementById("totalCarbs")
        .innerText =
        `Carbs: ${carbs.toFixed(2)} g`;

        document.getElementById("totalFats")
        .innerText =
        `Fats: ${fats.toFixed(2)} g`;

    }
    catch(error){

        console.log(error);

    }

}
/* ==========================
   SAVE WEIGHT
========================== */

async function saveWeight(){

    try{

        const username =
        localStorage.getItem("username");

        const weight =
        document.getElementById("weight").value;

        const res =
        await fetch(
        "http://localhost:5000/api/progress/add",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                weight
            })
        });

        const data =
        await res.json();

        alert(data.message);

        loadProgress();

    }
    catch(error){

        console.log(error);

    }

}
/* ==========================
   LOAD PROGRESS
========================== */
async function loadProgress(){

    try{

        const username =
        localStorage.getItem("username");

        const res =
        await fetch(
        `http://localhost:5000/api/progress/${username}`
        );

        const logs =
        await res.json();

        const logsDiv =
        document.getElementById("weightLogs");

        if(!logsDiv) return;

        logsDiv.innerHTML = "";

        let labels = [];
        let weights = [];

        logs.forEach(log=>{

            labels.push(
                new Date(log.date)
                .toLocaleDateString()
            );

            weights.push(log.weight);

            logsDiv.innerHTML += `
            <p>
            ${log.weight} kg
            </p>
            `;

        });

        const canvas =
        document.getElementById("weightChart");

        if(canvas){

            new Chart(canvas,{

                type:"line",

                data:{

                    labels:labels,

                    datasets:[{

                        label:"Weight (kg)",

                        data:weights,

                        borderWidth:3

                    }]

                },

                options:{
                    responsive:true
                }

            });

        }

    }
    catch(error){

        console.log(error);

    }

}
async function loadGoalProgress(){

    try{

        const username =
        localStorage.getItem("username");

        const profileRes =
        await fetch(
        `http://localhost:5000/api/profile/${username}`
        );

        const profile =
        await profileRes.json();

        const progressRes =
        await fetch(
        `http://localhost:5000/api/progress/${username}`
        );

        const logs =
        await progressRes.json();

        if(logs.length === 0) return;

        const startWeight =
        logs[0].weight;

        const currentWeight =
        logs[logs.length - 1].weight;

        const goalWeight =
        profile.goalWeight;

        let progress = 0;

        if(profile.goal === "Fat Loss"){

            progress =
            ((startWeight - currentWeight) /
            (startWeight - goalWeight))
            * 100;

        }
        else if(profile.goal === "Muscle Gain"){

            progress =
            ((currentWeight - startWeight) /
            (goalWeight - startWeight))
            * 100;

        }

        progress =
        Math.max(
            0,
            Math.min(100, progress)
        );

        document.getElementById(
        "currentWeight"
        ).innerText =
        `Current Weight: ${currentWeight} kg`;

        document.getElementById(
        "goalWeight"
        ).innerText =
        `Goal Weight: ${goalWeight} kg`;

        document.getElementById(
        "progressPercent"
        ).innerText =
        `Progress: ${progress.toFixed(1)}%`;

    }
    catch(error){

        console.log(error);

    }

}