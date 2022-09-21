const startingobjects = [
    {
        Size: [20, 20],
        Velocity: [100, 0],
        Acceleration: [0, 1],
        pos: [0, 0],
        color: "red"
    },
    {
        Size: [20, 20],
        Velocity: [100, -50],
        Acceleration: [100, 0],
        pos: [0, 0],
        color: "green"
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

var relativeIndex = 0
var relative = objects[relativeIndex]

function updateObj(index, deltatime)
{
    const obj = objects[index]
    obj.pos = [
        obj.pos[0]+obj.Velocity[0]*deltatime + .5 * obj.Acceleration[0]*deltatime*deltatime,
        obj.pos[1]+obj.Velocity[1]*deltatime + .5 * obj.Acceleration[1]*deltatime*deltatime
    ]

    obj.Velocity[0] += obj.Acceleration[0]*deltatime
    obj.Velocity[1] += obj.Acceleration[1]*deltatime


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

var lasttime = Date.now()
function update()
{
    const _time = Date.now()
    const deltatime = (_time-lasttime)/1000
    lasttime = _time

    objects.map((obj, index) => updateObj(index, deltatime))

    requestAnimationFrame(update)
}

document.getElementById("reset").onclick = () => copyStarting()

update()