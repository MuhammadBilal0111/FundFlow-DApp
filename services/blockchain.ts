import { ethers, parseEther } from "ethers";
import address from "../contract/artifacts/contractAddress.json";
import abi from "../contract/artifacts/contracts/Genesis.sol/Genesis.json";
import { ToastSuccess, ToastFailure } from "@/components/Toast";
import { generateSlug } from "@/utils/utils";
import {
  structuredBackers,
  structuredProjects,
} from "@/utils/blockchain.utils";

let ethereum =
  typeof window !== "undefined" && window.ethereum ? window.ethereum : null;

const contractAddress = address.address;
const contractAbi = abi.abi;

const tempAddress = "0xC9c4B54f0b812F73b3Fec65A99353445c75e9bbc";

// getting ethereum contract
const getEthereumContract = async () => {
  try {
    const connectedAccount = tempAddress;
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
    ToastFailure(error.message);
  }
};
// function to update project in blockchain
export const updateProject = async ({
  id,
  title,
  description,
  slug,
  imageURL,
  expiresAt,
}: {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageURL: string;
  expiresAt: string;
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
    const tx = await contract?.updateProject(
      id,
      title,
      description,
      slug,
      imageURL,
      expiresAt
    );
    await tx.wait();
    await loadProject(id);
    ToastSuccess("Project updated successfully!");
  } catch (error: any) {
    console.log(error);
    ToastFailure(error.message);
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
    const stats = await contract?.stats();
    return structuredProjects(projects);
  } catch (error: any) {
    console.log(error);
    ToastFailure(error.message);
  }
};
// get project details
export const loadProject = async (id: number) => {
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
    // setGlobalState("project", structuredProjects([project])[0]);
  } catch (error: any) {
    console.log(error);
    ToastFailure(error.message);
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
    // setGlobalState("backers", structuredBackers(backers));
  } catch (error: any) {
    console.log(error);
    ToastFailure(error.message);
  }
};
// function to get payout project
export const payoutProject = async (id: number) => {
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
    const tx = await contract?.payOutProject(id, {
      from: tempAddress, // Ensure tempAddress is defined globally or passed as a parameter
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
    // const connectedAccount = getGlobalState("connectedAccount"); // Get the connected account
    const tx = await contract?.backProject(id, {
      from: tempAddress,
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
