module distributed_counter::counter;

public struct Counter has key {
    id: UID,
    value: u64,
    owner: address
}

/// Create a new counter owned by the sender
public entry fun create(ctx: &mut TxContext) {
    let counter = Counter {
        id: object::new(ctx),
        value: 0,
        owner: tx_context::sender(ctx)
    };
    transfer::share_object(counter)
}

/// Increment the counter value by 1
public entry fun increment(counter: &mut Counter) {
    counter.value = counter.value + 1;
}

/// Reset the counter value to 0 (only owner can call this)
public entry fun reset(counter: &mut Counter, ctx: &TxContext) {
    assert!(counter.owner == tx_context::sender(ctx), 0);
    counter.value = 0;
}

/// Get the counter's value
public fun value(counter: &Counter): u64 {
    counter.value
}

/// Get the counter's owner
public fun owner(counter: &Counter): address {
    counter.owner
}