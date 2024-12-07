// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LiarsPokerRooms {
    struct Player {
        uint256 serialNumber;
        bool hasJoined;
        bool hasRevealed;
        uint256 stake;
    }
    
    struct Bid {
        address player;
        uint8 digit;
        uint8 quantity;
    }

    struct GameRoom {
        uint256 roomId;
        address creator;
        uint256 entryFee;
        address[] players;
        mapping(address => Player) playerInfo;
        GameState state;
        Bid currentBid;
        address currentTurn;
        address lastBidder;
        address winner;
        bool exists;
    }

    enum GameState { WAITING, PLAYING, REVEALING, FINISHED }
    
    uint256 private nextRoomId = 1;
    mapping(uint256 => GameRoom) public gameRooms;
    mapping(address => uint256) public playerCurrentRoom; // Track which room a player is in
    
    uint256 public constant MIN_PLAYERS = 2;
    uint256 public constant MAX_PLAYERS = 6;
    
    event RoomCreated(uint256 roomId, address creator, uint256 entryFee);
    event PlayerJoined(uint256 roomId, address player);
    event GameStarted(uint256 roomId, address[] players);
    event NewBid(uint256 roomId, address bidder, uint8 digit, uint8 quantity);
    event LiarCalled(uint256 roomId, address caller, address bidder);
    event GameEnded(uint256 roomId, address winner, uint256 prize);
    
    modifier onlyRoomCreator(uint256 _roomId) {
        require(gameRooms[_roomId].creator == msg.sender, "Only room creator");
        _;
    }
    
    modifier roomExists(uint256 _roomId) {
        require(gameRooms[_roomId].exists, "Room doesn't exist");
        _;
    }
    
    modifier notInGame() {
        require(playerCurrentRoom[msg.sender] == 0, "Already in a game");
        _;
    }

    function createRoom(uint256 _entryFee) external returns (uint256) {
        require(_entryFee > 0, "Entry fee must be positive");
        
        uint256 roomId = nextRoomId++;
        GameRoom storage newRoom = gameRooms[roomId];
        
        newRoom.roomId = roomId;
        newRoom.creator = msg.sender;
        newRoom.entryFee = _entryFee;
        newRoom.state = GameState.WAITING;
        newRoom.exists = true;
        
        emit RoomCreated(roomId, msg.sender, _entryFee);
        return roomId;
    }
    
    function joinRoom(uint256 _roomId, uint256 _serialNumber) external payable roomExists(_roomId) notInGame {
        GameRoom storage room = gameRooms[_roomId];
        
        require(room.state == GameState.WAITING, "Game already started");
        require(msg.value == room.entryFee, "Incorrect entry fee");
        require(room.players.length < MAX_PLAYERS, "Room full");
        require(!room.playerInfo[msg.sender].hasJoined, "Already joined");
        
        room.playerInfo[msg.sender] = Player({
            serialNumber: _serialNumber,
            hasJoined: true,
            hasRevealed: false,
            stake: msg.value
        });
        
        room.players.push(msg.sender);
        playerCurrentRoom[msg.sender] = _roomId;
        
        emit PlayerJoined(_roomId, msg.sender);
    }
    
    function startGame(uint256 _roomId) external roomExists(_roomId) onlyRoomCreator(_roomId) {
        GameRoom storage room = gameRooms[_roomId];
        
        require(room.state == GameState.WAITING, "Game not in waiting state");
        require(room.players.length >= MIN_PLAYERS, "Not enough players");
        
        room.state = GameState.PLAYING;
        room.currentTurn = room.players[0];
        
        emit GameStarted(_roomId, room.players);
    }
    
    function makeBid(uint256 _roomId, uint8 _digit, uint8 _quantity) external roomExists(_roomId) {
        GameRoom storage room = gameRooms[_roomId];
        
        require(room.state == GameState.PLAYING, "Game not in playing state");
        require(room.playerInfo[msg.sender].hasJoined, "Not a player");
        require(msg.sender == room.currentTurn, "Not your turn");
        require(_digit <= 9, "Invalid digit");
        require(_quantity > 0, "Invalid quantity");
        
        if (room.lastBidder != address(0)) {
            require(
                _quantity > room.currentBid.quantity || 
                (_quantity == room.currentBid.quantity && _digit > room.currentBid.digit),
                "Bid must be higher"
            );
        }
        
        room.currentBid = Bid({
            player: msg.sender,
            digit: _digit,
            quantity: _quantity
        });
        
        room.lastBidder = msg.sender;
        updateTurn(_roomId);
        
        emit NewBid(_roomId, msg.sender, _digit, _quantity);
    }
    
    function callLiar(uint256 _roomId) external roomExists(_roomId) {
        GameRoom storage room = gameRooms[_roomId];
        
        require(room.state == GameState.PLAYING, "Game not in playing state");
        require(room.playerInfo[msg.sender].hasJoined, "Not a player");
        require(msg.sender == room.currentTurn, "Not your turn");
        require(room.lastBidder != address(0), "No bid to challenge");
        
        room.state = GameState.REVEALING;
        emit LiarCalled(_roomId, msg.sender, room.lastBidder);
    }
    
    function revealNumber(uint256 _roomId) external roomExists(_roomId) {
        GameRoom storage room = gameRooms[_roomId];
        
        require(room.state == GameState.REVEALING, "Game not in revealing state");
        require(room.playerInfo[msg.sender].hasJoined, "Not a player");
        require(!room.playerInfo[msg.sender].hasRevealed, "Already revealed");
        
        room.playerInfo[msg.sender].hasRevealed = true;
        
        if (allPlayersRevealed(_roomId)) {
            determineWinner(_roomId);
        }
    }
    
    function determineWinner(uint256 _roomId) internal {
        GameRoom storage room = gameRooms[_roomId];
        uint8 totalCount = 0;
        
        // Count total occurrences of the bid digit
        for (uint i = 0; i < room.players.length; i++) {
            address playerAddr = room.players[i];
            uint256 serialNum = room.playerInfo[playerAddr].serialNumber;
            
            while (serialNum > 0) {
                if (uint8(serialNum % 10) == room.currentBid.digit) {
                    totalCount++;
                }
                serialNum /= 10;
            }
        }
        
        // Determine winner
        if (totalCount >= room.currentBid.quantity) {
            room.winner = room.lastBidder;
        } else {
            room.winner = room.currentTurn;
        }
        
        // Distribute prize
        uint256 prize = room.players.length * room.entryFee;
        payable(room.winner).transfer(prize);
        
        room.state = GameState.FINISHED;
        
        // Clear player room assignments
        for (uint i = 0; i < room.players.length; i++) {
            playerCurrentRoom[room.players[i]] = 0;
        }
        
        emit GameEnded(_roomId, room.winner, prize);
    }
    
    function updateTurn(uint256 _roomId) internal {
        GameRoom storage room = gameRooms[_roomId];
        
        uint256 currentIndex;
        for (uint i = 0; i < room.players.length; i++) {
            if (room.players[i] == room.currentTurn) {
                currentIndex = i;
                break;
            }
        }
        
        room.currentTurn = room.players[(currentIndex + 1) % room.players.length];
    }
    
    function allPlayersRevealed(uint256 _roomId) internal view returns (bool) {
        GameRoom storage room = gameRooms[_roomId];
        
        for (uint i = 0; i < room.players.length; i++) {
            if (!room.playerInfo[room.players[i]].hasRevealed) {
                return false;
            }
        }
        return true;
    }
    
    // View functions
    function getRoomPlayers(uint256 _roomId) external view returns (address[] memory) {
        return gameRooms[_roomId].players;
    }
    
    function getRoomState(uint256 _roomId) external view returns (GameState) {
        return gameRooms[_roomId].state;
    }
    
    function getCurrentBid(uint256 _roomId) external view returns (address, uint8, uint8) {
        Bid memory bid = gameRooms[_roomId].currentBid;
        return (bid.player, bid.digit, bid.quantity);
    }
    
    function getCurrentTurn(uint256 _roomId) external view returns (address) {
        return gameRooms[_roomId].currentTurn;
    }
}