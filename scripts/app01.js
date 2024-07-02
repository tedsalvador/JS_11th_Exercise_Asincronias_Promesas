const path = "./data/data.json"

async function getData(){
    const response = await fetch (path)
    const data = await response.json()

    for (let index = 0; index < data.results.length; index++) {
        console.log(data.results[index].title);
    }
}

getData();