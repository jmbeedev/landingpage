// ads-script.js

document.addEventListener("DOMContentLoaded", function () {
    let adShown = false;
    let hasScrolled = false;
    let floatingAdLoaded = false;

    // === 1. Insert Floating Sidebar Ad (Desktop Only) ===
    function insertFloatingAd() {
        if (window.innerWidth <= 768 || floatingAdLoaded) return;

        const floatingAd = document.createElement('div');
        floatingAd.id = 'floating-ad';
        floatingAd.style.cssText = `
            position: fixed;
            right: 20px;
            bottom: 80px;
            width: 160px;
            height: 600px;
            background: white;
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            border-radius: 8px;
            z-index: 99999;
            display: none;
            transition: opacity 0.3s ease;
        `;

        floatingAd.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block; width:160px; height:600px;"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="YOUR_AD_SLOT_ID"
                 data-ad-format="rectangle"
                 data-full-width-responsive="true"
                 data-video-ad-start="on"
                 data-adtest="on">
            </ins>
        `;

        document.body.appendChild(floatingAd);

        setTimeout(() => {
            floatingAd.style.display = 'block';
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("Adsense error:", e);
                showFallbackAd(floatingAd, "floating");
            }
            floatingAdLoaded = true;
        }, 1000);
    }

    // === 2. Insert Sticky Footer Ad ===
    function insertFooterAd() {
        const footerAd = document.createElement('div');
        footerAd.id = 'footer-ad';
        footerAd.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #ffffff;
            padding: 10px 0;
            text-align: center;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            z-index: 99998;
            display: none;
            font-size: 14px;
            color: #555;
            transition: opacity 0.3s ease;
        `;

        footerAd.innerHTML = `
            <p style="margin: 0;">Try our CRM Software for free today!</p>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="YOUR_AD_FOOTER_SLOT"
                 data-ad-format="banner"
                 data-ad-layout-key="-gw-1+2a-1k+q"
                 data-full-width-responsive="true"
                 data-video-ad-start="on"
                 data-adtest="on">
            </ins>
        `;

        document.body.appendChild(footerAd);

        setTimeout(() => {
            footerAd.style.display = 'block';
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("Adsense error:", e);
                showFallbackAd(footerAd, "footer");
            }
        }, 1000);
    }

    // === 3. Insert Modal Ad (muncul saat scroll atau klik tombol) ===
    function insertModalAd() {
        const modalAd = document.createElement('div');
        modalAd.id = 'modal-ad';
        modalAd.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 999999;
            display: none;
            flex-direction: column;
            padding: 20px;
            animation: fadeIn 0.5s ease-in-out;
        `;

        modalAd.innerHTML = `
            <div style="text-align:right; cursor:pointer; font-weight:bold;" id="close-modal">&times;</div>
            <h3 style="color:#002244; margin-top: 0;">Try Our CRM Free for 7 Days</h3>
            <div id="modal-ad-slot"></div>
            <a href="#contact" style="text-decoration:none;">
                <button style="
                    background: #00a0e1;
                    color: white;
                    border: none;
                    padding: 12px;
                    font-size: 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    width: 100%;
                    font-weight: bold;
                    transition: background 0.3s;
                ">Start Free Trial</button>
            </a>
        `;

        document.body.appendChild(modalAd);

        const modalSlot = document.getElementById("modal-ad-slot");
        modalSlot.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="YOUR_AD_MODAL_SLOT"
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 data-video-ad-start="on"
                 data-adtest="on">
            </ins>
        `;

        // Show after delay or interaction
        setTimeout(() => {
            if (!adShown) {
                modalAd.style.display = 'block';
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.error("Adsense error:", e);
                    showFallbackAd(modalAd, "modal");
                }
                adShown = true;
            }
        }, 3000);

        // Close on click X or outside
        modalAd.querySelector("#close-modal").addEventListener("click", () => {
            modalAd.remove();
        });

        document.addEventListener("click", (e) => {
            if (modalAd.contains(modalAd) && !modalAd.contains(e.target)) {
                modalAd.remove();
            }
        });
    }

    // === 4. Fallback jika iklan tidak muncul ===
    function showFallbackAd(container, type = "default") {
        const fallback = document.createElement("div");
        fallback.style.cssText = `
            padding: 20px;
            text-align: center;
            color: #333;
        `;

        const messages = {
            floating: "Explore how our CRM software can boost your sales.",
            footer: "Start your free trial of the best CRM software.",
            modal: "Get started with powerful CRM tools today."
        };

        fallback.innerHTML = `
            <p><strong>Looking for CRM Solutions?</strong></p>
            <p>${messages[type]}</p>
            <a href="#contact" style="display:inline-block; margin-top:10px;">
                <button style="background:#00a0e1;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;">
                    Start Free Trial
                </button>
            </a>
        `;

        container.innerHTML = '';
        container.appendChild(fallback);
    }

    // === 5. Trigger Iklan Sesuai Event ===
    window.addEventListener("load", () => {
        insertFloatingAd();
        insertFooterAd();

        // Delay modal ad to avoid overload
        setTimeout(insertModalAd, 3000);
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 150 && !hasScrolled) {
            hasScrolled = true;
            insertModalAd();
        }
    });

    document.addEventListener("click", (e) => {
        if ((e.target.tagName === 'BUTTON' || e.target.closest('button')) && !adShown) {
            insertModalAd();
        }
    });

    // === 6. Prioritas Video Iklan ke Google AdSense ===
    function prioritizeVideoAds() {
        const allAds = document.querySelectorAll('.adsbygoogle');
        allAds.forEach(ad => {
            ad.setAttribute('data-video-ad-start', 'on');
        });
    }

    // Panggil setelah DOM siap
    window.addEventListener("load", () => {
        prioritizeVideoAds();
    });

    // === 7. Lazy Load Iklan Berdasarkan Scroll ===
    function lazyLoadAds() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            ad.style.opacity = '0';
            observer.observe(ad);
        });
    }

    window.addEventListener("load", () => {
        setTimeout(lazyLoadAds, 1000);
    });

    // === 8. Signal Analytics ke Google Tag Manager / GA4 (opsional) ===
    function trackAdEvent(eventType) {
        if (typeof gtag !== "undefined") {
            gtag('event', eventType, {
                event_category: 'CRM Ad',
                value: 1
            });
        }
        if (typeof ga !== "undefined") {
            ga('send', 'event', 'CRM Ad', eventType);
        }
    }

    // Tambahkan tracking saat iklan muncul
    window.addEventListener("load", () => {
        document.querySelectorAll('#floating-ad, #footer-ad, #modal-ad').forEach(ad => {
            if (ad.style.display === 'block') {
                trackAdEvent('ad_shown');
            }
        });
    });

    // === 9. Aksesibilitas Iklan ===
    function enhanceAccessibility() {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach(ad => {
            ad.setAttribute('role', 'complementary');
            ad.setAttribute('aria-label', 'Promotional Banner: Try our CRM Software for free');
        });
    }

    window.addEventListener("load", enhanceAccessibility);

    // === 10. Fitur Tambahan: Tooltip Promosi CRM di Tombol CTA ===
    function addTooltipToCTA() {
        const buttons = document.querySelectorAll("button, a[href='#contact']");
        buttons.forEach(btn => {
            btn.addEventListener("mouseover", () => {
                if (!btn.getAttribute('title')) {
                    btn.setAttribute('title', 'Start your free CRM trial now!');
                }
            });
        });
    }

    window.addEventListener("load", addTooltipToCTA);

    // === 11. Auto-hide floating ad saat hover terlalu lama ===
    function autoHideFloatingAd() {
        const floatingAd = document.getElementById('floating-ad');
        if (!floatingAd) return;

        let hideTimeout;
        floatingAd.addEventListener("mouseenter", () => {
            clearTimeout(hideTimeout);
        });

        floatingAd.addEventListener("mouseleave", () => {
            hideTimeout = setTimeout(() => {
                floatingAd.style.opacity = '0';
                setTimeout(() => floatingAd.remove(), 300);
            }, 5000);
        });
    }

    window.addEventListener("load", autoHideFloatingAd);
});
