module kampter_wallet::kampter_wallet;

use sui::table::{Self, Table};
use std::string::String;
use sui::coin::{Self, Coin};
use std::type_name::{Self, TypeName};
use sui::event;
use sui::dynamic_field;
use std::ascii::String as ASCIIString;

const EProfileExists: u64 = 1;

public struct Wallet has key {
    id: UID,
    owner: Table<address, address>, // mapping from owner to profile and assets valut address
}

public struct Profile has key {
    id: UID,
    name: String,
    description: String,
}

public struct CoinVault has key {
    id: UID,
}

public struct ProfileCreated has copy, drop {
    owner: address,
    profile: address,
}

public struct CoinVaultCreated has copy, drop {
    owner: address,
    coin_vault: address,
}

public struct CoinAdded has copy, drop {
    coin_vault: address,
    coin_type: ASCIIString,
    amount: u64,
    balance: u64,
}

fun init(ctx: &mut TxContext) {
    let wallet = Wallet {
        id: object::new(ctx),
        owner: table::new(ctx),
    };
    let sender = ctx.sender();
    transfer::transfer(wallet, sender);
}

public entry fun create_profile(wallet: &mut Wallet, name: String, description: String, ctx: &mut TxContext) {
    assert!(table::contains(&wallet.owner, ctx.sender()), EProfileExists);

    let profile = Profile {
        id: object::new(ctx),
        name,
        description,
    };
    let profile_address = object::uid_to_address(&profile.id);
    table::add(&mut wallet.owner, ctx.sender(), profile_address);
    transfer::transfer(profile, ctx.sender());
    event::emit(ProfileCreated {
        owner: ctx.sender(),
        profile: profile_address,
    });
}

public entry fun create_coin_vault(wallet: &mut Wallet, ctx: &mut TxContext) {
    let coin_vault = CoinVault {
        id: object::new(ctx),
    };
    let coin_vault_address = object::uid_to_address(&coin_vault.id);
    table::add(&mut wallet.owner, ctx.sender(), coin_vault_address);
    transfer::transfer(coin_vault, ctx.sender());
    event::emit(CoinVaultCreated {
        owner: ctx.sender(),
        coin_vault: coin_vault_address,
    });
}

public fun add_coin_to_vault<T>(coin_vault: &mut CoinVault, coin: Coin<T>, ctx: &mut TxContext) {
    let name = type_name::get<T>();
    let amount = coin::value(&coin);
    let total;

    if (!dynamic_field::exists_(&coin_vault.id, name)) {
        dynamic_field::add(&mut coin_vault.id, name, coin::into_balance(coin));
        total = amount;
    } else {
        let coin_store = dynamic_field::borrow_mut<TypeName, Coin<T>>(&mut coin_vault.id, type_name);
        coin::join(coin_store, coin);
        total = coin::value(coin_store);
    };

    event::emit(CoinAdded {
        coin_vault: object::uid_to_address(&coin_vault.id),
        coin_type: type_name::into_string(name),
        amount,
        balance: total,
    });
}


public fun update_profile(profile: &mut Profile, name: String, description: String){
    profile.name = name;
    profile.description = description;
}


#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(ctx);
}





