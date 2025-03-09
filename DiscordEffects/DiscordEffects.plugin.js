/**
 * @name DiscordEffects
 * @description Adds the ability to put effects on your discord.
 * @version 2.1.3
 * @author Deleox
 * @authorId 1156430974008184962
 * @source https://github.com/Deleox/BDPlugins/blob/main/ShootingStars/ShootingStars.plugin.js
 * @website https://e-z.bio/MSFR
 * Original Shooting Star CodePen By Delroy Prithvi - https://codepen.io/delroyprithvi/pen/LYyJROR
 * First plugin and learning experience so expect bugs and potentially awful code TT-TT
 * Thank you to Vincent Garreau for Particles.js - https://vincentgarreau.com/particles.js/
*/


const config = {
    changelog: [
        {
            title: "Bugfix",
            type: "fixed",
            items: [
                "Fixed a bug causing both Rain and Snowflake opacity options not being able to be changed properly"
            ]
        },
        {
            title: "New Particles",
            type: "added",
            items: [
                "Added Particles.js from [Here](https://cdn.jsdelivr.net/npm/particles.js) I believe this still follows the guidelines.",
                "Added two Categories for Particles.js settings to enable finetuning and to reduce bloat in one category",
                "Changed z-index and added ability to manually edit it in settings"
            ]
        },
        {
            title: "Release + New Stuff",
            type: "added",
            items: [
                "Added Snowflake and Rain Effects.",
                "Added modular effect colors using Color Pickers.",
                "Added categories for each effect.",
                "Added ability for it to work without a theme."
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
                "I WAS FORGETTING SOMETHING!"
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
                {label: "Rain", value: "rain"},
                {label: "Particles", value: "particles"}
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
                    note: "Do not use for ShootingStars or Particles.JS",
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
                },
                {   
                    type: "number",
                    id: "zindexamount",
                    name: "Set Z-Index",
                    note: "Allows modifying the z-index to reduce bugs with particles.",
                    value: 1,
                },
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
                    step: .1
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
                    step: .1
                }
            ]
        },
        {
            type: "category",
            id: "ParticleCat",
            name: "ParticlesJS Settings PT.1",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "number",
                    id: "particleamount",
                    name: "Particle Amount",
                    note: "Sets how many particles exist at one time - Default: 20",
                    value: 20,
                    min: 0,
                    max: 100
                },
                {
                    type: "number",
                    id: "densityvalue",
                    name: "Particle Density",
                    note: "Sets the density of the area",
                    value: 800,
                    min: 0,
                    max: 1000
                },
                {
                    type: "switch",
                    id: "densityenable",
                    name: "Enable Density",
                    note: "Enabled Area Density",
                    value: true
                },
                {
                    type: "color", 
                    id: "particlecolor", 
                    name: "Particle Colorpicker", 
                    note: "Colorpicker for changing the color of the Particles - Default #ffffff", 
                    value: "#ffffff", 
                    colors: null,
                    inline: true
                },
                {
                    type: "dropdown",
                    id: "particleshape",
                    name: "Particle Shape",
                    note: "Select the shape of the Particles",
                    value: "circle",
                    options: [
                        {label: "Circle", value: "circle"},
                        {label: "Edge", value: "edge"},
                        {label: "Triangle", value: "triangle"},
                        {label: "Polygon", value: "polygon"},
                        {label: "Star", value : "star"}
                    ]
                },
                {
                    type: "switch",
                    id: "linelinking",
                    name: "Link Lines",
                    note: "Allows the lines to be linked",
                    value: true
                },
                {
                    type: "number",
                    id: "linedistance",
                    name: "Line Link Distance",
                    notes: "The Distance the lines with link from - Default: 150",
                    value: 150
                }

            ]
        },
        {
            type: "category",
            id: "ParticleCat2",
            name: "ParticlesJS Settings PT.2",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "number",
                    id: "particleopacity",
                    name: "Particle Opacity",
                    notes: "Sets the opacity of the Particles - Default: 0.5",
                    value: 0.5,
                    min: 0,
                    max: 1,
                    step: .1
                },
                {
                    type: "number",
                    id: "particlesize",
                    name: "Particle Size",
                    notes: "Sets the size of the Particles - Default: 5",
                    value: 5,
                    min: 0,
                    max: 10,
                    step: .1
                },
                {
                    type: "number",
                    id: "particlespeed",
                    name: "Particle Speed",
                    notes: "Sets the speed of the particles movement - Default: 6",
                    value: 6,
                    min: 0,
                    step: .1
                },
                {
                    type: "dropdown",
                    id: "particledirection",
                    name: "Particle Direction",
                    notes: "Sets the direction of the particles movement - Default: none",
                    value: "none",
                    options: [
                        {label: "None", value: "none"},
                        {label: "Top", value: "top"},
                        {label: "Top Right", value: "topright"},
                        {label: "Top Left", value: "topleft"},
                        {label: "Right", value: "right"},
                        {label: "Bottom Right", value : "bottomright"},
                        {label: "Bottom", value: "bottom"},
                        {label: "Bottom Left", value: "bottomleft"},
                        {label: "Left", value : "left"}
                    ]
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
                blurb: "Public Release of [Discord Effects](https://deleox.github.io/BDPlugins/DiscordEffects/DiscordEffects.plugin.js), [My bio](https://e-z.bio/retronomicon).",
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
        section.style.zIndex = this.settings.zindexamount;
    
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
    
        const shootingStarsStyles = (i) => {
            const leftPosition = Math.random() * 100;
            console.log(`Shooting Star span ${i} left position: ${leftPosition}%`);
            return `
                top: 0;
                right: ${80 * (i + 1)}px;
                left: ${leftPosition}%;
                animation-delay: ${0.2 * i}s;
                animation-duration: ${1 + 0.25 * ((i % 4) + 1)}s;
            `;
        };
    
        const snowflakesStyles = (i) => {
            const leftPosition = Math.random() * 100;
            console.log(`Snowflake span ${i} left position: ${leftPosition}%`);
            return `
                left: ${leftPosition}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${5 + Math.random() * 5}s;
            `;
        };
    
        const rainStyles = (i) => {
            const leftPosition = Math.random() * 100;
            console.log(`Rain span ${i} left position: ${leftPosition}%`);
            return `
                left: ${leftPosition}%;
                animation-delay: ${Math.random() * 1}s;
                animation-duration: ${0.5 + Math.random() * 1}s;
                overflow: hidden;
            `;
        };
    
        function generateRandomKeyframes(count) {
            return Array.from({ length: count }, (_, i) => `
                @keyframes randomPosition${i} {
                    0% { left: ${Math.random() * 100}%; }
                    100% { left: ${Math.random() * 100}%; }
                }
            `).join('');
        }
    
        switch(this.settings.effect) {
            case 'particles':
                const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/particles.js';
            document.head.appendChild(script);

            script.onload = () => {
                particlesJS('DiscordEffects', {
                    particles: {
                        number: {
                            value: this.settings.particleamount,
                            density: {
                                enable: this.settings.densityenable,
                                value_area: this.settings.densityvalue
                            }
                        },
                        color: {
                            value: this.settings.particlecolor
                        },
                        shape: {
                            type: this.settings.particleshape,
                            stroke: {
                                width: 0,
                                color: this.settings.particlecolor
                            }
                        },
                        opacity: {
                            value: this.settings.particleopacity,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: this.settings.particlesize,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: this.settings.linelinking,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: this.settings.particlespeed,
                            direction: this.settings.particledirection,
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse'
                            },
                            onclick: {
                                enable: true,
                                mode: 'push'
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 1
                                }
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 8,
                                speed: 3
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            },
                            push: {
                                particles_nb: 4
                            },
                            remove: {
                                particles_nb: 2
                            }
                        }
                    },
                });
            };
            return ``; // No additional styles needed here for particles.js - cant figure out the interactivity though

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
                    ${generateRandomKeyframes(this.settings.spanCount)}
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
                    ${generateRandomKeyframes(this.settings.spanCount)}
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
                        animation-name: randomPosition${Math.floor(Math.random() * this.settings.spanCount)};
                    }
    
                    @keyframes fall {
                        to {
                            transform: translateY(100vh);
                            opacity: 0;
                        }
                    }
    
                    ${generateSpanStyles(this.settings.spanCount, rainStyles)}
                    ${generateRandomKeyframes(this.settings.spanCount)}
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
                                disabled: subSetting.id === 'mode' && this.settings.effect === 'shootingStars',
                                disabled: subSetting.id === 'mode' && this.settings.effect === 'particles'
                            };
                        })
                    };
                } else {
                    let settingValue = this.settings[setting.id] !== undefined ? this.settings[setting.id] : setting.value;
                    return {
                        ...setting,
                        value: settingValue,
                        disabled: setting.id === 'mode' && this.settings.effect === 'shootingStars',
                        disabled: setting.id === 'mode' && this.settings.effect === 'particles'
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
