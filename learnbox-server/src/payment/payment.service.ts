import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.method';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async createCheckoutSession() {
    return this.stripeService.createCheckoutSession(
      'price_1NjoaXJyla7mHiBx3ClCSWVv',
      'https://learnbox.live',
      'https://learnbox.live',
    );
  }
}
