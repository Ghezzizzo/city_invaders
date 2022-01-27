const cards = [
    { // blue shooter
        x: 10,
        y: 10,
        width: 70,
        height: 85,
        draw:{
            cut:{
                x:0,
                y:0,
                width: 194,
                height: 194,
            },
            pos:{
                x:0,
                y:5,
                width: 194/2,
                height: 194/2,
            }
        },
        anim: {
            idle:{
                start: 17,
                end: 24,
            },
            shoot:{
                start: 0,
                end: 16,
            },
        },
        canShoot: true,
        shootFrame: 13,
        levitate:{
            shoot: true,
            idle: false,
        },
    },
    { // purple shooter
        x: 90,
        y: 10,
        width: 70,
        height: 85,
        draw:{
            cut:{
                x:0,
                y:0,
                width: 194,
                height: 194,
            },
            pos:{
                x:80,
                y:5,
                width: 194/2,
                height: 194/2,
            }
        },
        anim: {
            idle:{
                start: 0,
                end: 12,
            },
            shoot:{
                start: 13,
                end: 28,
            },
        },
        canShoot: true,
        shootFrame: 17,
        levitate:{
            shoot: false,
            idle: true,
        },
    },
    { // Egg shild
        x: 170,
        y: 10,
        width: 70,
        height: 85,
        draw:{
            cut:{
                x:0,
                y:0,
                width: 130,
                height: 130,
            },
            pos:{
                x:172,
                y:30,
                width: 130/2,
                height: 130/2,
            }
        },
        anim: {
            idle:{
                start: 0,
                end: 7,
            },
            
        },
        canShoot: false
    }
]

export {cards};