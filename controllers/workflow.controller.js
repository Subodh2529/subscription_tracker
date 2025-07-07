import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

const sendReminders = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const subscription = await Subscription.findById(subscriptionId).populate("user", "name email");

    if (!subscription || subscription.status !== "active") {
      return res.status(400).json({ message: "Subscription not found or inactive" });
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      return res.status(400).json({ message: "Renewal date has passed" });
    }

    const workflow = workflowClient.createWorkflow();

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, "day");
      if (reminderDate.isAfter(dayjs())) {
        workflow.wait(reminderDate.toDate());
        workflow.run(async () => {
          console.log(`Sending reminder ${daysBefore} days before renewal for subscription ${subscriptionId}`);
          // Add your reminder logic here
        });
      }
    }

    await workflow.execute();
    res.json({ message: "Reminders scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling reminders:", error);
    res.status(500).json({ message: "Error scheduling reminders", error: error.message });
  }
};

export default sendReminders;
