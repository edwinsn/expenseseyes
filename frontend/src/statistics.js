// the user will have an slide for intervals

export const hist = function(data,numbreOfIntervals=0, dates=false, pricesBydates=[]){

    if(!data[0])return {labels:undefined, frecuences:undefined, totals:undefined};
    //console.log(data)
    data = data.filter(element=>!isNaN(element));

    if( !numbreOfIntervals ){
        if(unique(data).length<12)numbreOfIntervals=3
        else if(unique(data).length < 100)numbreOfIntervals = Math.floor(4+data.length/20);
        else numbreOfIntervals = 7;
    }

    //console.log("numberOfIntervals: "+numbreOfIntervals)
    let max = Math.max(...data);
    let min = Math.min(...data);

    let intervals = [];
    let frecuences = [];
    let totals = [];

    numbreOfIntervals = numbreOfIntervals>unique(data).length?unique(data).length:numbreOfIntervals

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
            labels.push(formatDate( Math.ceil(intervals[i-1])) +" : "+formatDate(aux));

            totals[i-1] = sum(pricesBydates.slice(acumulatedFrecuences, acumulatedFrecuences+frecuences[i-1]))
            acumulatedFrecuences+=parseInt(frecuences[i-1])
        }
    }else{
        for(let i=0;i<intervals.length-1;i++){
            labels.push(Math.round(intervals[i])+" - "+Math.round(intervals[i+1]))
        }

    }

    return {labels, frecuences, totals}
    
}

/* prueba hist
let data = [];
for (let i =0;i<10;i++)data.push(Math.random()*100);
console.log(hist(data))*/

const formatDate = function(date){

    let formatedDate
    date=date+""

    switch (date.slice(2,4)) {
                case "01":
                    formatedDate="20"+date.slice(0,2)+" Ene"
                    break;
                 case "02":
                    formatedDate="Feb"
                    break;
                case "03":
                    formatedDate="Mar"
                    break;
                case "04":
                    formatedDate="Abr"
                    break;
                case "05":
                    formatedDate="May"
                    break;
                case "06":
                    formatedDate="Jun"
                    break;
                case "07":
                    formatedDate="Jul"
                    break;
                case "08":
                    formatedDate="Ago"
                    break;
                case "09":
                    formatedDate="Sep"
                    break;
                case "10":
                    formatedDate="Oct"
                    break;
                case "11":
                    formatedDate="Nov"
                    break;
                default:
                    formatedDate="Dic"
                    break;
            }
    formatedDate = formatedDate+"-"+date.slice(4,6)

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
    return data.filter((datum, index, arr) => arr.indexOf(datum) === index)
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