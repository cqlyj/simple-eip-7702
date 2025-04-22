-include .env

install:
	@forge install OpenZeppelin/openzeppelin-contracts --no-commit

deploy-mock-usdc:
	@forge script script/DeployMockUSDC.s.sol:DeployMockUSDC --rpc-url $(SEPOLIA_RPC_URL) --account burner --sender 0xFB6a372F2F51a002b390D18693075157A459641F --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

deploy-delegation:
	@forge script script/DeployDelegation.s.sol:DeployDelegation --rpc-url $(SEPOLIA_RPC_URL) --account burner --sender 0xFB6a372F2F51a002b390D18693075157A459641F --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv