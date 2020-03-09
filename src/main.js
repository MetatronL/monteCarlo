// https://en.wikipedia.org/wiki/Craps

/*
    Reguli Craps:

    Daca suma este 7 sau 11 => castig
    Daca suma este 2, 3 sau 12 => piedere

    Altfel
        - Se arunca zarurile pana suma este chiar suma initiala (castig) sau 7 (pierdere)
*/


// Craps Game


function startGameScraps({
    numar_teste = 10000000,
} = {})
{
    if (window._game_is_running)
    {
        console.log("[Internal error] An test is already running. Please wait.")
        return;
    }

    const startTime = performance.now();
    window._game_is_running = true;

    let numar_partide_castigate = 0;

    // retin sansa de castig la pasul curent in vectorul arrWinRate
    const arrWinRate = emptyArray(numar_teste);

    const handleGameEnd = (bWinner, index_test) => {
        if (bWinner)
        {
            ++numar_partide_castigate;
        }

        // daca a castigat, incrementez numarul de castiguri
        // apoi salvez rata curenta
        arrWinRate[index_test] = numar_partide_castigate / (index_test + 1);
    };

    for (let index_test = 0; index_test < numar_teste; ++index_test)
    {
        let zar_1 = randomDice(6);
        let zar_2 = randomDice(6);

        const suma_initiala = zar_1 + zar_2

        // verificam daca a castigat din prima aruncare de zaruri
        if (suma_initiala == 7 || suma_initiala == 11)
        {
            handleGameEnd(true, index_test);
            continue;
        }

        // verificam daca a pierdut din prima aruncare de zaruri
        if (suma_initiala == 2 || suma_initiala == 3 || suma_initiala == 12)
        {
            handleGameEnd(false, index_test);
            continue;
        }

        while(true)
        {
            let zar_1 = randomDice(6);
            let zar_2 = randomDice(6);

            const suma = zar_1 + zar_2;

            if (suma === suma_initiala)                 // castig
            {
                handleGameEnd(true, index_test);
                break;
            }

            if (suma === 7)                             // pierdere
            {
                handleGameEnd(false, index_test);
                break;
            }
        }
    }

    WriteOutput({
        numar_partide_castigate,
        numar_teste,
        startTime,
        arrWinRate,
        gameName: "Craps",
    });

    window._game_is_running = false;
}


function WriteOutput({
    numar_partide_castigate,
    numar_teste,
    startTime,
    arrWinRate,
    gameName,
} = {})
{
    const totalTime = performance.now() - startTime;

    const outputDiv = document.querySelector("._game_output_inner");

    const rata_de_castig = numar_partide_castigate / numar_teste;
    console.log(`Rata de castig pentru un numar de ${numar_teste} teste este: ${rata_de_castig}`);
    console.log(`Timp total: ${totalTime}`);

    const newEntry = document.createElement("div");
    newEntry.innerText = `
        ${new Date().toLocaleTimeString()}
        ${gameName}: sansa matematica de castig este 0.492929

        Rata de castig pentru un numar de ${numar_teste} teste este: ${rata_de_castig}

        100 => ${arrWinRate[100]}
        1000 => ${arrWinRate[1000]}
        10000 => ${arrWinRate[10000]}
        100000 => ${arrWinRate[100000]}
        500000 => ${arrWinRate[500000]}
        900000 => ${arrWinRate[900000]}

        Timp: ${totalTime}
        _________________
    `;

    outputDiv.insertBefore(newEntry, outputDiv.firstChild);
}



