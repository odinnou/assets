(function () {
    var now = Date.now();
    var visitStartedAt = now;
    var firstLinkClicked = false;
    var landingPage = window.location.pathname;
    var visitTimeoutMs = 30 * 60 * 1000;

    try {
        var storedVisitStartedAt = Number(sessionStorage.getItem('caresse_visit_started_at'));
        var storedLastSeenAt = Number(sessionStorage.getItem('caresse_last_seen_at'));
        var continuesVisit = storedVisitStartedAt > 0 && storedLastSeenAt > 0 && now - storedLastSeenAt <= visitTimeoutMs;

        if (continuesVisit) {
            visitStartedAt = storedVisitStartedAt;
            firstLinkClicked = sessionStorage.getItem('caresse_link_clicked') === '1';
            landingPage = sessionStorage.getItem('caresse_landing_page') || landingPage;
        } else {
            sessionStorage.setItem('caresse_visit_started_at', String(visitStartedAt));
            sessionStorage.setItem('caresse_landing_page', landingPage);
            sessionStorage.removeItem('caresse_link_clicked');
        }
        sessionStorage.setItem('caresse_last_seen_at', String(now));
    } catch (_) {
        // Session storage is optional; tracking still works when it is unavailable.
    }

    function getStore(url) {
        if (url.hostname === 'apps.apple.com') return 'app_store';
        if (url.hostname === 'play.google.com') return 'google_play';
        return null;
    }

    function getPosition(link) {
        if (link.dataset.ctaPosition) return link.dataset.ctaPosition;
        if (link.closest('.mobile-store-cta')) return 'sticky';
        if (link.id === 'post-listen-store-cta') return 'post_listen';
        if (link.closest('.hero') || /^hero-/.test(link.id)) return 'hero';
        if (link.closest('footer')) return 'footer';
        if (link.classList.contains('store-badge')) return 'store_badge';
        return 'inline';
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;

        var isFirstLinkClick = !firstLinkClicked;
        firstLinkClicked = true;

        try {
            sessionStorage.setItem('caresse_link_clicked', '1');
            sessionStorage.setItem('caresse_last_seen_at', String(Date.now()));
        } catch (_) {
            // Keep navigation and tracking functional in restricted browsers.
        }

        try {
            var destination = new URL(link.href, window.location.href);
            var store = getStore(destination);
            if (!store || !window.umami || typeof window.umami.track !== 'function') return;

            window.umami.track('store_click', {
                store: store,
                landing_page: landingPage,
                cta_position: getPosition(link),
                locale: document.documentElement.lang || 'unknown',
                elapsed_ms: Math.max(0, Date.now() - visitStartedAt),
                first_link_click: isFirstLinkClick,
                variant: document.documentElement.dataset.analyticsVariant || 'store-first-v1',
                test: new URLSearchParams(window.location.search).get('analytics_test') === '1'
            });
        } catch (_) {
            // Analytics must never interfere with the store navigation.
        }
    });
})();
