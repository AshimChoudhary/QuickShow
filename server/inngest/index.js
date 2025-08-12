// inngest/index.js
import { Inngest } from 'inngest';
import User from '../models/User.js';
import 'dotenv/config'; // ensure env variables are loaded

// Create the Inngest client with signing key for auth
export const inngest = new Inngest({
  id: 'movie-ticket-booking',
  signingKey: process.env.INNGEST_SIGNING_KEY, // 🔑 important for auth
});

/**
 * Sync a new user from Clerk to the database
 */
const userCreated = inngest.createFunction(
  { id: 'movie-ticket-booking-sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userdata = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address || '',
      image: image_url,
    };

    await User.create(userdata);
    console.log(`✅ User created in DB: ${userdata.email}`);
  }
);

/**
 * Update an existing user from Clerk in the database
 */
const userUpdated = inngest.createFunction(
  { id: 'movie-ticket-booking-update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userdata = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address || '',
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userdata);
    console.log(`♻️ User updated in DB: ${userdata.email}`);
  }
);

/**
 * Delete a user from the database when removed from Clerk
 */
const userDeleted = inngest.createFunction(
  { id: 'movie-ticket-booking-delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
    console.log(`🗑️ User deleted from DB: ${id}`);
  }
);

export const functions = [userCreated, userUpdated, userDeleted];
