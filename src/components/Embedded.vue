<template>
    <div id="embed" :class="{ simActive: showIframe}">
        <header>
            <div class="hcp">For US Healthcare Professionals</div>
            <div class="logo">
                <img src="/assets/ted-logo.png" alt="">
            </div>
        </header>
        <main>
            <section class="hero">
                <h1>
                    <span>spot the hidden danger</span>
                    of thyroid eye disease (TED)
                </h1>
                <p>
                    TED is a progressive, chromatic autoimmune disease that can potentially threaten your patients' vision. <sup>1,2</sup>
                </p>
            </section>
            <!-- hero -->

            <section id="simulator">
                <div class="content">
                    <div class="content-container">
                        <h2>Experience the world through your patients' eyes</h2>
                        <p>Use the Symptom Simulator to see how TED symptoms present themselves in a virtual world.</p>
                    </div>
                </div>

                <div class="button-container">
                    <button @click="activateSim">
                        <span>
                            Experience the symptoms now
                        </span>
                    </button>
                </div>
            </section>
            <!-- simulator -->
            
            <section id="next-steps">
                <h2>Now that you've used the symptom simulator, <span>it's time to act</span></h2>
                <p>
                    TED is a complex condition, and early intervention has been shown to reduce disease impact.<sup>2,3</sup> The evaluation 
                    and management of TED could benefit from a multidisciplinary approach.<sup>4,5</sup> If you notice changing or worsening 
                    symptoms, it is important to consult with a TED Specialist quickly.<sup>5</sup>
                </p>
                <div class="buttons">
                    <button>
                        Discover TED
                        <img src="/assets/chevron-right.svg" alt="">

                    </button>
                    <button>
                        Find a TED Specialist
                        <img src="/assets/chevron-right.svg" alt="">
                    </button>
                </div>
            </section>
            <!-- next steps -->

            <section id="references">
                <h2>References:</h2>
                <ol>
                    <li>Wang Y, Patel A, Douglas RS. Thyroid eye disease: how a novel therapy may change the treatment paradigm. Ther Clin Risk Manag. 2019;15:1305-1318. doi:10.2147/TCRM.S193018</li>
                    <li>Bothun ED, Scheurer RA, Harrison AR, Lee MS. Update on thyroid eye disease and management. Clin Ophthalmol. 2009;3:543-551. doi:10.2147/opth.s5228</li>
                    <li>Mitchell AL, Goss L, Mathiopoulou L, et al. Diagnosis of Graves' orbitopathy (DiaGO): results of a pilot study to assess the utility of an oce tool for practicing endocrinologists. J Clin Endocrinol Metab. 2015;100(3):E458-E462. doi:10.1210/ jc.2014-3146</li>
                    <li>Ross DS, Burch HB, Cooper DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016;26(10):1343-1421. doi:10.1089/thy. 2016.0229</li>
                    <li>Barrio-Barrio J, Sabater AL, Bonet-Farriol E, Velázquez- Villoria Á, Galofré JC. Graves' ophthalmopathy: VISA versus EUGOGO classification, assessment, and management. J Ophthalmol. 2015;2015:249125. doi:10.1155/2015/249125</li>
                </ol>
            </section>
            <!-- references -->

            <footer id="footer">
                <div class="logo">
                    <img src="/assets/horizon.svg" alt="">
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </nav>

                <div class="legal">
                    <p>© 2022 Horizon Therapeutics plc</p>
                    <p>DA-UNBR-US-00473 05/22</p>
                </div>
            </footer>
        </main>

        <div class="container" v-show="showIframe">
            <button class="close-sim" @click="dismissSim">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="sr-only">close symptoms simulator</span>
            </button>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                iFrame: null,
                iframeSrc: window.origin,
                showIframe: false
            }
        },
        mounted() {
            window.addEventListener('message', message => {
                try {
                    let data = JSON.parse(message.data)

                    let dataLayer = window.dataLayer || (window.dataLayer = [])
                    if(data.event) {
                        dataLayer.push({
                            event: data.event,
                            postMessageData: data
                        })
                    }
                } catch(e) {}
            })
        },
        methods: {
            activateSim() {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                this.showIframe = true
                this.iFrame = document.createElement('iframe')
                this.iFrame.src = window.origin
                this.iFrame.classList.add('iframe')
                this.iFrame.style.position = 'fixed'
                // this.iFrame.style.top = '50%'
                // this.iFrame.style.left = '2em'
                // this.iFrame.style.left = '1em'
                // this.iFrame.style.right = '1em'
                this.iFrame.style.inset = '0'
                this.iFrame.style.height = '100%'
                this.iFrame.style.width = '100%'

                this.iFrame.style.border = '2px solid #c7c3a3'
                this.iFrame.style.boxShadow = '2px 2px 8px rgba(black, 0.4)'
                this.iFrame.style.zIndex = '9998'
                this.iFrame.style.backgroundColor = 'white'

                document.querySelector('.container').appendChild(this.iFrame)
            },
            dismissSim() {
                this.showIframe = false
                this.iFrame.remove();
            }
        }
    }
