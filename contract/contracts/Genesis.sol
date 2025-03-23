//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Genesis {
    address public owner;
    uint public projectCount;
    statsStruct public stats;
    projectStruct[] projects;

    mapping(address => projectStruct[]) projectsOf;
    mapping(uint => bool) public projectExist;
    mapping(string => projectStruct) projectsOfByName;

    struct statsStruct {
        uint totalProjects;
        uint totalInvestors;
        uint totalInvestment;
    }

    struct projectStruct {
        uint id;
        address owner;
        string title;
        string description;
        string category;
        string slug;
        uint cost;
        uint raised;
        uint timestamp;
        address investorAddress;
        string ownerName;
        string investorName;
        uint equity;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner reserved only");
        _;
    }
    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    function createProject(
        string memory title,
        string memory description,
        string memory category,
        string memory ownerName,
        string memory slug,
        uint equity,
        uint cost
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(category).length > 0, "Category cannot be empty");
        require(bytes(ownerName).length > 0, "Owner Name cannot be empty");
        require(bytes(slug).length > 0, "Slug cannot be empty");
        require(cost > 0 ether, "Cost cannot be zero");

        projectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.category = category;
        project.slug = slug;
        project.equity = equity;
        project.cost = cost;
        project.timestamp = block.timestamp;

        project.ownerName = ownerName;
        projects.push(project);
        projectExist[projectCount] = true;
        projectsOfByName[slug] = (project);
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        emit Action(
            projectCount++,
            "PROJECT CREATED",
            msg.sender,
            block.timestamp
        );
        return true;
    }
    // function to refund project
    function backProject(
        uint id,
        string memory investorName
    ) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExist[id], "Project not found");
        require(
            msg.value >= projects[id].cost,
            "Ether must be greater than cost"
        );
        address projectOwner = projects[id].owner;
        for (uint i = 0; i < projectsOf[projectOwner].length; i++) {
            if (projectsOf[projectOwner][i].id == id) {
                projectsOf[projectOwner][i].raised = msg.value;
                projectsOf[projectOwner][i].investorAddress = msg.sender;
                projectsOf[projectOwner][i].investorName = investorName;
                break;
            }
        }
        // Ensure other mappings are updated properly
        projectsOfByName[projects[id].slug] = projects[id];
        projects[id].investorAddress = msg.sender;
        projects[id].investorName = investorName;
        stats.totalInvestors += 1;
        stats.totalInvestment += msg.value;
        performPayout(id);
        emit Action(id, "PROJECT BACKED", msg.sender, block.timestamp);
        return true;
    }
    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        payTo(projects[id].owner, raised);
        emit Action(id, "PROJECT PAID OUT", msg.sender, block.timestamp);
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }
    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }
    function getProjectsByAddress()
        public
        view
        returns (projectStruct[] memory)
    {
        return projectsOf[msg.sender];
    }

    function getProjectBySlug(
        string memory _slug
    ) public view returns (projectStruct memory) {
        return projectsOfByName[_slug];
    }
}
