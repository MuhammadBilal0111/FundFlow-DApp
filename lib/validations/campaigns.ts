import { z } from "zod";
export const campaignValidations = z.object({
  title: z
    .string()
    .min(5, { message: "Minimum 5 characters are required!" })
    .nonempty({
      message: "Title is a required field",
    }),
  description: z
    .string()
    .min(10, {
      message: "Minimum 10 characters are required!",
    })
    .nonempty({
      message: "Description is a required field",
    }),
  cost: z.number().positive().min(0.0001, {
    message: "0.1 ETH is the minimum amount to invest",
  }),
  deadline: z.string().nonempty(),
  image: z.string().url().nonempty(),
});
