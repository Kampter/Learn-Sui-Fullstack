module kampter_wallet::kampter_market;

use sui::table::{Self, Table};
use sui::bag::{Self, Bag};
use sui::coin::{Self, Coin};
use sui::dynamic_object_field as dofield;

const ENotOwner: u64 = 1;
const ENotEnoughFunds: u64 = 2;

public struct Market<phantom COIN> has key {
    id: UID,
    items: Bag, // a bag of listings listed by seller
    payments: Table<address, Coin<COIN>> // a payment notebook records the profits earned by the seller
}

public struct Listing has key, store {
    id: UID,
    ask: u64,
    owner: address,
}

public fun create_market<COIN>(ctx: &mut TxContext) {
    let id = object::new(ctx);
    let items = bag::new(ctx);
    let payments = table::new<address, Coin<COIN>>(ctx);
    transfer::share_object(Market<COIN> {
        id,
        items,
        payments
    });
}

public fun create_listing<T: key + store, COIN>(
    market: &mut Market<COIN>, 
    item: T,
    ask: u64, 
    ctx: &mut TxContext
) {
    let item_id = object::id(&item);
    let mut listing = Listing {
        id: object::new(ctx),
        ask,
        owner: ctx.sender(),
    };

    // add the item to the listing
    dofield::add(&mut listing.id, true, item);
    // add the listing to the market
    bag::add(&mut market.items, item_id, listing);
}

fun delete_listing<T: key + store, COIN>(
    market: &mut Market<COIN>, 
    item_id: ID, 
    ctx: &mut TxContext
): T {
    // remove the listing from the market
    let Listing {
        mut id,
        ask: _,
        owner,
    } = bag::remove(&mut market.items, item_id);

    assert!(owner == ctx.sender(), ENotOwner);
    
    // remove the item from the listing
    let item = dofield::remove(&mut id, true);
    object::delete(id);
    item
}

public fun delete_listing_and_return_item<T: key + store, COIN>(
    market: &mut Market<COIN>, 
    item_id: ID, 
    ctx: &mut TxContext
){
    let item = delete_listing<T, COIN>(market, item_id, ctx);
    transfer::public_transfer(item, ctx.sender());
}

fun buy<T: key + store, COIN>(
    market: &mut Market<COIN>, 
    item_id: ID, 
    paid: Coin<COIN>,
): T {
    let Listing {
        mut id,
        ask,
        owner,
    } = bag::remove(&mut market.items, item_id);

    assert!(coin::value(&paid) >= ask, ENotEnoughFunds);

    // check if payment table aready has a record for the seller
    if (table::contains<address, Coin<COIN>>(&market.payments, owner)) {
        let payment = table::borrow_mut<address, Coin<COIN>>(&mut market.payments, owner);
        coin::join(payment, paid);
    } else { // create a new record for the seller
        table::add(&mut market.payments, owner, paid);
    };

    // remove the item from the listing
    let item = dofield::remove(&mut id, true);
    object::delete(id);
    item
}

public fun buy_and_take<T: key + store, COIN>(
    market: &mut Market<COIN>, 
    item_id: ID, 
    paid: Coin<COIN>,
    ctx: &mut TxContext
) {
    // buy the item
    let item = buy<T, COIN>(market, item_id, paid);
    // take the item
    transfer::public_transfer(item, ctx.sender());
}

#[lint_allow(self_transfer)]
public fun take_profit<COIN>(
    market: &mut Market<COIN>, 
    ctx: &mut TxContext
) {
    assert!(table::contains<address, Coin<COIN>>(&market.payments, ctx.sender()), ENotOwner);
    let payment = table::remove<address, Coin<COIN>>(&mut market.payments, ctx.sender());
    transfer::public_transfer(payment, ctx.sender());
}