function startPenneyGame({
    numar_teste,
    template1,
    template2,
} = {})
{
    if (window._game_is_running)
    {
        console.log("[Internal error] An test is already running. Please wait.")
        return;
    }

    // const template1 = prompt("Va rog sa oferiti o combinatie de 3 litere [T, H] (ex: TTH, TTT, HTH) pentru playerul 1.");
    // const template2 = prompt("Va rog sa oferiti o combinatie de 3 litere [T, H] (ex: TTH, TTT, HTH) pentru playerul 2.");


    let numar_partide_castigate = 0;

    const letter = (index) => (index === 1 ? "T" : "H");
    const newLetter = () => letter(randomDice(2));

    for (let index_test = 0; index_test < numar_teste; ++index_test)
    {
        let current_coins = newLetter() + newLetter() + newLetter();

        // player 1 castiga
        if (current_coins === template2)
        {
            ++numar_partide_castigate;
            continue;
        }

        // player 1 pierde
        if (current_coins === template1)
        {
            continue;
        }

        // se continue pana player 1 castiga sau pierde
        while(true)
        {
            current_coins = current_coins.substr(1, 2) + newLetter();

            // player 1 castiga
            if (current_coins === template2)
            {
                ++numar_partide_castigate;
                break;
            }

            // player 1 pierde
            if (current_coins === template1)
            {
                break;
            }
        }
    }


    const rata_de_castig = numar_partide_castigate / numar_teste;
    window._game_is_running = false;

    return rata_de_castig;
}




function startPenneyGameWrapper({
    numar_teste = 10000,
} = {})
{
    const elTable = document.createElement("table");
    elTable.innerHTML = `
        <thead></thead>
        <tbody></tbody>
    `;

    elTable.style.borderSpacing = "0.2rem 0.5rem";


    const elTHead = elTable.querySelector("thead");
    const elTBody = elTable.querySelector("tbody");

    const combinatii = [
        "TTT",
        "TTH",
        "THT",
        "THH",
        "HTT",
        "HTH",
        "HHT",
        "HHH",
    ];

    // const elRowHeader = document.createElement("tr");
    elTHead.innerHTML = "<th> X </th>" + combinatii.map((text) => `<th>${text}</th>`).join(" ");

    const cache = new Array(8).fill(new Array(8));


    for (let row_iterator = 0 ; row_iterator < combinatii.length; ++row_iterator)
    {
        const elRow = document.createElement("tr");
        elRow.innerHTML = `
            <td>${combinatii[row_iterator]}</td>
        `;

        for (let col_iterator = 0 ; col_iterator < combinatii.length; ++col_iterator)
        {
            const elCol = document.createElement("td");

            if (row_iterator > col_iterator)
            {
                elCol.innerText = Number(1 - cache[col_iterator][row_iterator]).toPrecision(3);
            }
            else if (row_iterator === col_iterator)
            {
                elCol.innerText = 0;
            }
            else
            {
                const results = startPenneyGame({
                    template1: combinatii[row_iterator],
                    template2: combinatii[col_iterator],
                    numar_teste: 100000,
                });

                cache[row_iterator][col_iterator] =  Number(results).toPrecision(3);
                elCol.innerText = cache[row_iterator][col_iterator];
            }
            elRow.appendChild(elCol);
        }

        elTBody.appendChild(elRow);
    }

    const outputDiv = document.querySelector("._game_output_inner");

    outputDiv.insertBefore(elTable, outputDiv.firstChild);
}





// utils

function ToggleGameSelector()
{
    window.gameSelectorshown = !window.gameSelectorshown;

    if (window.gameSelectorshown)
    {
        document.querySelector("._game_selector").style.display = "";
        document.querySelector("._start_button").disabled = true;
    }
    else
    {
        document.querySelector("._game_selector").style.display = "none";
        document.querySelector("._start_button").disabled = false;
    }
}

function gameSelected( strGame = null)
{
    const arrSupportedGames = [
        "craps",
        "penney",
    ];

    if (arrSupportedGames.includes(strGame))
    {
        if (window.gameSelectorshown)
        {
            ToggleGameSelector();
        }

        if ( strGame === "craps" )
        {
            setTimeout(
                () => startGameScraps(),
                200
            );
        }

        else if ( strGame === "penney" )
        {
            setTimeout(
                () => startPenneyGameWrapper(),
                200
            );
        }
    }
    else
    {
        throw new Error(`[Internal Error] Unhandle game detected! [${strGame}]`);
    }
}



function randomDice(_max)
{
    return Math.ceil(Math.random() * _max) ;
}

function emptyArray(_length)
{
    return Array.from({length: _length}, () => 0);
}
