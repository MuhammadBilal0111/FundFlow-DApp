import { ethers, parseEther } from "ethers";
import address from "../contract/artifacts/contractAddress.json";
import abi from "../contract/artifacts/contracts/Genesis.sol/Genesis.json";
import { ToastSuccess, ToastFailure } from "@/components/Toast";
import { generateSlug } from "@/utils/utils";
import {
  structuredBackers,
  structuredProjects,
} from "@/utils/blockchain.utils";
import { getWalletAddress } from "@/lib/actions/wallet.action";

let ethereum: any = null;

// Ensure `window.ethereum` is accessed on the client side
if (typeof window !== "undefined" && window.ethereum) {
  ethereum = window.ethereum;
}
const contractAddress = address.address;
const contractAbi = abi.abi;

// getting ethereum contract
const getEthereumContract = async () => {
  try {
    const connectedAccount = await getWalletAddress();
    if (!connectedAccount) {
      console.log("No Account connected");
      ToastFailure("No Metamask Account Connected!");
      return null;
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error: any) {
    console.error("Error fetching Ethereum contract:", error);
    ToastFailure("Failed to connect to Ethereum contract!");
    return null;
  }
};

// function to create project in blockchain
export const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiredAt,
}: {
  title: string;
  description: string;
  imageURL: string;
  cost: number;
  expiredAt: number;
}) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const slug = generateSlug(title);
    const weicost = parseEther(cost.toString()); // convert in wei
    console.log("Ethers in wei", cost);
    const tx = await contract?.createProject(
      title,
      description,
      slug,
      imageURL,
      weicost,
      expiredAt
    );
    await tx.wait();
    ToastSuccess("Project created successfully!");
    // await loadProjects();
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in creating the project!");
  }
};
// function to update project in blockchain
export const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}: {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  expiresAt: number;
}) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();

    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const slug = generateSlug(title);
    const tx = await contract.updateProject(
      id,
      title,
      description,
      slug,
      imageURL,
      expiresAt
    );
    await tx.wait();
    ToastSuccess("Project updated successfully!");
    return true;
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in updating the project!");
  }
};

// function to get all projects
export const loadProjects = async () => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }

    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const projects = await contract?.getProjects();
    return structuredProjects(projects);
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in loading the projects!");
  }
};
// get project details
export const loadProjectById = async (id: number) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const project = await contract?.getProject(id);

    if (!project) {
      ToastFailure("Project Not found!");
      return;
    }
    return structuredProjects([project]);
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in loading the project");
  }
};

export const loadProjectBySlug = async (slug: string) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const project = await contract?.getProjectBySlug(slug);

    if (!project) {
      ToastFailure("Project Not found!");
      return;
    }

    return structuredProjects([project]);
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in loading the project");
  }
};
// function to get all backers
export const getBackers = async (id: number) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const backers = await contract?.getBackers(id);
    return structuredBackers(backers);
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in Backing the project");
  }
};
// function to get payout project
export const payoutProject = async (id: number) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const connectedAccount = await getWalletAddress();
    if (!connectedAccount) {
      console.log("No Account connected");
      ToastFailure("No Metamask Account Connected!");
      return null;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const tx = await contract?.payOutProject(id, {
      from: connectedAccount, // Ensure tempAddress is defined globally or passed as a parameter
    });

    await tx.wait(); // Wait for transaction confirmation
    ToastSuccess("Project Payout Successfully!");
  } catch (error: any) {
    console.error("Payout Error:", error);
    ToastFailure(error.message || "Transaction failed.");
  }
};
// function to back the project
export const backProject = async (id: number, amount: number) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract(); // return the contract
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const amountInWei = ethers.parseEther(amount.toString());

    const connectedAccount = await getWalletAddress();
    if (!connectedAccount) {
      console.log("No Account connected");
      ToastFailure("No Metamask Account Connected!");
      return null;
    }
    const tx = await contract?.backProject(id, {
      from: connectedAccount,
      value: amountInWei,
    });

    await tx.wait(); // Wait for the transaction to be mined
    ToastSuccess(
      `${amount} backed successfully!. Your transaction hash is ${tx.hash}`
    );
  } catch (error: any) {
    console.error("Error in backing project:", error);
    ToastFailure("An error occurred while backing the project.");
  }
};

// function to delete the project
export const deleteProject = async (id: number) => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    await contract?.deleteProject(id);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
// function to get the projects of a specific user

export const loadProjectsByAddress = async () => {
  try {
    if (!ethereum) {
      ToastFailure("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract();
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const connectedAccount = await getWalletAddress();
    if (!connectedAccount) {
      console.log("No Account connected");
      ToastFailure("No Metamask Account Connected!");
      return null;
    }

    const projects = await contract.getProjectsByAddress({
      sender: connectedAccount,
    });
    return structuredProjects(projects);
  } catch (error: any) {
    console.log(error);
    ToastFailure("Error in loading the project");
  }
};
