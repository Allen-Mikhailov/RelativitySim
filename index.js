const startingobjects = [
    {
        Size: [20, 20],
        Velocity: [100, 0],
        Acceleration: [0, -9.8],
        pos: [0, 0],
        color: "red"
    },
    {
        Size: [50, 20],
        Velocity: [100, 0],
        Acceleration: [0, 0],
        pos: [0, 0],
        color: "green"
    },
    {
        Size: [20, 20],
        Velocity: [0, 0],
        Acceleration: [0, 0],
        pos: [300, -200],
        color: "blue"
    }
]

function copyStarting()
{
    objects = JSON.parse(JSON.stringify(startingobjects))
    relative = objects[relativeIndex]
}

var objects = []
var divObjects = []
var arrows = []
var arrowMids = []
copyStarting()

var VarsRelative = false
var relativeIndex = 1
var relative = objects[relativeIndex]

var objDataText = ""

function updateObj(index, deltatime)
{
    const obj = objects[index]
    obj.pos = [
        obj.pos[0]+obj.Velocity[0]*deltatime + .5 * obj.Acceleration[0]*deltatime*deltatime,
        obj.pos[1]+obj.Velocity[1]*deltatime + .5 * obj.Acceleration[1]*deltatime*deltatime
    ]

    obj.Velocity[0] += obj.Acceleration[0]*deltatime
    obj.Velocity[1] += obj.Acceleration[1]*deltatime

    if (VarsRelative)
        objDataText += `
    Object: ${index}
    Position: ${(obj.pos[0] - relative.pos[0]).toFixed(2)}, ${(obj.pos[1] - relative.pos[0]).toFixed(2)}
    `
    else
        objDataText += `
    Object: ${index}
    Position: ( ${obj.pos[0].toFixed(2)}, ${obj.pos[1].toFixed(2)} )
    `

    divObjects[index].style.transform = `translate(${
        Math.floor(obj.pos[0]-relative.pos[0])-obj.Size[0]/2
    }px, ${
        -(Math.floor(obj.pos[1]-relative.pos[1]) - obj.Size[1]/2)
    }px)`

    const newVel = [obj.Velocity[0] - relative.Velocity[0], obj.Velocity[1] - relative.Velocity[1]]

    arrows[index].style.width = Math.sqrt(newVel[0]*newVel[0] + newVel[1]*newVel[1])+"px"
    arrowMids[index].style.transform = `translate(${
        obj.Size[0]/2
        }px, ${
            obj.Size[1]/2
        }px)
        rotate(${Math.atan2(-newVel[1], newVel[0])}rad)`
}

objects.map((obj, index) => {
    const div = document.createElement("div")
    div.className = "shape"
    div.style.backgroundColor = obj.color
    div.style.width = obj.Size[0]+"px"
    div.style.height = obj.Size[1]+"px"
    div.style.position = "absolute"

    const arrowMid = document.createElement("div")
    arrowMid.className = "arrowMid"
    div.appendChild(arrowMid)
    

    const arrow = document.createElement("div")
    arrow.className = "velArrow"
    arrowMid.appendChild(arrow)

    const arrowRight = document.createElement("div")
    arrowRight.className = "arrowRight"
    arrow.appendChild(arrowRight)

    const arrowLeft = document.createElement("div")
    arrowLeft.className = "arrowLeft"
    arrow.appendChild(arrowLeft)
    
    arrows.push(arrow)
    arrowMids.push(arrowMid)

    div.onclick = () => {
        relativeIndex = index
        relative = objects[index]
    }

    document.body.appendChild(div)
    divObjects.push(div)
})

const objText = document.getElementById("objectText")

var lasttime = Date.now()
function update()
{
    const _time = Date.now()
    const deltatime = (_time-lasttime)/1000
    lasttime = _time

    objDataText = ""
    objects.map((obj, index) => updateObj(index, deltatime))
    objText.innerHTML = objDataText

    requestAnimationFrame(update)
}

document.getElementById("reset").onclick = () => copyStarting()

update()