export const clientRoutes = {
    account: {
        main: '/account',
        local: {
            settings: {
                main: '/settings',
                local: {
                    profile: '/profile',
                    service: '/service'
                }
            },
            catalog: {
                main: '/catalog',
                local: {
                    doc: '/doc',
                    list: '/list',
                },
            },
            chats: {
                main: '/chats',
                local: {
                    certain: '/certain',
                    all: '/all'
                }
            },
        },
    },
    auth: {
        main: '/auth',
        local: {
            resetPass: '/reset-pass',
            signIn: '/sign-in',
            signUp: '/sign-up',
        },
    },
    preview: {
        main: '/preview',
        local: {
            index: '/',
            offers: '/offers',
            privacy: '/privacy'
        },
    },
    error: '/error',
    notFound: '/not-found',
}
