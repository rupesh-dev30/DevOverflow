import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Log the event type
  const eventType = evt.type;
  console.log(`Received event type: ${eventType}`);

  // Handle different event types
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;

    try {
      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      });
      console.log("User created:", mongoUser);
      return NextResponse.json({ message: "OK", user: mongoUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occurred while creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;

    try {
      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username!,
          email: email_addresses[0].email_address,
          picture: image_url,
        },
        path: `/profile/${id}`,
      });
      console.log("User updated:", mongoUser);
      return NextResponse.json({ message: "OK", user: mongoUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error occurred while updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      const deletedUser = await deleteUser({
        clerkId: id!,
      });
      console.log("User deleted:", deletedUser);
      return NextResponse.json({ message: "OK", user: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error occurred while deleting user", { status: 500 });
    }
  }

  console.warn("Unhandled event type:", eventType);
  return new Response("", { status: 200 });
}
