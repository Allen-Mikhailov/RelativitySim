const startingobjects = [
    {
        Size: [20, 20],
        Velocity: [100, 0],
        pos: [0, 0],
        color: "red"
    },
    {
        Size: [20, 20],
        Velocity: [120, -100],
        pos: [0, 0],
        color: "green"
    }
]

function copyStarting()
{
    objects = JSON.parse(JSON.stringify(startingobjects))
}

var objects = []
copyStarting()

var relative = objects[0]

function updateObj(obj, deltatime)
{
    obj.pos = [
        Math.floor(obj.pos[0]+obj.Velocity[0]*deltatime),
        Math.floor(obj.pos[1]+obj.Velocity[1]*deltatime)
    ]
    obj.obj.style.transform = `translate(${
        obj.pos[0]-relative.pos[0]-obj.Size[0]
    }px, ${
        -(obj.pos[1]-relative.pos[1] - obj.Size[1])
    }px)`
}

objects.map((obj) => {
    const div = document.createElement("div")
    div.className = "shape"
    div.style.backgroundColor = obj.color
    div.style.width = obj.Size[0]+"px"
    div.style.height = obj.Size[1]+"px"
    div.style.position = "absolute"

    div.onclick = () => {
        relative = obj
    }

    document.body.appendChild(div)
    obj.obj = div
})

var lasttime = Date.now()
function update()
{
    const _time = Date.now()
    const deltatime = (_time-lasttime)/1000
    lasttime = _time

    objects.map((obj) => updateObj(obj, deltatime))

    requestAnimationFrame(update)
}

update()