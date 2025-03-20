export const clientRoutes = {
    account: {
        main: '/account',
        local: {
            admin: '/admin',
            ads: '/ads',
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
                    list: '/list',
                    doc: '/doc',
                },
            },
            chats: {
                main: '/chats',
                local: {
                    all: '/all',
                    certain: '/certain',
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
