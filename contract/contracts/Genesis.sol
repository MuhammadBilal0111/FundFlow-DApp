// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Genesis {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    statsStruct public stats;
    projectStruct[] projects;

    mapping(address => projectStruct[]) projectsOf;
    mapping(uint => backerStruct[]) backersOf;
    mapping(string => projectStruct) projectsOfByName;
    mapping(uint => bool) public projectExist;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct {
        uint totalProjects;
        uint totalBacking;
        uint totalDonations;
    }

    struct backerStruct {
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

    struct projectStruct {
        uint id;
        address owner;
        string title;
        string description;
        string slug;
        string imageURL;
        uint cost;
        uint raised;
        uint timestamp;
        uint expiresAt;
        uint backers;
        statusEnum status;
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

    constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }
    // function to create project
    function createProject(
        string memory title,
        string memory description,
        string memory slug,
        string memory imageURL,
        uint cost,
        uint expiresAt
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");
        require(bytes(slug).length > 0, "Slug cannot be empty");
        require(cost > 0 ether, "Cost cannot be zero");

        projectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.slug = slug;
        project.imageURL = imageURL;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);
        projectExist[projectCount] = true;
        projectsOfByName[slug] = project;
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
    // function for updating the project
    function updateProject(
        uint id,
        string memory title,
        string memory description,
        string memory slug,
        string memory imageURL,
        uint expiresAt
    ) public returns (bool) {
        require(projectExist[id], "Project does not exist");
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(slug).length > 0, "Slug cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        string memory oldSlug = projects[id].slug;

        // Update project details
        projects[id].title = title;
        projects[id].description = description;
        projects[id].slug = slug;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        address projectOwner = projects[id].owner;

        // Update projectsOf mapping
        for (uint i = 0; i < projectsOf[projectOwner].length; i++) {
            if (projectsOf[projectOwner][i].id == id) {
                projectsOf[projectOwner][i] = projects[id];
                break;
            }
        }

        // Update projectsOfByName mapping
        delete projectsOfByName[oldSlug]; // Remove old slug mapping
        projectsOfByName[slug] = projects[id]; // Add new slug mapping

        emit Action(id, "PROJECT UPDATED", msg.sender, block.timestamp);
        return true;
    }

    // function to delete project
    function deleteProject(uint id) public returns (bool) {
        require(
            projects[id].status == statusEnum.OPEN,
            "Project no longer opened"
        );
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        projects[id].status = statusEnum.DELETED;
        performRefund(id);
        emit Action(id, "PROJECT DELETED", msg.sender, block.timestamp);
        return true;
    }
    // function to refund project
    function performRefund(uint id) internal {
        for (uint i = 0; i < backersOf[id].length; i++) {
            address _owner = backersOf[id][i].owner;
            uint _contribution = backersOf[id][i].contribution;

            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);
            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }
    // function to refund project
    function backProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExist[id], "Project not found");
        require(
            projects[id].status == statusEnum.OPEN,
            "Project no longer opened"
        );
        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        backersOf[id].push(
            backerStruct(msg.sender, msg.value, block.timestamp, false)
        );
        address projectOwner = projects[id].owner;
        for (uint i = 0; i < projectsOf[projectOwner].length; i++) {
            if (projectsOf[projectOwner][i].id == id) {
                projectsOf[projectOwner][i].raised = projects[id].raised;
                projectsOf[projectOwner][i].backers = projects[id].backers;
                break;
            }
        }
        // Ensure other mappings are updated properly
        projectsOfByName[projects[id].slug] = projects[id];
        emit Action(id, "PROJECT BACKED", msg.sender, block.timestamp);

        if (projects[id].raised >= projects[id].cost) {
            projects[id].status = statusEnum.APPROVED;
            for (uint i = 0; i < projectsOf[projects[id].owner].length; i++) {
                if (projectsOf[projects[id].owner][i].id == id) {
                    projectsOf[projects[id].owner][i].status = statusEnum
                        .APPROVED;
                    break;
                }
            }

            // Ensure other mappings are updated properly
            projectsOfByName[projects[id].slug] = projects[id];
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }
        if (block.timestamp >= projects[id].expiresAt) {
            projects[id].status = statusEnum.REVERTED;
            for (uint i = 0; i < projectsOf[projects[id].owner].length; i++) {
                if (projectsOf[projects[id].owner][i].id == id) {
                    projectsOf[projects[id].owner][i].status = statusEnum
                        .REVERTED;
                    break;
                }
            }
            // Ensure other mappings are updated properly
            projectsOfByName[projects[id].slug] = projects[id];
            performRefund(id);
            return true;
        }
        return true;
    }
    // function to perform payout
    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = (raised * projectTax) / 100;
        projects[id].status = statusEnum.PAIDOUT;
        address projectOwner = projects[id].owner;
        for (uint i = 0; i < projectsOf[projectOwner].length; i++) {
            if (projectsOf[projectOwner][i].id == id) {
                projectsOf[projectOwner][i].status = statusEnum.PAIDOUT;
                break;
            }
        }
        // Ensure other mappings are updated properly
        projectsOfByName[projects[id].slug] = projects[id];
        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);
        balance -= projects[id].raised;
        emit Action(id, "PROJECT PAID OUT", msg.sender, block.timestamp);
    }
    // function to refund
    function requestRefund(uint id) public returns (bool) {
        require(
            projects[id].status != statusEnum.REVERTED ||
                projects[id].status != statusEnum.DELETED,
            "Project not marked as revert or delete"
        );
        address projectOwner = projects[id].owner;
        for (uint i = 0; i < projectsOf[projectOwner].length; i++) {
            if (projectsOf[projectOwner][i].id == id) {
                projectsOf[projectOwner][i].status = statusEnum.REVERTED;
                break;
            }
        }
        // Ensure other mappings are updated properly
        projectsOfByName[projects[id].slug] = projects[id];
        projects[id].status = statusEnum.REVERTED;
        performRefund(id);
        return true;
    }
    // withdraw money
    function payOutProject(uint id) public returns (bool) {
        require(
            projects[id].status == statusEnum.APPROVED,
            "Project not APPROVED"
        );
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized Entity"
        );
        performPayout(id);
        return true;
    }

    function changeTax(uint _taxPct) public ownerOnly {
        projectTax = _taxPct;
    }

    function getProjectById(
        uint id
    ) public view returns (projectStruct memory) {
        require(projectExist[id], "Project not found");

        return projects[id];
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

    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }

    function getBackers(uint id) public view returns (backerStruct[] memory) {
        return backersOf[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }
}
