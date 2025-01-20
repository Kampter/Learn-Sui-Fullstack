module kampter_wallet::kampter_note;

use std::string::String;

public struct Notes has key {
    id: UID
}

public struct Note has key, store {
    id: UID,
    title: String,
    body: String
}

#[allow(unused_function)]
fun init (ctx: &mut TxContext) {
    let notes = Notes {
        id: object::new(ctx)
    };
    transfer::share_object(notes);
}

public entry fun create_note (title: String, body: String, ctx: &mut TxContext) {
    let note = Note {
        id: object::new(ctx),
        title,
        body
    };
    transfer::transfer(note, ctx.sender());
}

public entry fun delete_note (note: Note, _ctx: &mut TxContext) {
    let Note { id, title, body } = note;
    object::delete(id);
}