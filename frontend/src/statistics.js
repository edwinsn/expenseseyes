// the user will have an slide for intervals

export const hist = function(data,numbreOfIntervals=0, dates=false, prices=[]){

    if(!data[0])return {labels:undefined, frecuences:undefined, totals:undefined};
    //console.log(data)


    if( !numbreOfIntervals ){
        let n = unique(data).length
        if(n<10)numbreOfIntervals=3
        else if(n < 100)numbreOfIntervals = Math.floor(4+data.length/20);
        else numbreOfIntervals = 8;
    }

    numbreOfIntervals = numbreOfIntervals>unique(data).length?unique(data).length:numbreOfIntervals

    if(dates){
        data=data.map(d=>new Date(d))
    }

    let max = Math.max(...data);
    let min = Math.min(...data);

    if(dates){
        max= new Date(max)
        max=max.setDate(max.getDate()+2)
    }

    let intervals = [];
    let frecuences = [];
    let totals = [];


    for(let i=0;i<=numbreOfIntervals;i++) {
        intervals.push((min+(max-min)*i/numbreOfIntervals))
        frecuences.push(0)
        totals.push(0)
    }

    //posibles  datos negativos

    data.forEach(element => {
        
      for(let index=1 ;index<intervals.length; index++){

            if(element<=intervals[index]){
                frecuences[index-1] += 1;
                if(!dates){
                totals[index-1]+=parseFloat(element)
                }
                break
            }
        }
    });

    let labels=[]

    if(dates){
        let acumulatedFrecuences=0
        for(let i=1;i<intervals.length;i++){
            let aux=  Math.ceil(intervals[i-1])===Math.ceil(intervals[i])?Math.ceil(intervals[i]+1):Math.ceil(intervals[i])
            labels.push(formatDate( new Date(Math.ceil(intervals[i-1]))) +" : "+formatDate( new Date(aux)));

            totals[i-1] = sum(prices.slice(acumulatedFrecuences, acumulatedFrecuences+frecuences[i-1]))
  
            acumulatedFrecuences+=parseInt(frecuences[i-1])
        }
    }
    else{
        for(let i=0;i<intervals.length-1;i++){
            labels.push( Math.round(intervals[i])+" - "+ Math.round(intervals[i+1]))
        }

    }
    return {labels, frecuences, totals}
    
}

/* prueba hist
let data = [];
for (let i =0;i<10;i++)data.push(Math.random()*100);
console.log(hist(data))*/

const formatDate = function(date){

    let formatedDate = date.toLocaleString('default', { month: 'short' })+" "+date.getDate()

    if(date.getMonth()===0){
        formatedDate=date.getFullYear()+"/"+formatedDate
    }

    return formatedDate
}

const sum = function(data){
    if(data[0])return data.reduce((acumulator, current)=>{return acumulator+current})
    return 0 
}

/*const mean = function(data){
    return sum(data)/data.lenght;
}*/

const unique = function(data){

    return data.filter((datum, index, arr) => {
        return arr.indexOf(datum) === index})
}



const groupby = function(data, variable){
  
  let groupedData = {};
  let UniqueVariables = unique(data.map( datum => datum[variable]))

  UniqueVariables.forEach( uniqueVariable =>{
      groupedData[uniqueVariable] = data.filter(element => element[variable]===uniqueVariable) ;
    });
  return groupedData;
}
//prueba groupby1 (one variable)
/*console.log(groupby([
    {name:"David",hair:"0"},
    {name:"Edwin",hair:"1234"},
    {name:"Jhon",hair:"1234"}

],"hair"));
*/

export const groupBy = function(data, variables){

    if(!data[0])return null

    let groupedData = {"":data};
    
    variables.forEach( variable =>{

        let aux = {};

        for(let group in groupedData ){
            let newGroups = groupby(groupedData[group], variable);
        //delete groupedData[group];
            for (let key in newGroups){
              aux[group+" "+key] = newGroups[key]
            }
        }
        groupedData = Object.assign({},aux);

    });
    return groupedData;
}
/*
let data1 = [
    {name:"Jotamario",yearsOld:"100",profession:"presenter"},
    {name:"David",yearsOld:"36",profession:"programer"},
    {name:"Luis",yearsOld:"36", profession:"programer"},
    {name:"Nicolas",yearsOld:"36",profession:"programer"},
    {name:"Carolina",yearsOld:"44",profession:"Teacher"},
    {name:"Hilary",yearsOld:"41",profession:"violinist"},
    {name:"Janine",yearsOld:"43",profession:"violinist"},
    {name:"Sofia Mutter",yearsOld:"43",profession:"violinist"}
]*/

//console.log(groupBy(data1,["profession","yearsOld"]));