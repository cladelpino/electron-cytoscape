const cytoscape = require('cytoscape');
const uuid = require('uuid');

document.addEventListener('DOMContentLoaded', function() {
    let graphStyleSheet = [
        {
            selector: 'node.DateNodes',
            style: {
                'content': 'data(readableDate)',
                "text-valign": "top",
                "min-height": "60px",
                "text-halign": "center"
            }
        },
        {
            selector: 'node.TaskNodes',
            style: {
                // 'content': function(ele) {return ele.id().substring(0,3)},
                'content':'data(lbl)',
                'text-wrap':'wrap',
                'text-justification':"left",
                // 'text-max-width':"150px",
                "text-valign": "top ",
                "text-halign": "right"
            }
        },
        {
            selector: 'node.TaskNodes',
            style: {
                'background-color': 'red',
                // so fucking slow.. no thanks ?
                'background-blacken':'mapData(score,0,1,-0.6,0.2)'
            }
        },
        {
            selector: 'node.Open',
            style: {
                'border-width':"5px",
                'border-color': 'green',
            }
        },
        {
            selector: 'node.Chosen',
            style: {
                'border-width':"5px",
                'border-color': 'red',
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle'
            }
        },
        {
            selector: 'edge.hidden',
            style: {
                // 'line-color': 'red'
                'visibility':'hidden'
            }
        }
    ];

    //    Object.keys(projDict).forEach((e)=>graphStyleSheet.push({selector:"node.proj_"+e,style:{"background-color":projDict[e]}}));

    
    // let layoutOptions = {name:'fcose',quality:"proof",fit:true,uniformNodeDimensions:true,samplingType:false};
    // let layoutOptions = {name:"breadthfirst",animate:"true",fit:"true",directed:"true",maximal:"true",grid:"true",spacingFactor:1.3};
    let layoutOptions = {name:"dagre", animate:"true",rankDir:'LR',rankSep:117};
    // ,rankSep:150,edgeSep:50,edgeWeight: function(edge){return edge.hasClass('hidden')?1:100;}};
    
    // let layoutOptions = {
    //     name: 'cose',
      
    //     // Called on `layoutready`
    //     ready: function(){},
      
    //     // Called on `layoutstop`
    //     stop: function(){},
      
    //     // Whether to animate while running the layout
    //     // true : Animate continuously as the layout is running
    //     // false : Just show the end result
    //     // 'end' : Animate with the end result, from the initial positions to the end positions
    //     animate: true,
      
    //     // Easing of the animation for animate:'end'
    //     animationEasing: undefined,
      
    //     // The duration of the animation for animate:'end'
    //     animationDuration: undefined,
      
    //     // A function that determines whether the node should be animated
    //     // All nodes animated by default on animate enabled
    //     // Non-animated nodes are positioned immediately when the layout starts
    //     animateFilter: function ( node, i ){ return true; },
      
      
    //     // The layout animates only after this many milliseconds for animate:true
    //     // (prevents flashing on fast runs)
    //     animationThreshold: 250,
      
    //     // Number of iterations between consecutive screen positions update
    //     refresh: 20,
      
    //     // Whether to fit the network view after when done
    //     fit: true,
      
    //     // Padding on fit
    //     padding: 30,
      
    //     // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    //     boundingBox: undefined,
      
    //     // Excludes the label when calculating node bounding boxes for the layout algorithm
    //     nodeDimensionsIncludeLabels: true,
      
    //     // Randomize the initial positions of the nodes (true) or use existing positions (false)
    //     randomize: false,
      
    //     // Extra spacing between components in non-compound graphs
    //     componentSpacing: 40,
      
    //     // Node repulsion (non overlapping) multiplier
    //     nodeRepulsion: function( node ){ return 2048; },
      
    //     // Node repulsion (overlapping) multiplier
    //     nodeOverlap: 4,
      
    //     // Ideal edge (non nested) length
    //     idealEdgeLength: function( edge ){ return 32; },
      
    //     // Divisor to compute edge forces
    //     edgeElasticity: function( edge ){ return 32; },
      
    //     // Nesting factor (multiplier) to compute ideal edge length for nested edges
    //     nestingFactor: 1.2,
      
    //     // Gravity force (constant)
    //     gravity: 1,
      
    //     // Maximum number of iterations to perform
    //     numIter: 1000,
      
    //     // Initial temperature (maximum node displacement)
    //     initialTemp: 1000,
      
    //     // Cooling factor (how the temperature is reduced between consecutive iterations
    //     coolingFactor: 0.99,
      
    //     // Lower temperature threshold (below this point the layout will end)
    //     minTemp: 1.0
    //   };
    
    
    // document.addEventListener('DOMContentLoaded', function () {
        
        // initDB();
        let initObj = {
            container: document.getElementById('cy'),
            style: graphStyleSheet,
            minZoom:0.9,
            maxZoom:0.9,
        }

    
    // document.getElementById("uidtextbox").addEventListener("change",(e)=>{

    //         console.log("running");
            
    //         console.log(cy);

    //         dateArray = cy.$(".DateNodes").map((e)=>parseInt(e.data("id")));

    //         cy.$(".TaskNodes").on("select",popperHandler);

    //         if(dateArray.length>0){updateView();};
    //     });

const cy = window.cy = cytoscape(initObj);

        document.getElementById('btn').addEventListener('click',(e)=>{
            let dateNow = getDateString(new Date());
            // if(dateArray.indexOf(getDateValue(dateNow))<0){
            //     cy.add({ group: 'nodes' , data: {id: getDateValue(dateNow).toString(),readableDate:new Date(getDateValue(dateNow)).toDateString()},classes:["DateNodes"]});
            //     dateArray.push(getDateValue(dateNow));
            // };
            let name = uuid.v4();
            
            nodeSpec = { group: 'nodes' , data: {
                score: 0,
                Put:0,
                id: name,
                desc: name.substring(0,3),
                date: getDateValue(dateNow).toString(),
                parent:getDateValue(dateNow).toString()
                },
                classes:["TaskNodes"]};

                console.log(cy.$().nodes().length);


            let a = cy.add(nodeSpec);

            console.log(a);

            a.data("lbl",generateNodeLabel(a)).on('select',popperHandler);
            updateView();
        });

    // function regenerateDateEdges(){
    //     // get all date edges and delete them
    //     cy.remove("edge[date]")
    //     dateArray.sort();
    //     // generate the array of objects specifying the date edges
    //     let specArray = [];
    //     for(let i=0;i<dateArray.length-1;i++){

    //         let currString = '[date = "'+dateArray[i].toString()+'"]';

    //         cy.$(currString).forEach((node)=>{

    //             node.data()["score"] = calculateScore(node);

    //             // Guaranteed to be > 0... by checking when it overlaps and forcing adding missing..
    //             // e.data()["workLeft"] = e.data()["Missing"]-e.data()["Put"];

    //             if(node.outgoers(currString).length==0){
    //                 let sucString = 'node[date="'+dateArray[i+1].toString()+'"]';
    //                 cy.nodes(sucString).filter(target=>target.incomers(sucString).length==0).forEach(target=>{
    //                     specArray.push({data:{source:node.id(),target:target.id(),date:"true"}});
    //                 });
    //             }
    //             // cy.$('node[date="'+dateArray[i+1].toString()+'"]').forEach((g)=>{
    //             //     specArray.push({data:{source:node.id(),target:g.id(),date:"true"}});
    //             // });
    //         })
    //     }
    //     // the nodes of the last date recieve their format too..
    //     currString = '[date = "'+ dateArray[dateArray.length-1].toString() +'"]';
    //     cy.$(currString).forEach((e)=>{
    //         e.data()["score"]=calculateScore(e);
    //     })

    //     // Before adding date edges, trasverse to set the weight...

    //     let intNodes = cy.nodes(".TaskNodes");
    //     let maxVal = intNodes.roots().reduce((p,n)=>{
    //         let nowScore =  n.data()["score"];
    //         let succSumScore = n.successors().nodes().reduce((p,e)=>{
    //                                 p+=e.data()["score"];
    //                                 e.data()["weight"]=0;
    //                                 e.removeClass(["Open","Chosen"]);
    //                                 return p;   
    //                             }
    //                             ,0);
    //         n.data()["weight"] = nowScore + succSumScore;
    //         n.addClass(["Open"]).removeClass(["Chosen"]);
    //         p += nowScore + succSumScore;
    //         return p;
    //     },0);

    //     let chosenMarked = false;
    //     let randomVal = Math.random();
    //     let accum = 0;
        
    //     if(maxVal>0){
    //         intNodes.forEach((e)=>{
    //             e.data()["norm-weight"]=e.data()["weight"]/maxVal;
    //             accum += e.data()["norm-weight"];
    //             e.removeClass("Chosen");
    //             if(!chosenMarked && accum>randomVal){
    //                 e.addClass("Chosen");
    //                 chosenMarked = true;
    //             };
    //             e.style('width',50+e.data()["norm-weight"]*30+"px");
    //             e.style('height',50+e.data()["norm-weight"]*30+"px");
    //         });
    //     }
    //     cy.add(specArray).addClass('hidden');
    // }

    function updateView(){
    //     if(dateArray.length==0){storeGraph();return false;}
    //     regenerateDateEdges();
    //     cy.$().difference('.DateNodes').layout(layoutOptions).run();
    //     // cy.$().layout(layoutOptions).run();
    //     storeGraph();
    console.log("update");
    }

    function generateNodeLabel(node, nChar = 23){
        let dObj = node.data();
        let timeLeft = hoursToText(getWorkHoursLeft(parseInt(dObj["date"])));
        let hM = 0;
        let descPart = dObj["desc"].length>nChar?dObj["desc"].substring(0,nChar)+"...":dObj["desc"];
        return  (hM ==="?"?"?":hoursToText(hM)) +" | "+timeLeft+"\n"+descPart;
    }

    // function dateChangeHandler(e){

    //     let currNode = cy.$('[id = "'+e.target.id+'"]');
    //     let oldDate = currNode.data("date");
    //     let oldParent = currNode.parent();
    //     let newValue = e.target.value;

    //     if(dateArray.indexOf(getDateValue(newValue))<0){
    //         dateArray.push(getDateValue(newValue));
    //         cy.add({ group: 'nodes', data: {id:getDateValue(newValue).toString(),readableDate:new Date(getDateValue(newValue)).toDateString()},classes:["DateNodes"]});
    //     };

    //     currNode.move({'parent':getDateValue(newValue).toString()});

    //     currNode.data("date",getDateValue(newValue).toString()).data("lbl",generateNodeLabel(currNode));

    //     if (oldParent.isChildless()){
    //         dateArray.splice(dateArray.indexOf(parseInt(oldDate)),1);
    //         oldParent.remove();
    //     }

    //     updateView();
    // }


    function updateScore(whichNode){
        cy.$("#"+whichNode).data()["score"] = calculateScore(cy.$("#"+whichNode));
        updateView();
    }

    function createTaskContainer(nodeID){

        let baseNode = document.createElement("div");
        let nowElem,nowInner;
        let nodeObj = cy.$("#"+nodeID);
        let parentNodeObj = nodeObj.parent();
        let dataObj = nodeObj.data();

        baseNode.id = nodeID;
        baseNode.style.backgroundColor = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        baseNode.className = "tCGrid";
        
        baseNode.appendChild(createTCItem());
    
        nowElem = createTCItem();
        nowElem.innerText = "Proj:";
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();

        nowInner = document.createElement("select");

        selected = "proj" in dataObj?dataObj["proj"]:"";

        fillDD(Object.keys(projDict),nowInner,selected);
        nowInner.id = nodeID;

        nowInner.addEventListener('change',(e)=>{
            nodeObj.removeClass(Object.keys(projDict).map((e)=>"proj_"+e)).addClass("proj_"+e.target.value).data("proj",e.target.value);
            storeGraph();
        });

        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
        nowElem = createTCItem();

        nowInner = document.createElement("button");
        // add dependent task
        nowInner.innerText = "->";
        nowInner.id = nodeID;
        nowInner.addEventListener('click',()=>{
            let nowTargetEdgeAndNode = nodeObj.outgoers();

            nowTargetEdgeAndNode.edges().remove();

           let name = uuidv4();
            let a = cy.add([
                { 
                    data: { 
                        id: name,
                        score:0,
                        Put:0,
                        desc: name.substring(0,3),
                        date: dataObj["date"],
                        proj: dataObj["proj"],
                        parent: dataObj["parent"]
                    },
                    classes:["TaskNodes","proj_"+dataObj["proj"]]
                },
                { 
                    data: {
                    // inferred as an edge because `source` and `target` are specified:
                    source: nodeObj.id(), // the source node id (edge comes from this node)
                    target: name // the target node id (edge goes to this node)
                    }
                },
                { 
                    data: {
                    // inferred as an edge because `source` and `target` are specified:
                    source: name, // the source node id (edge comes from this node)
                    target: nowTargetEdgeAndNode.nodes().id() // the target node id (edge goes to this node)
                    }
                }
            ]).nodes();

            a.data("lbl",generateNodeLabel(a)).on('select',popperHandler);
            updateView();

        });
        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
    
        // nowElem = createTCItem();
        // nowInner = document.createElement("button");
        // // add dependent task
        // nowInner.innerText = "/>";
        // nowInner.id = nodeID;
        // nowInner.addEventListener('click',()=>{
        //     let name = uuidv4();
        //     let a = cy.add([
        //         { 
        //             data: { 
        //                 id: name,
        //                 score:0,
        //                 Put:0,
        //                 desc: name.substring(0,3),
        //                 // lbl: "? | "+hoursToText(getWorkHoursLeft(parseInt(dataObj["date"])))+" | "+ name.substring(0,3),
        //                 date: dataObj["date"],
        //                 proj: dataObj["proj"],
        //                 parent: dataObj["parent"]
        //             },
        //             classes:["TaskNodes","proj_"+dataObj["proj"]]
        //         },
        //         { 
        //             data: {
        //             // inferred as an edge because `source` and `target` are specified:
        //             source: nodeObj.id(), // the source node id (edge comes from this node)
        //             target: name // the target node id (edge goes to this node)
        //             }
        //         }
        //     ]).nodes();

        //     a.data("lbl",generateNodeLabel(a)).on('select',popperHandler);
        //     updateView();

        // });
        // nowElem.appendChild(nowInner);
        // baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        nowInner = document.createElement("button")
        nowInner.innerText = "->"
        nowInner.addEventListener('click',addNodeBefore);
        nowInner.id = nodeID;
        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        nowElem.innerText = "Desc:"
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        nowInner = document.createElement("textarea");
        nowInner.rows = 3;
        // inputNode.cols = 40;
        // inputNode.id = parentID+"taskDesc";
        nowInner.value = "desc" in dataObj?dataObj["desc"]:"";
        nowInner.addEventListener('change',(e)=>{
            nodeObj.data("desc",e.target.value).data("lbl",generateNodeLabel(nodeObj));
            storeGraph();
        });
        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
    
        baseNode.appendChild(createTCItem());
    
        baseNode.appendChild(createTCItem()); 
    
        nowElem = createTCItem();
        nowElem.innerText = "Date:"
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        nowInner = document.createElement("input");
        nowInner.type = "date";
        nowInner.id =nodeID;
        nowInner.value = "date" in dataObj?getDateString(new Date(parseInt(dataObj["date"]))):"";
        nowInner.addEventListener('change',(e)=>dateChangeHandler(e));

        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
        baseNode.appendChild(createTCItem());
    
        nowElem = createTCItem();
        nowInner = document.createElement("button");
        nowInner.innerHTML = "Del";
        nowInner.addEventListener('click',()=>{
            // console.log("┌∩┐(◣_◢)┌∩┐");
            let pred = nodeObj.incomers().nodes();
            let succ = nodeObj.outgoers().nodes();
            if(pred.length!==0 && succ.length!==0){
                // console.log("this node has both pred and succ");
                cy.add({data:{source:pred.id(),target:succ.id()}});
            }
            nodeObj.remove();
            if(parentNodeObj.isChildless()){parentNodeObj.remove();dateArray.splice(dateArray.indexOf(parseInt(parentNodeObj.id())),1);};
            clearPopper(nodeID);
            updateView(); 
        });
        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        nowElem.innerText = "Est:"
        baseNode.appendChild(nowElem);
    
        nowElem = createTCItem();
        
        nowInner = document.createElement("select");

        selected = "Est" in dataObj?hoursToText(dataObj["Est"]):"";
        
        componentID = "Est"
        nowInner.id = nodeID+"_"+componentID;
        fillDD(Object.keys(timeEstDict),nowInner,selected);

        nowInner.addEventListener('change',(e)=>{
            // let nodeID = e.target.id.substring(0,e.target.id.indexOf("_"));
            nodeObj.data("Est",timeEstDict[e.target.value]).data("lbl",generateNodeLabel(nodeObj));

            updateScore(nodeID);
        });

        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);

        nowElem = createTCItem();
        nowInner = document.createElement("button");
        nowInner.innerText = "x";

        nowInner.addEventListener('click',(e)=>clearPopper(e.target.id));
        nowInner.id = nodeID;
        nowElem.appendChild(nowInner);
        baseNode.appendChild(nowElem);

        document.body.appendChild( baseNode );
        return baseNode;
    }

    // var popperA = a.popper({
    //     // content: function(){ return makeDiv('Sticky position div');}
    //     content: function(){
    //         let tC = createTaskContainer(a.id(),{});
    //         console.log(tC);return tC;},
    //     popper: {placement: 'left'}
    // });

    // var updateA = function(){
    //     popperA.scheduleUpdate();
    // };

    // a.on('position', updateA);
    // cy.on('pan zoom resize', updateA);

    // var popperB = b.popper({
    //     content: function(){ return makeDiv('One time position div'); }
    // });

    // var popperAB = ab.popper({
    //     content: function(){ return makeDiv('Sticky position div'); }
    // });

    // var updateAB = function(){
    //     popperAB.scheduleUpdate();
    // };

    // ab.connectedNodes().on('position', updateAB);
    // cy.on('pan zoom resize', updateAB);

    function addNodeBefore(clickEvent){

        let name = uuidv4();

        // The date value will already exist, because it will inherit the parent date.
        let dependentTaskID = clickEvent.target.id;
        let depTaskData = cy.$("#"+dependentTaskID).data();
        
        let nowDate = depTaskData["date"];
        // console.log(nowDate);
        // console.log(getWorkHoursLeft(nowDate));
        // console.log(hoursToText(getWorkHoursLeft(nowDate)));
        let fpL = hoursToText(getWorkHoursLeft(parseInt(nowDate)));
        
        // console.log(fpL);

        let a = cy.add([
            { data: { 
                    id: name,
                    score:0,
                    Put:0,
                    desc: name.substring(0,3),
                    date: depTaskData["date"],
                    // lbl: "? | "+fpL+" | "+name.substring(0,3),
                    proj: depTaskData["proj"],
                    parent: depTaskData["parent"]
                },
                classes:["TaskNodes","proj_"+depTaskData["proj"]]
            },
            { // edge e1
                data: {
                // id: 'e1',
                // inferred as an edge because `source` and `target` are specified:
                source: name, // the source node id (edge comes from this node)
                target: dependentTaskID // the target node id (edge goes to this node)
                // (`source` and `target` can be effectively changed by `eles.move()`)
                }
            }
        ]).nodes();
        
        a.data("lbl",generateNodeLabel(a)).on('select',popperHandler);
        // a.on('unselect',(e)=>clearPopper(e.target));

        updateView();

        // var popperA = a.popper({
        //     // content: function(){ return makeDiv('Sticky position div');}
        //     content: function(){
        //         let tC = createTaskContainer(a.id(),{});
        //         console.log(tC);
        //         return tC;
        //     },
        //     popper: {placement: 'left'}
        // });
        // var updateA = function(){
        //     popperA.scheduleUpdate();
        // };
        // a.on('position', updateA);
        // cy.on('pan zoom resize', updateA);
    }



function showPopper(a){
    var popperA = a.popper({
        // content: function(){ return makeDiv('Sticky position div');}
        content: function(){
            // let tC = createTaskContainer(a.id(),a.id() in data?data[a.id()]:{});
            let tC = createTaskContainer(a.id());return tC;},
        popper: {placement: 'bottom-end', removeOnDestroy : "true"}
    });
    // console.log(popperA.removeOnDestroy);
    // popperA.removeOnDestroy = true;
    var updateA = function(){
        popperA.scheduleUpdate();
    };
    a.on('position', updateA);
    cy.on('pan zoom resize', updateA);
    return popperA;
}

function popperHandler(e){
    if( !(e.target.id() in popperDict)) {
        popperDict[e.target.id()]=showPopper(e.target);
    }
}

function clearPopper(id){
    popperDict[id].destroy();
    delete popperDict[id];
}

function storeGraph() {
    docRef.set({grafo: cy.elements().jsons()});
    // let documentName = "agraph";
    // let todo = {
    //     _id: documentName,
    //     title: documentName,
    //     data: cy.elements().jsons()
    // }
    // db.get(documentName).then((doc)=>{todo["_rev"]=doc._rev;}).finally(()=>{
    //     db.put(todo,{force:true},(err,res)=>{console.log(err);console.log(res);})
    // });
}

// });
});