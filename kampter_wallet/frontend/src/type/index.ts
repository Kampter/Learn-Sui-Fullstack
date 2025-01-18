import { CoinMetadata } from "@mysten/sui/client"

export type Profile = {
    owner: string,
    name: string,
    description: string,
}

// 前端会访问到非常多的wallet，因为wallet是被所有用户共享的
export type Wallet = {
    user: User[]
}

// 
export type User = {
    id: string,
    profile: Profile,
    coinVault: CoinVault
}

export type CoinVault = {
    owner: string,
    coins: Coin[]
}

export type Coin = {
    id: string,
    name: string,
    balance: number
}

export type SuiObject = {
    id: string,
    type: string,
    coinMetadata?: CoinMetadata,
    balance?: number,
}

export type EventProfileCreated = {
    profile: Profile,
    owner: string
}

export type EventCoinVaultCreated = {
    coinVault: CoinVault,
    owner: string
}

export type EventCoinAdded = {
    coin: Coin,
    coinVault: CoinVault,
}