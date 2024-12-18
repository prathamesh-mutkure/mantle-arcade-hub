// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameMarketplace {
    // Enum to represent game categories
    enum GameCategory {
        Featured,
        Action,
        Adventure,
        Arcade,
        Puzzle,
        Strategy,
        Sports,
        Racing,
        Simulation,
        Casino,
        Partner,
        Other
    }

    // Struct to represent a game
    struct Game {
        string id;
        string name;
        string poster;
        string flashFile;
        GameCategory[] categories;
        string description;
        bool featured;
        bool isMobileFriendly;
        GameType gameType;
        address submitter;
        GameStatus status;
    }

    // Enum to represent game type
    enum GameType {
        Flash,
        IFrame
    }

    // Enum to track game submission status
    enum GameStatus {
        Pending,
        Approved,
        Rejected
    }

    // Mapping to store games by their ID
    mapping(string => Game) private games;

    // Array to keep track of all game IDs
    string[] private gameIds;

    // Mapping to check if a game ID exists
    mapping(string => bool) private gameExists;

    // Owner of the contract
    address public owner;

    // Submission fee
    uint256 public submissionFee;

    // Stake required for game submission
    uint256 public submissionStake;

    // Mapping to track user submissions
    mapping(address => uint256) public userSubmissionCount;

    // Maximum submissions per user
    uint256 public maxSubmissionsPerUser;

    // Events for game-related actions
    event GameSubmitted(string indexed gameId, string name, address submitter);
    event GameApproved(string indexed gameId, string name);
    event GameRejected(string indexed gameId, string name, string reason);
    event StakeReturned(address submitter, uint256 amount);
    event StakeConfiscated(address submitter, uint256 amount);

    // Modifier to restrict access to contract owner
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can perform this action"
        );
        _;
    }

    // Constructor to set the contract parameters
    constructor(
        uint256 _submissionFee,
        uint256 _submissionStake,
        uint256 _maxSubmissionsPerUser
    ) {
        owner = msg.sender;
        submissionFee = _submissionFee;
        submissionStake = _submissionStake;
        maxSubmissionsPerUser = _maxSubmissionsPerUser;
    }

    /**
     * Submit a new game to the marketplace
     * @param _game The game to be submitted
     */
    function submitGame(Game memory _game) public payable {
        // Validate submission
        require(msg.value >= submissionFee, "Insufficient submission fee");
        require(
            userSubmissionCount[msg.sender] < maxSubmissionsPerUser,
            "Max submissions reached"
        );
        require(bytes(_game.id).length > 0, "Game ID cannot be empty");
        require(!gameExists[_game.id], "Game with this ID already exists");

        // Set submitter and initial status
        _game.submitter = msg.sender;
        _game.status = GameStatus.Pending;

        // Store the game
        games[_game.id] = _game;
        gameIds.push(_game.id);
        gameExists[_game.id] = true;

        // Increment user submission count
        userSubmissionCount[msg.sender]++;

        // Emit event
        emit GameSubmitted(_game.id, _game.name, msg.sender);
    }

    /**
     * Approve a submitted game
     * @param _gameId ID of the game to approve
     */
    function approveGame(string memory _gameId) public onlyOwner {
        require(gameExists[_gameId], "Game does not exist");

        Game storage game = games[_gameId];
        require(
            game.status == GameStatus.Pending,
            "Game is not in pending status"
        );

        // Update game status
        game.status = GameStatus.Approved;
        game.featured = false; // Owner can manually feature later

        // Return stake to submitter
        payable(game.submitter).transfer(submissionStake);
        emit StakeReturned(game.submitter, submissionStake);
        emit GameApproved(_gameId, game.name);
    }

    /**
     * Reject a submitted game
     * @param _gameId ID of the game to reject
     * @param _reason Reason for rejection
     */
    function rejectGame(
        string memory _gameId,
        string memory _reason
    ) public onlyOwner {
        require(gameExists[_gameId], "Game does not exist");

        Game storage game = games[_gameId];
        require(
            game.status == GameStatus.Pending,
            "Game is not in pending status"
        );

        // Update game status
        game.status = GameStatus.Rejected;

        // Confiscate stake
        payable(owner).transfer(submissionStake);
        emit StakeConfiscated(game.submitter, submissionStake);
        emit GameRejected(_gameId, game.name, _reason);

        // Remove game from the marketplace
        delete games[_gameId];
        gameExists[_gameId] = false;

        // Remove from gameIds array
        for (uint i = 0; i < gameIds.length; i++) {
            if (keccak256(bytes(gameIds[i])) == keccak256(bytes(_gameId))) {
                gameIds[i] = gameIds[gameIds.length - 1];
                gameIds.pop();
                break;
            }
        }
    }

    /**
     * Update submission parameters (only by owner)
     */
    function updateSubmissionParameters(
        uint256 _newSubmissionFee,
        uint256 _newSubmissionStake,
        uint256 _newMaxSubmissionsPerUser
    ) public onlyOwner {
        submissionFee = _newSubmissionFee;
        submissionStake = _newSubmissionStake;
        maxSubmissionsPerUser = _newMaxSubmissionsPerUser;
    }

    /**
     * Get games by status
     * @param _status Status to filter games
     * @return Array of game IDs with the specified status
     */
    function getGamesByStatus(
        GameStatus _status
    ) public view returns (string[] memory) {
        string[] memory statusGameIds = new string[](gameIds.length);
        uint256 count = 0;

        for (uint i = 0; i < gameIds.length; i++) {
            Game memory game = games[gameIds[i]];
            if (game.status == _status) {
                statusGameIds[count] = gameIds[i];
                count++;
            }
        }

        // Trim the array to remove empty slots
        string[] memory result = new string[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = statusGameIds[i];
        }

        return result;
    }

    // Existing methods from previous contract remain the same (getGame, getAllGameIds, etc.)
    // ... (previous getGame, getAllGameIds, getGamesByCategory, getFeaturedGames methods)

    /**
     * Withdraw collected fees (only by owner)
     */
    function withdrawFees() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
