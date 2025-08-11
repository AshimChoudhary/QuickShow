import { Inngest } from 'inngest';
import User from '../models/User.js';

export const inngest = new Inngest({ id: 'movie-ticket-booking' });

const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;
      const userData = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: [first_name, last_name].filter(Boolean).join(' '),
        image: image_url,
      };
      await User.create(userData);
    } catch (err) {
      console.error('User creation failed:', err);
      throw err;
    }
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    try {
      const { id } = event.data;
      await User.findOneAndDelete({ clerkId: id });
    } catch (err) {
      console.error('User deletion failed:', err);
      throw err;
    }
  }
);

const syncUserUpdate = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;
      const userData = {
        email: email_addresses[0]?.email_address,
        name: [first_name, last_name].filter(Boolean).join(' '),
        image: image_url,
      };
      await User.findOneAndUpdate({ clerkId: id }, userData);
    } catch (err) {
      console.error('User update failed:', err);
      throw err;
    }
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdate];
