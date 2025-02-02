/**
 * @name Shooting Stars
 * @description Adds a section to the Discord #app-mount area with the ID "ShootingStars"
 * @version 1.0.0
 * @author Deleox001
 * @authorId 1156430974008184962
 * @source https://github.com/Deleox/BDPlugins/blob/main/ShootingStars/ShootingStars.plugin.js
 * Original CodePen By Delroy Prithvi - https://codepen.io/delroyprithvi/pen/LYyJROR
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
        // Load external CSS file dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://deleox.github.io/BDPlugins/ShootingStars/CSS/Stars.CSS'; // Update this with the actual path to your CSS file
        document.head.appendChild

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
