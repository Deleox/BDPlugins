/**
 * @name Shooting Stars
 * @description Adds a section to the Discord #app-mount area with the ID "ShootingStars"
 * @version 1.0.0
 * @author Deleox001
 * @authorId 1156430974008184962
 * @source https://github.com/Deleox/BDPlugins/blob/main/ShootingStars/ShootingStars.plugin.js
 */

class ShootingStars {
    constructor() {}

    load() {
        BdApi.showToast('Shooting Stars Loaded');
    }

    start() {
        BdApi.showToast('Started Shooting your Stars');
        this.addSection();
    }

    stop() {
        BdApi.showToast('Stopped');
        this.removeSection();
        this.unpatchAll();
    }

    addSection() {
        // Create a new div element with the ID "ShootingStars"
        const section = document.createElement('div');
        section.id = 'ShootingStars';

        // Add 10 span elements for animation
        for (let i = 0; i < 10; i++) {
            const span = document.createElement('span');
            section.appendChild(span);
        }

        // Add CSS styles dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            #ShootingStars {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                /* background: url("https://i.postimg.cc/c1Q3njM0/bg2.jpg"); */
                background-size: cover;
                animation: animateBg 50s linear infinite;
                z-index: -1;  /* Adjust z-index to place it correctly */
            }

            @keyframes animateBg {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                }
            }

            #ShootingStars span {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 4px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
                animation: animate 3s linear infinite;
            }

            #ShootingStars span::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 300px;
                height: 1px;
                background: linear-gradient(90deg, #fff, transparent);
            }

            @keyframes animate {
                0% {
                    transform: rotate(315deg) translateX(0);
                    opacity: 1;
                }
                70% {
                    opacity: 1;
                }
                100% {
                    transform: rotate(315deg) translateX(-1000px);
                    opacity: 0;
                }
            }

            #ShootingStars span:nth-child(1) {
                top: 0;
                right: 0;
                left: initial;
                animation-delay: 0s;
                animation-duration: 1s;
            }

            #ShootingStars span:nth-child(2) {
                top: 0;
                right: 80px;
                left: initial;
                animation-delay: 0.2s;
                animation-duration: 3s;
            }

            #ShootingStars span:nth-child(3) {
                top: 80px;
                right: 0px;
                left: initial;
                animation-delay: 0.4s;
                animation-duration: 2s;
            }

            #ShootingStars span:nth-child(4) {
                top: 0;
                right: 180px;
                left: initial;
                animation-delay: 0.6s;
                animation-duration: 1.5s;
            }

            #ShootingStars span:nth-child(5) {
                top: 0;
                right: 400px;
                left: initial;
                animation-delay: 0.8s;
                animation-duration: 2.5s;
            }

            #ShootingStars span:nth-child(6) {
                top: 0;
                right: 600px;
                left: initial;
                animation-delay: 1s;
                animation-duration: 3s;
            }

            #ShootingStars span:nth-child(7) {
                top: 300px;
                right: 0px;
                left: initial;
                animation-delay: 1.2s;
                animation-duration: 1.75s;
            }

            #ShootingStars span:nth-child(8) {
                top: 0px;
                right: 700px;
                left: initial;
                animation-delay: 1.4s;
                animation-duration: 1.25s;
            }

            #ShootingStars span:nth-child(9) {
                top: 0px;
                right: 1000px;
                left: initial;
                animation-delay: 0.75s;
                animation-duration: 2.25s;
            }

            #ShootingStars span:nth-child(10) {
                top: 0px;
                right: 450px;
                left: initial;
                animation-delay: 2.75s;
                animation-duration: 2.75s;
            }
        `;
        document.head.appendChild(style);

        // Append the new element to the #app-mount area
        const appMount = document.querySelector('#app-mount');
        if (appMount) {
            appMount.appendChild(section);
        }
    }

    removeSection() {
        const section = document.querySelector('#ShootingStars');
        if (section) {
            section.remove();
        }
    }

    unpatchAll() {
        BdApi.Patcher.unpatchAll('ShootingStars');
    }
}

module.exports = ShootingStars;
