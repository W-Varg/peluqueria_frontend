import { computed, reactive } from 'vue';

const layoutConfig = reactive({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'drawer',
    menuTheme: 'light'
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    rightMenuActive: false,
    topbarMenuActive: false,
    sidebarActive: false,
    anchored: false,
    activeMenuItem: null,
    overlaySubmenuActive: false
});

export function useLayout() {
    const setMenuMode = (mode) => {
        layoutConfig.menuMode = mode;

        if (mode === 'static') {
            layoutState.staticMenuDesktopInactive = false;
        }
        if (mode === 'horizontal') {
            if (!layoutConfig.darkTheme) {
                if (!document.startViewTransition) {
                    layoutConfig.menuTheme = 'light';

                    return;
                }

                document.startViewTransition(() => (layoutConfig.menuTheme = 'light'));
            } else {
                if (!document.startViewTransition) {
                    layoutConfig.menuTheme = 'dark';

                    return;
                }

                document.startViewTransition(() => (layoutConfig.menuTheme = 'dark'));
            }
        }
    };

    const setActiveMenuItem = (item) => {
        layoutState.activeMenuItem = item.value || item;
    };

    const toggleMenu = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const toggleConfigSidebar = () => {
        if (isSidebarActive.value) {
            layoutState.overlayMenuActive = false;
            layoutState.overlaySubmenuActive = false;
            layoutState.staticMenuMobileActive = false;
            layoutState.menuHoverActive = false;
        }

        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive);

    const isDesktop = computed(() => window.innerWidth > 991);

    const isSlim = computed(() => layoutConfig.menuMode === 'slim');
    const isSlimPlus = computed(() => layoutConfig.menuMode === 'slim-plus');
    const isHorizontal = computed(() => layoutConfig.menuMode === 'horizontal');
    const isOverlay = computed(() => layoutConfig.menuMode === 'overlay');

    const isDarkTheme = computed(() => layoutConfig.darkTheme);
    const getPrimary = computed(() => layoutConfig.primary);
    const getSurface = computed(() => layoutConfig.surface);

    return {
        layoutConfig,
        layoutState,
        getPrimary,
        getSurface,
        isDarkTheme,
        setMenuMode,
        toggleMenu,
        isSidebarActive,
        setActiveMenuItem,
        toggleConfigSidebar,
        isSlim,
        isSlimPlus,
        isHorizontal,
        isDesktop,
        isOverlay
    };
}
