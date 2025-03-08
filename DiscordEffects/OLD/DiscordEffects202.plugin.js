/**
 * @name DiscordEffects
 * @description Adds the ability to put effects on your discord.
 * @version 2.0.2
 * @author Deleox
 * @authorId 1156430974008184962
 * @source https://github.com/Deleox/BDPlugins/blob/main/ShootingStars/ShootingStars.plugin.js
 * @website https://e-z.bio/MSFR
 * Original Shooting Star CodePen By Delroy Prithvi - https://codepen.io/delroyprithvi/pen/LYyJROR
 * First plugin and learning experience so expect bugs and potentially awful code TT-TT
 */


const config = {
    changelog: [
        {
            title: "Release + New Stuff",
            type: "added",
            items: [
                "Added Snowflake and Rain Effects.",
                "Added modular effect colors using Color Pickers.",
                "Added categories for each effect.",
                "Added ability for it to work without a theme.",
                "Added opacity control for both Rain and Snowflakes"
            ]
        },
        {
            title: "Fixes",
            type: "fixed",
            items: [
                "Fixed a bug where pasting a large amount of text in chat would cause discord to feel insecure about its height.",
                "Fixed a bug where it would show behind the Settings Menu and Channel Header by setting z-index to 101 any lower and it will hide behind these two."
            ]
        },
        {
            title: "Progress",
            type: "progress",
            items:[
                "TODO: Refine plugin code",
                "TODO: Add more effects",
                "I WAS FORGETTING SOMETHING"
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
                {label: "Snowflakes", value: "snowflakes"},
                {label: "Rain", value: "rain"}
            ]
        },
        {
            type: "category",
            id: "AdvancedCat",
            name: "Advanced",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "switch",
                    id: "mode",
                    name: "Mode",
                    note: "Toggle between live (GitHub CSS) and standalone (plugin CSS)",
                    note: "Do not use for ShootingStars",
                    value: false // false for standalone, true for live
                },
                {
                    type: "slider",
                    id: "spanCount",
                    name: "Span Count",
                    note: "Adjust the number of spans for animation - Due to the usage of spans, higher may cause lag",
                    value: 20, // Default span count
                    min: 0,
                    max: 50,
                    markers: [10, 20, 30, 40, 50]
                }
            ]
        },

        {
            type: "category",
            id: "ShootingStarCat",
            name: "ShootingStars Settings",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "slider",
                    id: "angle",
                    name: "Star Angle",
                    note: "Adjust the angle of the stars - refrain from use on live",
                    value: 315, // Default angle
                    min: 0,
                    max: 360,
                    markers: [0, 90, 180, 270, 360]
                    
                }
            ]
        },

        {
            type: "category",
            id: "SnowflakeCat",
            name: "Snowflake Settings",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "color", 
                    id: "flakecolor", 
                    name: "Snow Colorpicker", 
                    note: "Colorpicker for changing the color of the Snow - Default #ffffff", 
                    value: "#ffffff", 
                    colors: null,
                    inline: true
                },
                {
                    type: "number",
                    id: "flakeopacity",
                    name: "Snow Opacity",
                    note: "Set the opacity for the Snow",
                    value: .5,
                    min: 0,
                    max: 1,
                    step: 10
                }
            ]
        },
        {
            type: "category",
            id: "RainCat",
            name: "Rain Settings",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "color", 
                    id: "raincolor", 
                    name: "Rain Colorpicker", 
                    note: "Colorpicker for changing the color of the Rain - Default #ffffff", 
                    value: "#ffffff", 
                    colors: null,
                    inline: true
                },
                {
                    type: "number",
                    id: "rainopacity",
                    name: "Rain Opacity",
                    note: "Set the opacity for the rain",
                    value: .5,
                    min: 0,
                    max: 1,
                    step: 10
                }
            ]
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
        BdApi.UI.showToast('She effect on my dis til i cord.');
        const savedVersion = this.api.Data.load("version");
        if (savedVersion !== this.meta.version) {
            this.api.UI.showChangelogModal({
                title: this.meta.name,
                subtitle: this.meta.version,
                blurb: "Public Release of DiscordEffects.",
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
        this.removeSection();
        const section = document.createElement('div');
        section.id = 'DiscordEffects';
        section.style.position = 'fixed';
        section.style.top = 0;
        section.style.left = 0;
        section.style.width = '100%';
        section.style.height = '100vh';
        section.style.overflow = 'hidden';
        section.style.pointerEvents = 'none';
        section.style.zIndex = '101'; // Making it 101 causes it to show above the channel header and settings menu
    
        for (let i = 0; i < this.settings.spanCount; i++) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            if (this.settings.effect === 'snowflakes') {
                span.style.top = '-10px';
                span.style.width = '10px';
                span.style.height = '10px';
                span.style.background = this.settings.flakecolor || 'white';
                span.style.opacity = this.settings.flakeopacity;
                span.style.borderRadius = '50%';
                span.style.left = `${Math.random() * 100}%`;
                span.style.animationDelay = `${Math.random() * 5}s`;
                span.style.animationDuration = `${5 + Math.random() * 5}s`;
                span.style.animationName = 'fall';
                span.style.animationIterationCount = 'infinite';
                span.style.animationTimingFunction = 'linear';
            } else if (this.settings.effect === 'rain') {
                span.style.top = '-10px';
                span.style.width = '2px';
                span.style.height = '20px';
                span.style.background = this.settings.raincolor || 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2))';
                span.style.opacity = this.settings.rainopacity;
                span.style.borderRadius = '20%';
                span.style.left = `${Math.random() * 100}%`;
                span.style.animationDelay = `${Math.random() * 1}s`;
                span.style.animationDuration = `${0.5 + Math.random() * 1}s`;
                span.style.animationName = 'fall';
                span.style.animationIterationCount = 'infinite';
                span.style.animationTimingFunction = 'linear';
            }
    
            section.appendChild(span);
        }
    
        if (this.settings.mode) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.settings.effect === 'shootingStars'
                ? 'https://deleox.github.io/BDPlugins/DiscordEffects/CSS/Stars.CSS'
                : this.settings.effect === 'snowflakes'
                    ? 'https://deleox.github.io/BDPlugins/DiscordEffects/CSS/Snowflakes.css'
                    : this.settings.effect === 'rain'
                        ? 'https://deleox.github.io/BDPlugins/DiscordEffects/CSS/Rain.css'
                        : 'https://deleox.github.io/BDPlugins/DiscordEffects/Blank.CSS';
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
            console.error("If you're seeing this, you either have bigger issues or I somehow broke everything, I'm sorry :c");
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
    
        function generateSpanStyles(count, getStyles) {
            return Array.from({ length: count }, (_, i) => `
                #DiscordEffects span:nth-child(${i + 1}) {
                    ${getStyles(i)}
                }
            `).join('');
        }

        const shootingStarsStyles = (i) => `
            top: 0;
            right: ${80 * (i + 1)}px;
            left: initial;
            animation-delay: ${0.2 * i}s;
            animation-duration: ${1 + 0.25 * ((i % 4) + 1)}s;
        `;
    
        const snowflakesStyles = (i) => `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${5 + Math.random() * 5}s;
        `;
    
        const rainStyles = (i) => `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 1}s;
            animation-duration: ${0.5 + Math.random() * 1}s;
            overflow: hidden;
        `;
    
        switch(this.settings.effect) {
            case 'shootingStars':
                return `
                    #DiscordEffects {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background-size: cover;
                        animation: animateBg 50s linear infinite;
                        z-index: 0;
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
    
                    ${generateSpanStyles(this.settings.spanCount, shootingStarsStyles)}
                `;
            case 'snowflakes':
                return `
                    #DiscordEffects {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background-size: cover;
                        z-index: 0;
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
    
                    ${generateSpanStyles(this.settings.spanCount, snowflakesStyles)}
                `;
            case 'rain':
                return `
                    #DiscordEffects {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background-size: cover;
                        z-index: 0;
                    }
    
                    #DiscordEffects span {
                        position: absolute;
                        top: -10px;
                        width: 2px;
                        height: 20px;
                        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1));
                        opacity: 0.6;
                        border-radius: 20%;
                        animation: fall 1s linear infinite;
                    }
    
                    @keyframes fall {
                        to {
                            transform: translateY(100vh);
                            opacity: 0;
                        }
                    }
    
                    ${generateSpanStyles(this.settings.spanCount, rainStyles)}
                `;
        }
    }
    
    getSettingsPanel() {
        return BdApi.UI.buildSettingsPanel({
            settings: config.settings.map(setting => {
                if (setting.type === "category" && setting.collapsible) {
                    return {
                        ...setting,
                        settings: setting.settings.map(subSetting => {
                            let subValue = this.settings[subSetting.id] !== undefined ? this.settings[subSetting.id] : subSetting.value;
                            return {
                                ...subSetting,
                                value: subValue,
                                disabled: subSetting.id === 'mode' && this.settings.effect === 'shootingStars'
                            };
                        })
                    };
                } else {
                    let settingValue = this.settings[setting.id] !== undefined ? this.settings[setting.id] : setting.value;
                    return {
                        ...setting,
                        value: settingValue,
                        disabled: setting.id === 'mode' && this.settings.effect === 'shootingStars'
                    };
                }
            }),
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
