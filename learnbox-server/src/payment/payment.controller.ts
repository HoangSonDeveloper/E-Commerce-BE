import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
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
