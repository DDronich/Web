const key = '';


const request_st = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=NOK,SCTY,TSLA,NVDA,INTC,TOPS,PLUG,MSFT,MVIS&types=quote&filter=symbol,companyName,latestPrice,latestUpdate&token=' + key;
const request_en = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=NOK,SCTY,TSLA,NVDA,INTC,TOPS,PLUG,MSFT,MVIS&types=quote&filter=latestPrice,latestUpdate&token=' + key;
let timer = 0;

let req = new XMLHttpRequest();
req.open('GET', request_st);

req.onreadystatechange = function(){
    if (req.readyState === 4 && req.status === 200){
        Table(update_time(JSON.parse(req.responseText)));
        timeUpdate = Date.now();
    }
}

req.send('');

function refreshment(data){
    for (i in data){
        for (j in data[i].quote){
            document.getElementById('main').querySelector('#'+i+'> #'+j).textContent = data[i].quote[j];
        }
    }
}

function update_time(data) {
    let temp = Date.now();
    for (i in data) {
        data[i].quote.latestUpdate = Math.round((temp - data[i].quote.latestUpdate )/10)/100;
    }
    return data;
}

function Table(data){
    let tbody = document.createElement('tbody');

    let next_update = document.createElement('span');
    next_update.id = 'timer';
    document.getElementById('main_ref').appendChild(next_update);

    for (i in data){
        let tr = document.createElement('tr');
        tr.id = i;
        for (j in data[i].quote){
            let td = document.createElement('td');
            td.id = j;
            td.textContent = data[i].quote[j];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    document.getElementById('main').appendChild(tbody);
}

let interval$ = rxjs.interval(20000)
    .subscribe( () => {
        req.open('GET', request_en);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                refreshment(update_time(JSON.parse(req.responseText)));
                timeUpdate = Date.now();
            }
        }

        req.send('');
    });

let timer$ = rxjs.interval(10000)
    .subscribe( () => {
        if (timeUpdate != 0) {
            document.getElementById('timer').textContent = Math.round((Date.now() - timeUpdate) / 100 ) / 10;
        }
    });