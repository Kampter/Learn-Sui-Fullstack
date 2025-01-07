module tictactoe::game {
    use sui::event;
    use sui::transfer::Receiving; 

    // Error Codes
    const EInvalidMarkLocation: u64 = 0;
    const EInvalidPlayer: u64 = 1;
    const EGameOver: u64 = 2; // 需要添加游戏结束错误码

    // MARK
    const MARK_EMPTY: u8 = 0;
    const MARK_X: u8 = 1;
    const MARK_O: u8 = 2;

    // Turn
    const TURN_X: u8 = 0;
    const TURN_O: u8 = 1;

    public struct Game has key {
        id: UID,            // 游戏唯一标识符
        x: address,         // X玩家地址
        o: address,         // O玩家地址
        board: vector<vector<u8>>, // 棋盘状态
        turn: u8,           // 当前轮到谁下棋
        admin: vector<u8>,  // 管理员    
    }

    public struct Mark has key, store {
        id: UID,
        player: address,
        row: u8,
        col: u8,
    }

    public struct TurnCap has key {
        id: UID,
        game: ID,
    }

    public struct GameCreated has copy, drop {
        game_id: ID,
    }

    public struct MarkSent has copy, drop {
        game: ID,
        mark: ID,
    }

    #[test_only]
    use sui::test_scenario::{Self, Scenario};

    #[test_only]
    const TEST_ADMIN: vector<u8> = vector[1, 2, 3, 4];

    #[test_only]
    /// 创建一个测试场景和玩家
    public fun test_init(ctx: &mut Scenario) {
        test_scenario::next_tx(ctx, @0xA);
        // 创建游戏
        let game = create_game(@0xA, @0xB, TEST_ADMIN, test_scenario::ctx(ctx));
        // 将游戏转移到共享对象
        transfer::share_object(game);
    }

    #[test_only]
    /// 获取游戏对象的可变引用
    public fun get_game_mut(ctx: &mut Scenario): &mut Game {
        test_scenario::take_shared<Game>(ctx)
    }

    #[test_only]
    /// 返回游戏对象
    public fun return_game(ctx: &mut Scenario, game: Game) {
        test_scenario::return_shared(game);
    }

    #[test_only]
    /// 获取玩家的 TurnCap
    public fun get_turn_cap(ctx: &mut Scenario): TurnCap {
        test_scenario::take_from_sender<TurnCap>(ctx)
    }

    #[test_only]
    /// 检查棋盘上的标记
    public fun assert_mark_at(game: &Game, row: u8, col: u8, expected: u8) {
        let board = &game.board;
        let row_vec = vector::borrow(board, (row as u64));
        let mark = vector::borrow(row_vec, (col as u64));
        assert!(*mark == expected, 0);
    }

    #[test]
    fun test_create_game() {
        let scenario = test_scenario::begin(@0xA);
        let ctx = &mut scenario;
        
        // 初始化游戏
        test_init(ctx);
        
        // 验证游戏创建
        let game = get_game_mut(ctx);
        assert!(game.x == @0xA, 0);
        assert!(game.o == @0xB, 0);
        assert!(game.turn == TURN_X, 0);
        
        // 验证初始棋盘
        assert_mark_at(game, 0, 0, MARK_EMPTY);
        assert_mark_at(game, 1, 1, MARK_EMPTY);
        assert_mark_at(game, 2, 2, MARK_EMPTY);
        
        return_game(ctx, *game);
        test_scenario::end(scenario);
    }

    public fun create_game(x: address, o: address, admin: vector<u8>, ctx: &mut TxContext): Game {
        let game = Game {
            id: object::new(ctx),
            x,
            o,
            board: vector[
                vector[MARK_EMPTY, MARK_EMPTY, MARK_EMPTY],
                vector[MARK_EMPTY, MARK_EMPTY, MARK_EMPTY],
                vector[MARK_EMPTY, MARK_EMPTY, MARK_EMPTY],
            ],
            turn: TURN_X,
            admin,
        };

        let turn_cap = TurnCap {
            id: object::new(ctx),
            game: object::id(&game),
        };

        // x 先手
        transfer::transfer(turn_cap, x);
        event::emit(GameCreated {
            game_id: object::uid_to_inner(&game.id),
        });
        game
    }

    public fun send_mark(cap: &TurnCap, row: u8, col: u8, game: &Game, ctx: &mut TxContext) {
        // 验证TurnCap对应的游戏ID是否匹配
        assert!(cap.game == object::id(game), EInvalidPlayer);
        assert!(row < 3 && col < 3, EInvalidMarkLocation);

        let mark = Mark {
            id: object::new(ctx),
            player: ctx.sender(),
            row,
            col,
        };
        
        let mark_id = object::id(&mark);
        transfer::transfer(mark, object::uid_to_address(&game.id));     
        
        event::emit(MarkSent {
            game: object::id(game),
            mark: mark_id,
        });
    }

    public fun place_mark(mark: Receiving<Mark>, game: &mut Game, ctx: &mut TxContext) {
        let Mark { id: mark_id, player, row, col } = transfer::receive(&mut game.id, mark);
        
        let (valid_player, mark_type, next_player) = if (game.turn == TURN_X) {
            (game.x, MARK_X, game.o)
        } else {
            (game.o, MARK_O, game.x)
        };

        assert!(player == valid_player, EInvalidPlayer);

        let board = &mut game.board;
        let row_vec = vector::borrow_mut(board, (row as u64));
        let current_mark = vector::borrow(row_vec, (col as u64));
        
        assert!(*current_mark == MARK_EMPTY, EInvalidMarkLocation);
        
        let row_vec = vector::borrow_mut(board, (row as u64));
        *vector::borrow_mut(row_vec, (col as u64)) = mark_type;
        
        // check game over
        if (check_win(board)) {
            assert!(false, EGameOver); 
        } else {
            game.turn = if (game.turn == TURN_X) { TURN_O } else { TURN_X };

            let turn_cap = TurnCap {
                id: object::new(ctx),
                game: object::id(game),
            };
            transfer::transfer(turn_cap, next_player);
        };

        object::delete(mark_id);
    }

    // === Private Helpers ===
    fun check_win(board: &vector<vector<u8>>): bool {
        let size = 3;

        // 检查横行
        let mut row = 0;
        while (row < size) {
            let row_vec = vector::borrow(board, (row as u64));
            if (*vector::borrow(row_vec, 0) != MARK_EMPTY && 
                *vector::borrow(row_vec, 0) == *vector::borrow(row_vec, 1) && 
                *vector::borrow(row_vec, 1) == *vector::borrow(row_vec, 2)) {
                return true
            };
            row = row + 1;
        };

        // 检查竖列
        let mut col = 0;
        while (col < size) {
            if (*vector::borrow(vector::borrow(board, 0), (col as u64)) != MARK_EMPTY &&
                *vector::borrow(vector::borrow(board, 0), (col as u64)) == *vector::borrow(vector::borrow(board, 1), (col as u64)) &&
                *vector::borrow(vector::borrow(board, 1), (col as u64)) == *vector::borrow(vector::borrow(board, 2), (col as u64))) {
                return true
            };
            col = col + 1;
        };

        // 检查主对角线
        if (*vector::borrow(vector::borrow(board, 0), 0) != MARK_EMPTY &&
            *vector::borrow(vector::borrow(board, 0), 0) == *vector::borrow(vector::borrow(board, 1), 1) &&
            *vector::borrow(vector::borrow(board, 1), 1) == *vector::borrow(vector::borrow(board, 2), 2)) {
            return true
        };

        // 检查副对角线
        if (*vector::borrow(vector::borrow(board, 0), 2) != MARK_EMPTY &&
            *vector::borrow(vector::borrow(board, 0), 2) == *vector::borrow(vector::borrow(board, 1), 1) &&
            *vector::borrow(vector::borrow(board, 1), 1) == *vector::borrow(vector::borrow(board, 2), 0)) {
            return true
        };

        false
    }
}