</script>

<style lang="scss" scoped>
/* CONTAINER
================================ */
#embed {
    &.simActive {
        overflow: hidden;
        height: 100vh;
    }
}

.container {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(black, 0.5);
}

/* GENERAL
================================ */
header {
    width: 100%;
    background-color: $color1;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    z-index: 10;
}

h1, h2 {
    text-transform: uppercase;
}

h1 span,
h2 span {
    color: $color4;
}

h1 {
    font-size: 1.6em;
    margin-bottom: 0.5em;

    @media screen and (min-width: 900px) {
        font-size: 5em;
        line-height: 1;
    }
}

h2 {
    font-size: 1.375em;
    margin-bottom: 0.5em;

    @media screen and (min-width: 900px) {
        font-size: 3em;
    }
}

iframe {
    position: fixed;
    top: 50%;
    left: 1em;
    right: 1em;
    width: calc(100vw - 2em);
    transform: translateY(-50%);
    border: 2px solid darken($color3, 10%);
    box-shadow: 2px 2px 8px rgba(black, 0.4);
    aspect-ratio: 16 / 9;
}

.close-sim {
    position: fixed;
    height: 25px;
    width: 25px;
    padding: 2px;
    top: 2px;
    right: 2px;
    border-radius: 0 0 0 10px;
    border: none;
    color: $color2;
    background-color: rgba(white, 0.6);
    z-index: 9999;

}

p {
        @media screen and (min-width: 900px) {
    font-size: 1.374em;
    }
}

section {
    padding: 1em;

    @media screen and (min-width: 900px) {
        padding: 4rem 6rem;
    }
}

sup {
    font-size: 8px;

    @media screen and (min-width: 900px) {
        font-size: 10px;
    }
}

/* HEADER
================================ */

header .hcp {
    padding: 0.8em 1em;
    line-height: 1;
    border-bottom: 1px solid rgba(white, 0.2);

            @media screen and (min-width: 900px) {
                padding: 0.8rem 6rem
            }
}

header .logo {
    height: 80px;
    padding: 0.8em 1em;

    @media screen and (min-width: 900px) {
        padding: 0.8rem 6rem
    }
}

header .logo img {
    height: 100%;
}

/* MAIN
================================ */
main {
    display: flex;
    flex-direction: column;

}

main .hero {
    @media screen and (min-width: 900px) {
        padding: 4rem 6rem;
    }
}

main .hero h1 {
    display: flex;
    flex-direction: column;
}

main h1 span {
    display: block;
    color: $color4;
}

main .hero p {

    padding: 1em 0em;

    @media screen and (min-width: 900px) {
    font-size: 1.374em;
    }
}

/* SIMULATOR
================================ */
#simulator {
    min-height: 600px;
    background-color: $color3;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    padding: 0;
    @media screen and (min-width: 900px) {
        min-height: 400px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }
}

