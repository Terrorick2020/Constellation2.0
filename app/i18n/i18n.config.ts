import ruAuthMotivation from './ru/auth/motivation.json'
import ruAuthSignIn from './ru/auth/sign-in.json'
import ruAuthSignUp from './ru/auth/sign-up.json'
import ruAuthResetPass from './ru/auth/reset-pass.json'
import ruOther from './ru/auth/other.json'
import ruVerifyEmail from './ru/auth/verify-email.json'

import ruClients from './ru/settings/clients.json'
import ruCommon from './ru/settings/common.json'
import ruInventory from './ru/settings/inventory.json'
import ruScope from './ru/settings/scope.json'

import ruOffers from './ru/offers.json'
import ruChats from './ru/chats.json'
import ruCatalog from './ru/catalog.json'
import ruFeed from './ru/feed.json'


import enAuthMotivation from './en/auth/motivation.json'
import enAuthSignIn from './en/auth/sign-in.json'
import enAuthSignUp from './en/auth/sign-up.json'
import enAuthResetPass from './en/auth/reset-pass.json'
import enOther from './en/auth/other.json'
import enVerifyEmail from './en/auth/verify-email.json'

import enClients from './en/settings/clients.json'
import enCommon from './en/settings/common.json'
import enInventory from './en/settings/inventory.json'
import enScope from './en/settings/scope.json'

import enOffers from './en/offers.json'
import enChats from './en/chats.json'
import enCatalog from './en/catalog.json'
import enFeed from './en/feed.json'



const ru = {
    authPage: {
        motivation: ruAuthMotivation,
        resetPass: ruAuthResetPass,
        signIn: ruAuthSignIn,
        signUp: ruAuthSignUp,
        other: ruOther,
        verifyEmail: ruVerifyEmail,
    },
    settingsPage: {
        clients: ruClients,
        common: ruCommon,
        inventory: ruInventory,
        scope: ruScope,
    },
    offersPage: ruOffers,
    chatsPage: ruChats,
    catalogPage: ruCatalog,
    feedPage: ruFeed,
}

const en = {
    authPage: {
        motivation: enAuthMotivation,
        resetPass: enAuthResetPass,
        signIn: enAuthSignIn,
        signUp: enAuthSignUp,
        other: enOther,
        verifyEmail: enVerifyEmail,
    },
    settingsPage: {
        clients: enClients,
        common: enCommon,
        inventory: enInventory,
        scope: enScope,
    },
    offersPage: enOffers,
    chatsPage: enChats,
    catalogPage: enCatalog,
    feedPage: enFeed,
}

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ru',
    messages: {
        ru,
        en,
    }
}))
