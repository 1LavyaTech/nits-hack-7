// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MicroLendingPlatform {
    address public admin;
    uint256 public defaultCreditScore = 500;

    struct User {
        address wallet;
        uint256 aadhaar;
        bool verified;
        uint256 creditScore;
    }

    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        uint256 endTime;
        address borrower;
        address lender;
        bool isRepaid;
    }

    mapping(address => User) public users;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    event LoanRepaid(uint256 loanId, address indexed borrower, uint256 amount);
    event UserRegistered(address indexed user, uint256 aadhaar);
    event LoanRequestCreated(
        uint256 loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestRate,
        uint256 duration
    );
    event LoanRequestAccepted(uint256 loanId, address indexed lender);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can access this function");
        _;
    }

    function registerUser(uint256 aadhaar) external {
        require(
            users[msg.sender].wallet == address(0),
            "User already registered"
        );
        users[msg.sender] = User(msg.sender, aadhaar, true, defaultCreditScore);
        emit UserRegistered(msg.sender, aadhaar);
    }

    function requestLoan(
        uint256 amount,
        uint256 interestRate,
        uint256 duration
    ) external {
        require(users[msg.sender].verified, "User not verified");
        require(amount > 0 && duration > 0, "Invalid loan parameters");

        loans[loanCount] = Loan({
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            borrower: msg.sender,
            lender: address(0),
            isRepaid: false
        });

        emit LoanRequestCreated(
            loanCount,
            msg.sender,
            amount,
            interestRate,
            duration
        );
        loanCount++;
    }

    function acceptLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.borrower != address(0), "Invalid loan ID");
        require(loan.lender == address(0), "Loan already funded");
        require(msg.value == loan.amount, "Incorrect funding amount");

        loan.lender = msg.sender;
        payable(loan.borrower).transfer(loan.amount);
        emit LoanRequestAccepted(loanId, msg.sender);
    }

    function repayLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.borrower == msg.sender, "Only borrower can repay");
        require(!loan.isRepaid, "Loan already repaid");

        uint256 repaymentAmount = loan.amount +
            ((loan.amount * loan.interestRate) / 100);
        require(msg.value == repaymentAmount, "Incorrect repayment amount");

        payable(loan.lender).transfer(repaymentAmount);
        loan.isRepaid = true;

        if (block.timestamp <= loan.endTime) {
            users[msg.sender].creditScore += 20;
        } else {
            users[msg.sender].creditScore -= 10;
        }

        emit LoanRepaid(loanId, msg.sender, repaymentAmount);
    }

    function getCreditScore(address user) external view returns (uint256) {
        return users[user].creditScore;
    }

    function getAadhaar(address user) external view returns (uint256) {
        return users[user].aadhaar;
    }

    function verifyUser(address userAddress) external onlyAdmin {
        users[userAddress].verified = true;
    }

    function getLoanAmount(uint256 loanId) external view returns (uint256) {
        return loans[loanId].amount;
    }

    function getUserDept(address user) external view returns (uint256) {
        uint256 dept = 0;
        for (uint256 i = 0; i < loanCount; i++) {
            if (loans[i].borrower == user && !loans[i].isRepaid) {
                dept += loans[i].amount;
            }
        }
        return dept;
    }

    function getLoansByUser(
        address user
    ) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](loanCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < loanCount; i++) {
            if (loans[i].borrower == user) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
