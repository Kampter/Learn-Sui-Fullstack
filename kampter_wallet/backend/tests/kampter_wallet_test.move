#[test_only]
module kampter_wallet::kampter_wallet_test;

use kampter_wallet::kampter_wallet::{Self, Wallet};
use sui::test_scenario::{Self};
use std::string;

 #[test]
fun test_create_profile() {
    let user = @0xa;
    let mut scenario_val = test_scenario::begin(user);
    let scenario = &mut scenario_val;
    kampter_wallet::init_for_testing(test_scenario::ctx(scenario));

    test_scenario::next_tx(scenario, user);
    let name = string::utf8(b"Alice");
    let description = string::utf8(b"Alice's profile");
    {
        let mut wallet = test_scenario::take_shared<Wallet>(scenario);
        kampter_wallet::create_profile(&mut wallet, name, description, test_scenario::ctx(scenario)); 
        test_scenario::return_shared<Wallet>(wallet);
    };

    test_scenario::end(scenario_val);
}