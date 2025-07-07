import {userSignUpSchema} from './auth-validators.js';
import { z } from 'zod';

const contactSchema = userSignUpSchema
  .pick({ username: true, email: true }) // reuse username & email
  .extend({
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

export default contactSchema;
