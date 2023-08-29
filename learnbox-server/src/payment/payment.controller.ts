import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body,
    @Res({ passthrough: true }) res: Response,
  ) {
    const paymentSession = await this.paymentService.createCheckoutSession();

    return paymentSession;
  }

  @Get('test')
  async redirect(@Res() res: Response) {
    res.redirect(303, 'https://www.google.com');
  }
}
