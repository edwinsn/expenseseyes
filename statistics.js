// the user will have an slide for intervals

const hist = function(data,numbreOfIntervals=0){

    if( !numbreOfIntervals ){
        if(data.lenght < 100)numbreOfIntervals = Math.ceil(5+data.lenght/20);
        else numbreOfIntervals = 10;
    }

    let max = Math.max(...data);
    let min = Math.min(...data);
    intervals = [];
    frecuences = [];

    for(let i=1;i<=numbreOfIntervals;i++) {
        intervals.push(min+max*i/numbreOfIntervals)
        frecuences.push(0)
    }

    //posibles  datos negativos

    data.forEach(element => {
        
        for(point in intervals){
            if(element<intervals[point]){
                position = Math.round((intervals[point]-min)*numbreOfIntervals/max)-1;
                frecuences[position] += 1;
                break;
            }
        }
    });
    return {"intervals":intervals, "frecuences":frecuences}
}

/* prueba hist
let data = [];
for (let i =0;i<10;i++)data.push(Math.random()*100);
console.log(hist(data))*/

const sum = function(data){
    return data.reduce((acumulator, current)=>{acumulator+current})
}

const mean = function(data){
    return sum(data)/data.lenght;
}

const unique = function(data){
    return data.filter((datum, index, arr) => arr.indexOf(datum) === index)
}

const groupby = function(data, variable){
  
  let groupedData = {};
  UniqueVariables = unique(data.map( datum => datum[variable]))

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

const groupBy = function(data, variables){
    
    groupedData = [data];
    
    variables.forEach( variable =>{

        let aux = {};

        for( group in groupedData ){
            let newGroups = groupby(groupedData[group], variable);
        //   delete groupedData[group];
            for (key in newGroups){
              aux[group+" "+key] = newGroups[key]
            }
            
        }
        groupedData = Object.assign({},aux);

    });
    return groupedData;
}

data1 = [
    {name:"Jotamario",yearsOld:"100",profession:"presenter"},
    {name:"David",yearsOld:"36",profession:"programer"},
    {name:"Luis",yearsOld:"36", profession:"programer"},
    {name:"Nicolas",yearsOld:"36",profession:"programer"},
    {name:"Carolina",yearsOld:"44",profession:"Teacher"},
    {name:"Hilary",yearsOld:"41",profession:"violinist"},
    {name:"Janine",yearsOld:"43",profession:"violinist"},
    {name:"Sofia Mutter",yearsOld:"43",profession:"violinist"}
    
]

console.log(groupBy(data1,["profession","yearsOld"]));

//add some try and undefine lines