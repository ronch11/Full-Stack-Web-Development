let table = document.getElementById('scores-table');


let tamplate;
let username;
let score;
let counter = 0;

for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    try {
        user = JSON.parse(localStorage.getItem(element));
    if (user['score'] != undefined) {
        tamplate = `
            <tr>
                <td>${++counter}</td>
                <td>${user['username']}</td>
                <td>${user['score']}</td>
            </tr>
        `;
        table.innerHTML += tamplate;     
    }
    } catch (error) {
        //do nothing
    }
    
}