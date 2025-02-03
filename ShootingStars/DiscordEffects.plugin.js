/**
 * @name Discord Effects
 * @description Adds the ability to have Effects on your discord (Originally ShootingStars).
 * @version 1.0.0
 * @author Deleox
 * @authorId 1156430974008184962
 * @source https://github.com/Deleox/BDPlugins/blob/main/ShootingStars/ShootingStars.plugin.js
 * Original CodePen By Delroy Prithvi - https://codepen.io/delroyprithvi/pen/LYyJROR
 */

const config = {
    changelog: [
        {
            title: "New Stuff",
            type: "added",
            items: [
                "Added settings panel",
                "Added effect switching",
                "Added live/standalone toggle",
                "Added angle adjustment for stars",
                "Added span count adjustment"
            ]
        }
    ],
    settings: [
        {
            type: "dropdown",
            id: "effect",
            name: "Effect",
            note: "Select the effect to display",
            value: "shootingStars",
            options: [
                {label: "Shooting Stars", value: "shootingStars"},
                {label: "Snowflakes", value: "snowflakes"}
            ]
        },
        {
            type: "switch",
            id: "mode",
            name: "Mode",
            note: "Toggle between live (GitHub CSS) and standalone (plugin CSS) - LIVE CURRENTLY BROKEN",
            value: false // false for standalone, true for live
        },
        {
            type: "slider",
            id: "angle",
            name: "Star Angle",
            note: "Adjust the angle of the stars - DO NOT USE ON LIVE",
            value: 315, // Default angle
            min: 0,
            max: 360,
            markers: [0, 90, 180, 270, 360]
        },
        {
            type: "slider",
            id: "spanCount",
            name: "Span Count",
            note: "Adjust the number of spans for animation",
            value: 20, // Default span count
            min: 0,
            max: 50,
            markers: [10, 20, 30, 40, 50]
        }
    ]
};

module.exports = class DiscordEffects {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(this.meta.name);
        this.settings = BdApi.loadData(this.meta.name, "settings") || config.settings.reduce((acc, setting) => {
            acc[setting.id] = setting.value;
            return acc;
        }, {});
    }

    start() {
        const savedVersion = this.api.Data.load("version");
        if (savedVersion !== this.meta.version) {
            this.api.UI.showChangelogModal({
                title: this.meta.name,
                subtitle: this.meta.version,
                blurb: "Added both Live and Standalone versions in this plugin.",
                changes: config.changelog
            });
            this.api.Data.save("version", this.meta.version);
        }
        this.addSection();
    }

    stop() {
        this.removeSection();
    }

    updateSpans() {
        this.removeSection();
        this.addSection();
    }

    addSection() {
        const section = document.createElement('div');
        section.id = 'DiscordEffects';

        for (let i = 0; i < this.settings.spanCount; i++) {
            const span = document.createElement('span');
            section.appendChild(span);
        }

        if (this.settings.mode) {
            console.log('THIS IS ACTIVE')
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://deleox.github.io/BDPlugins/ShootingStars/CSS/Stars.CSS'; // Ensure this URL is correct
            link.id = 'DiscordEffectsStyle';
            document.head.appendChild(link);
        } else {
            const style = document.createElement('style');
            style.id = 'DiscordEffectsStyle';
            style.textContent = this.getEffectStyles();
            document.head.appendChild(style);
        }
        

        const appMount = document.querySelector('#app-mount');
        if (appMount) {
            appMount.appendChild(section);
        } else {
            console.error('#app-mount element not found.');
        }
    }

    removeSection() {
        const section = document.querySelector('#DiscordEffects');
        if (section) {
            section.remove();
        }

        const link = document.querySelector('link#DiscordEffectsStyle');
        if (link) {
            link.remove();
        }

        const style = document.querySelector('#DiscordEffectsStyle');
        if (style) {
            style.remove();
        }
    }

    getEffectStyles() {
        const angle = this.settings.angle || 315;
        if (this.settings.effect === 'shootingStars') {
            return `
                #DiscordEffects {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-size: cover;
                    animation: animateBg 50s linear infinite;
                    z-index: -1;
                }
    
                @keyframes animateBg {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                }
    
                #DiscordEffects span {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
                    animation: animate 3s linear infinite;
                    transform-origin: top left;
                }
    
                #DiscordEffects span::before {
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
                        transform: rotate(${angle}deg) translateX(0);
                        opacity: 1;
                    }
                    70% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(${angle}deg) translateX(-1000px);
                        opacity: 0;
                    }
                }
    
                ${Array.from({ length: this.settings.spanCount }, (_, i) => `
                    #DiscordEffects span:nth-child(${i + 1}) {
                        top: 0;
                        right: ${80 * (i + 1)}px;
                        left: initial;
                        animation-delay: ${0.2 * i}s;
                        animation-duration: ${1 + 0.25 * ((i % 4) + 1)}s;
                    }
                `).join('')}
            `;
        } else if (this.settings.effect === 'snowflakes') {
            return `
                #DiscordEffects {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-size: cover;
                    z-index: -1;
                }
    
                #DiscordEffects span {
                    position: absolute;
                    top: -10px;
                    width: 10px;
                    height: 10px;
                    background: white;
                    opacity: 0.8;
                    border-radius: 50%;
                    animation: fall 10s linear infinite;
                }
    
                @keyframes fall {
                    to {
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                }
    
                ${Array.from({ length: this.settings.spanCount }, (_, i) => `
                    #DiscordEffects span:nth-child(${i + 1}) {
                        left: ${Math.random() * 100}%;
                        animation-delay: ${Math.random() * 5}s;
                        animation-duration: ${5 + Math.random() * 5}s;
                    }
                `).join('')}
            `;
        }
    }

    getSettingsPanel() {
        return BdApi.UI.buildSettingsPanel({
            settings: config.settings.map(setting => ({
                ...setting,
                value: this.settings[setting.id]
            })),
            onChange: (category, id, value) => {
                this.settings[id] = value;
                BdApi.saveData(this.meta.name, "settings", this.settings);
                if (id === 'spanCount') {
                    this.updateSpans();
                } else {
                    this.updateEffect();
                }
            },
        });
    }

    updateEffect() {
        this.removeSection();
        this.addSection();
    }
};
