const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'searchRecord.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'html_url', title:'HTML_URL'},
        {id: 'watchers_count', title:'WATCHERS_COUNT'},
        {id: 'stargazers_count', title:'STARGAZERS_COUNT'},
        {id: 'forks_count', title: 'FORKS_COUNT'}
    ]
});

var records = []

const alldata = async () => {
    try{
        const response = await fetch('https://api.github.com/search/repositories?q=is:public')
        //   console.log(response)
        const data = await response.json()

        // console.log(data)
            const validData = data.items.filter((data)=>{
                return (data.language === 'Python' || data.forks >= 200)

            })

        //    console.log(validData)

            validData.map((value)=>{
                if(value.stargazers_count > 2000)
                {
                    const record = {
                        name: value.name,
                        description : value.description,
                        html_url: value.html_url,
                        watchers_count: value.watchers_count,
                        stargazers_count : value.stargazers_count,
                        forks_count : value.forks_count
                    }

                    records.push(record)
                }

            })

            console.log(records)
            
            await csvWriter.writeRecords(records)
    }catch(err){
        console.log('Error')
    }
}
alldata()