#simulator .content {
    padding: 1.6rem;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    color: $color1;

    @media screen and (min-width: 900px) {
        justify-content: center;
        align-items: center;
    }
}

#simulator .content .content-container {
    position: relative;
    padding: 0 1.6rem;

    &::before {
        content: '';
        position: absolute;
        width: 10px;
        left: 0;
        height: calc(100%);
        background-color: $color4;
    }

    @media screen and (min-width: 900px) {
                max-width: 600px;
        margin: auto;
    }
}

#simulator h2 {
    font-size: 1.6rem;
    @media screen and (min-width: 900px) {
    font-size: 2.4rem;
    }
}

#simulator p {
    margin-bottom: 1em;
    font-weight: 500;
}

#simulator .button-container {
    position: relative;
    width: 100%;
    height: 100%;
}

#simulator .button-container button {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    background: url('/assets/launch.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    border: none;
    cursor: pointer;
}

#simulator .button-container button:hover > span {
    transform-origin: center;
    transform: translateX(-50%) scale(1.05);
    background-color: darken($color3, 6%);
}

#simulator .button-container button span {
    position: absolute;
    width: 280px;
    left: 50%;
    bottom: 2.4rem;
    background-color: $color3;
    padding: 1.2rem 1.6rem;
    margin-right: 71px;
    transform-origin: center center;
    transform: translateX(-50%) scale(1) ;
    font-family: $font2;
    font-size: 1.1rem;
    color: $color1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 150ms ease-in-out;

    &::after {
        position: absolute;
        content: '';
        top: 4px;
        bottom: 0;
        right: 0;
        width: 71px;
        background-image: url('/assets/chevron-right-green.svg');
        background-size: 36px;
        background-repeat: no-repeat;
        background-position: 70% 50%;
    }
}

/* NEXT STEPS
================================ */
#next-steps p {
    margin-bottom: 1em;

    @media screen and (min-width: 900px) {
        margin-bottom: 2em;
        
    }
}

#next-steps .buttons {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media screen and (min-width: 900px) {
        flex-direction: row;
        gap: 4rem
    }
}

#next-steps .buttons button {
    width: 90%;
    max-width: 300px;
    padding: 0.9em 0.4em;
    display: flex;
    justify-content: space-between;
    font-family: "Oswald", sans-serif;
    font-size: 1.2em;
    background: linear-gradient(30deg, $color1, 60%, #87896F);
    color: white;
    border: none
}

#next-steps .buttons button img {
    height: 35px;
}

/* REFERENCES
================================ */
#references {
    background-color: #F7F7F7;
}

#references h2 {
    color: $color2;
    font-weight: normal;

        @media screen and (min-width: 900px) {
            font-size: 2rem;
        }
}

#references ol {
    padding: 0 1em;
    font-size: 0.8em;
}

#references li + li {
    margin-top: 0.5rem;

        @media screen and (min-width: 900px) {
                margin-top: 1rem;
        }
}

/* FOOTER
================================ */
#footer {
    background-color: #EDEDED;
    padding: 1em;

    @media screen and (min-width: 900px) {
        padding: 1rem 6rem;
    }
}

#footer .logo {
    height: 100px;
    padding: 2em 0;
    border-bottom: 1px solid #CCC;

    @media screen and (min-width: 900px) {
        height: 120px
    }
}

#footer .logo img {
    height: 100%;
}

#footer nav {
    margin-bottom: 1em;
    padding: 1em 0;
}

#footer nav ul {
    list-style: none;
    text-decoration: none;
}

#footer nav li {
    @media screen and (min-width: 900px) {
        display: inline;
    }
}

#footer nav li + li {
    margin-top: 0.8rem;

    @media screen and (min-width: 900px) {
        margin-top: 0;
        margin-left: 1.2em;
    }
}

#footer nav a {
    text-decoration: none;
    color: inherit;
}

#footer .legal {
    font-size: 12px;
    display: flex;
    justify-content: space-between;;
}
</style>