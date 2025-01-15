#[test_only]
module kampter_wallet::kampter_wallet_test;

use kampter_wallet::kampter_wallet::{Self, Wallet, CoinVault};
use sui::test_scenario::{Self};
use std::string;
use sui::sui::SUI;
use sui::test_utils::assert_eq;

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

#[test]
fun test_create_coin_vault() {
    let user = @0xa;
    let mut scenario_val = test_scenario::begin(user);
    let scenario = &mut scenario_val;
    kampter_wallet::init_for_testing(test_scenario::ctx(scenario));

    test_scenario::next_tx(scenario, user);
    {
        let mut wallet = test_scenario::take_shared<Wallet>(scenario);
        kampter_wallet::create_coin_vault(&mut wallet, test_scenario::ctx(scenario));
        test_scenario::return_shared<Wallet>(wallet);
    };

    test_scenario::end(scenario_val);
}

#[test]
fun test_add_coin_to_coin_vault() {

    let user = @0xa;
    let mut scenario_val = test_scenario::begin(user);
    let scenario = &mut scenario_val;
    kampter_wallet::init_for_testing(test_scenario::ctx(scenario));

    test_scenario::next_tx(scenario, user);
    {
        let mut wallet = test_scenario::take_shared<Wallet>(scenario);
        kampter_wallet::create_coin_vault(&mut wallet, test_scenario::ctx(scenario));
        test_scenario::return_shared<Wallet>(wallet);
    };

    test_scenario::next_tx(scenario, user);
    {
        let mut coin_vault = test_scenario::take_from_sender<CoinVault>(scenario);
        let testing_coin = sui::coin::mint_for_testing<SUI>(1000000, test_scenario::ctx(scenario));
        
        kampter_wallet::add_coin_to_vault(&mut coin_vault, testing_coin, test_scenario::ctx(scenario));
        test_scenario::return_to_sender<CoinVault>(scenario, coin_vault);
    };

    test_scenario::end(scenario_val);
}

#[test]
fun test_get_coin_balance_from_coin_vault() {

    let user = @0xa;
    let mut scenario_val = test_scenario::begin(user);
    let scenario = &mut scenario_val;
    kampter_wallet::init_for_testing(test_scenario::ctx(scenario));

    test_scenario::next_tx(scenario, user);
    {
        let mut wallet = test_scenario::take_shared<Wallet>(scenario);
        kampter_wallet::create_coin_vault(&mut wallet, test_scenario::ctx(scenario));
        test_scenario::return_shared<Wallet>(wallet);
    };

    test_scenario::next_tx(scenario, user);
    {
        let mut coin_vault = test_scenario::take_from_sender<CoinVault>(scenario);
        let testing_coin = sui::coin::mint_for_testing<SUI>(1000000, test_scenario::ctx(scenario));
        
        kampter_wallet::add_coin_to_vault(&mut coin_vault, testing_coin, test_scenario::ctx(scenario));
        test_scenario::return_to_sender<CoinVault>(scenario, coin_vault);
    };

    test_scenario::next_tx(scenario, user);
    {
        let coin_vault = test_scenario::take_from_sender<CoinVault>(scenario);
        let balance = kampter_wallet::get_coin_vault_balance<SUI>(&coin_vault);
        assert_eq(balance, 1000000);
        test_scenario::return_to_sender<CoinVault>(scenario, coin_vault);
    };

    test_scenario::end(scenario_val);
}