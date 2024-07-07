import data from "../data/data";

export default async function fetchData(){

    let dataFetched;

    try{
        let data = await fetch(`https://api.github.com/orgs/mozilla/members?page=1`);
        dataFetched = await data.json();
        return dataFetched;

    }catch(e){
        console.log("ERROR", e, `gettingData from Local`);
        //Adding condtion if API call 
        dataFetched = data;
        return dataFetched;
    }
      
}