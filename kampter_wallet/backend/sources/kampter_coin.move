module kampter_wallet::kampter_coin;

use sui::coin::{Self, TreasuryCap};

public struct KAMPTER_COIN has drop {}

fun init(witness: KAMPTER_COIN, ctx: &mut TxContext) {
		let (treasury, metadata) = coin::create_currency(
				witness,
				6,
				b"KAMPTER_COIN",
				b"KAMPTER_COIN",
				b"KAMPTER_COIN",
				option::none(),
				ctx,
		);
		transfer::public_freeze_object(metadata);
		transfer::public_transfer(treasury, ctx.sender())
}

public fun mint(
		treasury_cap: &mut TreasuryCap<KAMPTER_COIN>,
		amount: u64,
		recipient: address,
		ctx: &mut TxContext,
) {
		let coin = coin::mint(treasury_cap, amount, ctx);
		transfer::public_transfer(coin, recipient)
}