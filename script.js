//imports
import * as resources from './resources.js';
import * as pop from './population.js';

//defining arrays from imports
let resourceArr = resources.resources
let popBuildArr = pop.populationBuildings

//class for the entire civilization
class Civilization{
    constructor(population, unemployed, food, wood, stone, iron, silver, culture, science) {
        this.population = population;
        this.unemployed = unemployed;
        this.food = food
        this.wood = wood
        this.stone = stone
        this.iron = iron
        this.silver = silver
        this.culture = culture
        this.science = science
        this.firstWood = true
    }
    //works to take in any click resource (wood, stone, iron, food) and add to civ
    gatherResource(e) {
        e.preventDefault() 
        let resource = e.data.id
        //finding the key inside of civ class that matches the resource clicked then increasing it
        let increaseResource =Object.keys(civ).find(x => x === `${resource}`)
        civ[`${increaseResource}`]++
        //updating DOM to reflect updated civ class changes
        $(`#${resource}-count`).html(civ[`${increaseResource}`])
        //this is a check for first appearance of the hut button
        if(civ.wood >= 20){
            civ.firstWood = false;
        }
        if (civ.firstWood == false){
            $(".hut").show()
        }
        //disables and enables button if the player can/not afford the cost
        if (civ.wood < 20 && civ.firstWood == false){
            $("#hut-btn").addClass("is-disabled").prop("disabled", true)
        }
        if(civ.wood >= 20 && civ.firstWood == false){
            $("#hut-btn").removeClass("is-disabled").prop("disabled", false)
        }
    }
    //used for creating buildings with a cost
    build(e) {
        e.preventDefault()
        let buildingID = e.data.id
        let findBuild = popBuildArr.find(x =>x.name === `${buildingID}`)
        let resource = findBuild.cost.name
        if (civ[`${resource}`] >= findBuild.cost.price){
            civ[`${resource}`] = civ[`${resource}`] - findBuild.cost.price
            findBuild.count++
        if (civ.wood <= 20 && civ.firstWood == false){
            console.log("class lower than 20")
            $("#hut-btn").addClass("is-disabled").prop("disabled", true)
        }
    
            $(`#${resource}-count`).html(civ[`${resource}`])
        $(`#${findBuild.name}-count`).html(`${findBuild.count}`)
        } else {
            return
        }

        
        
       
        if(popBuildArr[0].count >= 1){
            $("#Hut-count").show()
            $("#Hut").show()
        }
       
    }
}

let civ = new Civilization(0, 0, 0, 0 ,0 ,0 ,0 ,0, 0)
let upgrade_speed = 0;
let increment = 1;
$("#wood-count").html(civ.wood)
$("#iron-count").html(civ.iron)
$("#stone-count").html(civ.stone)
$("#silver-count").html(civ.silver)
$("#culture-count").html(civ.culture)
$("#science-count").html(civ.science)
$("#food-count").html(civ.food)
$("#population-count").html(civ.population)
$("#unemployed-count").html(civ.unemployed)
$(".wood").on("click", {id: "wood"}, civ.gatherResource)
$(".stone").on("click", {id: "stone"}, civ.gatherResource)
$(".iron").on("click", {id: "iron"}, civ.gatherResource)
$(".food").on("click", {id: "food"}, civ.gatherResource)
$(".hut").on("click", {id:"Hut"}, civ.build)

if (resourceArr[0].count < 20 && civ.firstWood == true){
    $(".hut").hide()
}
if(popBuildArr[0].count < 1){
    $("#Hut-count").hide()
    $("#Hut").hide()
}