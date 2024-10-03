// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ICERToken.sol";

contract CERToken is ICERToken, ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    IERC20 public usdcToken;
    uint256 public cerPrice;
    mapping(bytes32 => bool) public usedProofs;

    event CERMinted(address indexed to, uint256 amount, bytes32 proofHash);
    event PriceUpdated(uint256 newPrice);

    constructor(
        address _usdcToken
    ) ERC20("CER", "CER") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        usdcToken = IERC20(_usdcToken);
        cerPrice = 1000000;
    }

    function mint(
        address to,
        uint256 amount,
        bytes32 proofHash
    ) public override onlyRole(MINTER_ROLE) {
        require(!usedProofs[proofHash], "Proof already used");

        _mint(to, amount);
        usedProofs[proofHash] = true;

        emit CERMinted(to, amount, proofHash);
    }

    function swapUSDCForCER(
        uint256 usdcAmount
    ) external override whenNotPaused {
        require(usdcAmount > 0, "Amount must be greater than 0");

        uint256 cerAmount = (usdcAmount * 1e18) / cerPrice;

        require(
            usdcToken.transferFrom(msg.sender, address(this), usdcAmount),
            "USDC transfer failed"
        );

        _mint(msg.sender, cerAmount);
    }

    function setPrice(
        uint256 newPrice
    ) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newPrice > 0, "Price must be greater than 0");

        cerPrice = newPrice;

        emit PriceUpdated(newPrice);
    }

    function burn(uint256 amount) public override(ERC20Burnable, ICERToken) {
        super.burn(amount);
    }

    function pause() public override onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public override onlyRole(PAUSER_ROLE) {
        _unpause();
    }
}
