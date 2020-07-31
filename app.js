document.addEventListener('DOMContentLoaded', () => {


    let blocks = document.querySelectorAll('.grid div')
    let scoreSpan = document.querySelector('#score')
    // let timerSpan = document.querySelector('#timer')

    const width = 20;

    let shooterIndex = 390
    let invadersIndex = 0
    let invadersShot = []
    let invaderId
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let play = true
    // assign func to keys

    // define invaders
    const invadersArray = [
        02, 04, 05, 07, 08, 10, 11, 13, 14,
        22, 24, 25, 27, 28, 30, 31, 33, 34,
        42, 44, 45, 47, 48, 50, 51, 53, 54,
        62, 64, 65, 67, 68, 70, 71, 73, 74,

    ]
    // draw invader
    invadersArray.forEach(item =>
        blocks[invadersIndex + item].classList.add('invader')
    );

    blocks[shooterIndex].classList.add('shooter')


    // function start() {
    //     reset()
    //     // interval = setInterval(, intervalTime)
    // }
    // function reset() {

    // }

    function moveInvader() {
        const leftEdge = invadersArray[0] % width === 0
        const rightEdge = invadersArray[invadersArray.length - 1] % width === width - 1

        if ((leftEdge && direction === -1) ||
            (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if (leftEdge) direction = 1
            else direction = -1
        }

        for (let i = 0; i < invadersArray.length - 1; i++) {
            blocks[invadersArray[i]].classList.remove('invader')
            // invadersArray[i] += direction
        }
        for (let i = 0; i < invadersArray.length - 1; i++) {
            invadersArray[i] += direction
        }
        for (let i = 0; i < invadersArray.length - 1; i++) {
            if (!invadersShot.includes(i)) {
                blocks[invadersArray[i]].classList.add('invader')
            }
            // invadersArray[i] += direction
        }
        // game Over
        invadersArray.forEach((invader, i) => {
            if (invader > (blocks.length - (width - 1))) {
                clearInterval(invaderId)
                console.log('Game Over')

            }
        });
        if (blocks[shooterIndex].classList.contains('invader', 'shooter')) {
            blocks[shooterIndex].classList.add('boom')
            clearInterval(invaderId)
            console.log('Game Over')
        }

        if (invadersShot.length === invadersArray.length) {
            scoreSpan.textContent = 'You win'
        }
    }

    invaderId = setInterval(moveInvader, 500)

    function shoot(e) {
        let lasedId
        let laserIndex = shooterIndex
        function moveLaser() {
            blocks[laserIndex].classList.remove('laser')
            laserIndex -= width
            blocks[laserIndex].classList.add('laser')
            if (blocks[laserIndex].classList.contains('invader')) {
                blocks[laserIndex].classList.remove('laser')
                blocks[laserIndex].classList.remove('invader')
                blocks[laserIndex].classList.add('boom')

                setTimeout(() => blocks[laserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

                const invadertakenDown = invadersArray.indexOf(laserIndex)
                invadersShot.push(invadertakenDown)
                score++;
                scoreSpan.textContent = score
                if (laserIndex < width) {
                    clearInterval(laserId)
                    setTimeout(() => blocks[laserIndex].classList.remove('laser'), 100)
                }

            }
        }

        document.addEventListener('keydown', e => {
            if (e.keyCode === 32) {
                laserId = setInterval(moveLaser, 100)

            }
        })
    }

    function controls(e) {
        blocks[shooterIndex].classList.remove('shooter')
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                // direction = -1
                if (shooterIndex % width !== 0) shooterIndex -= 1
                break
            // case 38:
            //     direction = - width
            //     break
            case 39:
                // direction = 1
                if (shooterIndex % width < width - 1) shooterIndex += 1
                break
            // case 40:
            //     direction = width
            //     break

            // case 32:
            case 13:
                if (play) {
                    start()
                    play = false
                    // console.log(1);

                } else {
                    play = true
                    // console.log(2);
                    // reset()
                    clearInterval(interval)
                }
                break
        }
        blocks[shooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', controls)
    document.addEventListener('keydown', shoot)
})