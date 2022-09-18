const objects = [
    {
        Size: [20, 20],
        Velocity: [100, 0],
        pos: [0, 0],
        color: "red"
    }
]

function updateObj(obj, deltatime)
{
    obj.pos = [
        obj.pos[0]+obj.Velocity[0]*deltatime,
        obj.pos[1]+obj.Velocity[1]*deltatime
    ]

    obj.obj.style.left = obj.pos[0]+"px"
    obj.obj.style.right = obj.pos[1]+"px"
}

objects.map((obj) => {
    const div = document.createElement("div")
    div.style.backgroundColor = obj.color
    div.style.width = obj.Size[0]+"px"
    div.style.height = obj.Size[1]+"px"
    div.style.position = "absolute"

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