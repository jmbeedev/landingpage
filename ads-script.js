// ads-script.js

document.addEventListener("DOMContentLoaded", function () {
    const MAX_ADS_PER_PAGE = 3;
    let adsRendered = 0;

    // === Fungsi Umum: Insert Iklan AdSense ===
    function insertAd(config) {
        if (adsRendered >= MAX_ADS_PER_PAGE) {
            console.warn("Iklan tidak ditambahkan: Batas maksimal iklan per halaman telah tercapai.");
            return;
        }

        const defaultConfig = {
            unitId: "YOUR_AD_SLOT_ID",
            placement: "beforeend",
            targetSelector: "body",
            layout: "",
            format: "auto",
            containerStyle: "",
            className: "ad-slot"
        };

        const options = Object.assign({}, defaultConfig, config);

        const target = document.querySelector(options.targetSelector);
        if (!target) {
            console.warn(`Target selector "${options.targetSelector}" tidak ditemukan.`);
            return;
        }

        const adContainer = document.createElement('div');
        adContainer.className = options.className;

        if (options.containerStyle) {
            adContainer.setAttribute("style", options.containerStyle);
        }

        adContainer.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="${options.unitId}"
                 data-ad-format="${options.format}"
                 data-ad-layout="${options.layout}"
                 data-full-width-responsive="true">
            </ins>
        `;

        target.insertAdjacentHTML(options.placement, adContainer.outerHTML);

        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            adsRendered++;
        } catch (e) {
            console.error("Adsense error:", e);
        }
    }

    // === 1. Iklan Floating Sidebar (Desktop Only) ===
    function addFloatingAd() {
        if (window.innerWidth <= 768) return; // Hanya desktop

        insertAd({
            unitId: "AD_SLOT_160x600",
            targetSelector: "body",
            placement: "beforeend",
            format: "rectangle",
            containerStyle: "position:fixed; right:20px; bottom:100px; width:160px; height:600px; z-index:99999; background:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:8px; padding:10px;",
            className: "floating-ad"
        });
    }

    // === 2. Sticky Footer Iklan ===
    function addFooterAd() {
        insertAd({
            unitId: "AD_SLOT_FOOTER",
            targetSelector: "footer",
            placement: "beforebegin",
            format: "banner",
            containerStyle: "margin: 20px auto; text-align:center;",
            className: "footer-ad"
        });
    }

    // === 3. Iklan Modal Setelah Scroll / Delay / Click ===
    function addModalAd() {
        const modalAd = document.createElement("div");
        modalAd.id = "modal-ad";
        modalAd.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            background: white;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            border-radius: 10px;
            z-index: 999999;
            display: none;
            padding: 20px;
        `;

        modalAd.innerHTML = `
            <p style="text-align:right; cursor:pointer; font-weight:bold;" id="close-modal">X</p>
            <h3 style="color:#002244;">Try Our CRM Free for 7 Days</h3>
            <div id="modal-ad-slot"></div>
            <a href="#contact"><button style="width:100%; padding:12px; margin-top:15px; background:#00a0e1; color:white; border:none; border-radius:6px; font-weight:bold;">Start Free Trial</button></a>
        `;

        document.body.appendChild(modalAd);

        const modalSlot = document.getElementById("modal-ad-slot");
        modalSlot.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="AD_SLOT_MODAL"
                 data-ad-format="auto"
                 data-full-width-responsive="true">
            </ins>
        `;

        document.getElementById("close-modal").addEventListener("click", () => {
            modalAd.remove();
        });

        setTimeout(() => {
            if (adsRendered < MAX_ADS_PER_PAGE) {
                modalAd.style.display = "block";
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    adsRendered++;
                } catch (e) {
                    console.error("Adsense error:", e);
                }
            }
        }, 3000);
    }

    // === 4. Trigger Iklan Sesuai Event ===
    function triggerAdsOnEvents() {
        let hasScrolled = false;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 150 && !hasScrolled) {
                hasScrolled = true;
                addModalAd();
            }
        });

        document.addEventListener("click", (e) => {
            if ((e.target.tagName === "BUTTON" || e.target.closest("button")) && adsRendered < MAX_ADS_PER_PAGE) {
                addModalAd();
            }
        });
    }

    // === Jalankan Semua Iklan Secara Terkontrol ===
    function initAds() {
        addFloatingAd();       // Iklan sidebar
        addFooterAd();         // Iklan footer
        triggerAdsOnEvents();  // Iklan modal
    }

    // === Cegah Render Saat Page Loading Cepat ===
    window.addEventListener("load", () => {
        setTimeout(initAds, 1000);
    });
});
