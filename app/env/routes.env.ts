
export const clientRoutes = {
    catalog: {
        main: '/catalog',
        param: '/[name]',
    },
    settings: {
        main: '/settings',
        local: {
            clients: '/clients',
            common: '/common',
            inventory: '/inventory',
            scope: '/scope',
        }
    },
    auth: {
        main: '/auth',
        local: {
            resetPass: '/reset-pass',
            signIn: '/sign-in',
            signUp: '/sign-up',
            verifyEmail: '/verify-email'
        }
    },
    chats: '/chats',
    main: '/',
    signIn: '/login',
    offers: 'offers',
    privacy: '/privacy',
    rules: '/rules',
    signUp: '/register',
    resetPass: '/reset-pass',
    // new path to view document
    viewdocument: '/viewdocument',
}
